/* TutorBridge Pricing & Currency Calculator */

const SUBJECT_BASE_RATES = {
  "emath": { name: "Elementary Math", sgLocal: 55, tbAvg: 18 },
  "amath": { name: "Additional Math", sgLocal: 60, tbAvg: 20 },
  "physics": { name: "Physics (Pure/Combined)", sgLocal: 65, tbAvg: 22 },
  "chem": { name: "Chemistry (Pure/Combined)", sgLocal: 60, tbAvg: 18 },
  "bio": { name: "Biology (Pure/Combined)", sgLocal: 55, tbAvg: 17 },
  "english": { name: "English Language", sgLocal: 50, tbAvg: 15 }
};

/* Tracks the currently selected subject key for the custom dropdown.
   Defaults to the first key in SUBJECT_BASE_RATES. */
let currentSubjectKey = Object.keys(SUBJECT_BASE_RATES)[0];

function calculateSavings() {
  const hoursPerWeek = parseFloat(document.getElementById('calc-hours')?.value) || 2;
  const weeksPerMonth = 4;

  const data = SUBJECT_BASE_RATES[currentSubjectKey] || SUBJECT_BASE_RATES['emath'];

  const monthlyLocal = data.sgLocal * hoursPerWeek * weeksPerMonth;
  const monthlyPlatform = data.tbAvg * hoursPerWeek * weeksPerMonth;
  const monthlySavings = monthlyLocal - monthlyPlatform;
  const savingsPct = Math.round((monthlySavings / monthlyLocal) * 100);

  const localCostEl = document.getElementById('res-local-cost');
  const platformCostEl = document.getElementById('res-platform-cost');
  const savingsEl = document.getElementById('res-savings');
  const savingsPctEl = document.getElementById('res-savings-pct');

  if (localCostEl) localCostEl.textContent = `$${monthlyLocal.toFixed(0)}`;
  if (platformCostEl) platformCostEl.textContent = `$${monthlyPlatform.toFixed(0)}`;
  if (savingsEl) savingsEl.textContent = `$${monthlySavings.toFixed(0)}`;
  if (savingsPctEl) savingsPctEl.textContent = `${savingsPct}%`;
}

/* JS-driven hover effect for the .res-card boxes (Local SG Cost,
   TutorBridge Cost, Your Monthly Savings). Lifts the card and adds a
   shadow/border tint on mouseenter, resets on mouseleave. */
function setupResCardHover() {
  const resCards = document.querySelectorAll('.res-card');

  resCards.forEach(card => {
    const isHighlight = card.classList.contains('highlight');

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = 'var(--shadow-md)';
      card.style.borderColor = isHighlight ? 'var(--coral)' : 'var(--amber)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.borderColor = isHighlight ? 'var(--amber)' : 'var(--grey-mid)';
    });
  });
}

/* JS-driven hover effect for the three "Why is TutorBridge so much more
   affordable?" boxes. Same lift/shadow/border-tint treatment as the
   res-cards above, applied to each box individually so all three jump
   independently on hover. */
function setupExplainerCardHover() {
  const explainerItems = document.querySelectorAll('.explainer-item');

  explainerItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-4px)';
      item.style.boxShadow = 'var(--shadow-md)';
      item.style.borderColor = 'var(--amber)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '';
      item.style.borderColor = 'var(--grey-mid)';
    });
  });
}

/* Builds the custom "Select Subject" dropdown (.cs-select) from
   SUBJECT_BASE_RATES and wires it up so:
   - clicking the box itself does nothing
   - clicking the arrow button toggles the options list
   - clicking an option sets the value, closes the list, and
     re-runs calculateSavings()
   Expects this markup already in the HTML:

   <div class="cs-select" id="subjectSelect">
     <div class="cs-select-box">
       <span class="cs-select-value"></span>
       <button type="button" class="cs-select-arrow-btn" aria-label="Toggle options">
         <svg viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="#333333" stroke-width="2"/></svg>
       </button>
     </div>
     <ul class="cs-select-options"></ul>
   </div>
*/
function setupSubjectDropdown() {
  const csSelect = document.getElementById('subjectSelect');
  if (!csSelect) return;

  const valueEl = csSelect.querySelector('.cs-select-value');
  const arrowBtn = csSelect.querySelector('.cs-select-arrow-btn');
  const optionsList = csSelect.querySelector('.cs-select-options');

  // Build the option list from SUBJECT_BASE_RATES
  optionsList.innerHTML = '';
  Object.keys(SUBJECT_BASE_RATES).forEach(key => {
    const subject = SUBJECT_BASE_RATES[key];
    const li = document.createElement('li');
    li.className = 'cs-select-option' + (key === currentSubjectKey ? ' active' : '');
    li.dataset.value = key;
    li.textContent = `${subject.name} ($${subject.tbAvg}/hr)`;
    optionsList.appendChild(li);
  });

  // Set initial displayed value
  const initialSubject = SUBJECT_BASE_RATES[currentSubjectKey];
  valueEl.textContent = `${initialSubject.name} ($${initialSubject.tbAvg}/hr)`;

  // Only the arrow button opens/closes it — clicking the box does nothing
  arrowBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    csSelect.classList.toggle('open');
  });

  optionsList.querySelectorAll('.cs-select-option').forEach(opt => {
    opt.addEventListener('click', () => {
      currentSubjectKey = opt.dataset.value;
      valueEl.textContent = opt.textContent;

      optionsList.querySelectorAll('.cs-select-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      csSelect.classList.remove('open');
      calculateSavings();
    });
  });

  // Close the dropdown when clicking anywhere outside it
  document.addEventListener('click', () => {
    csSelect.classList.remove('open');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const hoursInput = document.getElementById('calc-hours');
  if (hoursInput) hoursInput.addEventListener('input', calculateSavings);

  setupSubjectDropdown();
  calculateSavings();
  setupResCardHover();
  setupExplainerCardHover();
});