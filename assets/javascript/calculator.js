/* TutorBridge Pricing & Currency Calculator */

const SUBJECT_BASE_RATES = {
  "emath": { name: "Elementary Math", sgLocal: 55, tbAvg: 18 },
  "amath": { name: "Additional Math", sgLocal: 60, tbAvg: 20 },
  "physics": { name: "Physics (Pure/Combined)", sgLocal: 65, tbAvg: 22 },
  "chem": { name: "Chemistry (Pure/Combined)", sgLocal: 60, tbAvg: 18 },
  "bio": { name: "Biology (Pure/Combined)", sgLocal: 55, tbAvg: 17 },
  "english": { name: "English Language", sgLocal: 50, tbAvg: 15 }
};

function calculateSavings() {
  const subjectKey = document.getElementById('calc-subject')?.value || 'emath';
  const hoursPerWeek = parseFloat(document.getElementById('calc-hours')?.value) || 2;
  const weeksPerMonth = 4;

  const data = SUBJECT_BASE_RATES[subjectKey] || SUBJECT_BASE_RATES['emath'];

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

document.addEventListener('DOMContentLoaded', () => {
  const subjectSelect = document.getElementById('calc-subject');
  const hoursInput = document.getElementById('calc-hours');

  if (subjectSelect) subjectSelect.addEventListener('change', calculateSavings);
  if (hoursInput) hoursInput.addEventListener('input', calculateSavings);

  calculateSavings();
});
