/* =========================================================
   ST0501 CA2 FRONT-END WEB DEVELOPMENT
   TutorBridge Main Application Controller
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  
  // ---------------------------------------------------------
  // 1. TUTOR DIRECTORY FILTERING (tutor-directory.html)
  // ---------------------------------------------------------
  const dirGrid = document.getElementById("tutorDirectoryGrid");
  const filterSub = document.getElementById("filterSubject");
  const filterCty = document.getElementById("filterCountry");
  const filterPrc = document.getElementById("filterPrice");
  const filterSrc = document.getElementById("filterSearch");

  function renderDirectory() {
    if (!dirGrid) return;

    const subjectVal = filterSub ? filterSub.value.toLowerCase() : "";
    const countryVal = filterCty ? filterCty.value.toLowerCase() : "";
    const priceVal = filterPrc ? parseFloat(filterPrc.value) : Infinity;
    const searchVal = filterSrc ? filterSrc.value.toLowerCase() : "";

    const filtered = TUTORS_DATA.filter(tutor => {
      const matchSub = !subjectVal || tutor.subject.toLowerCase().includes(subjectVal);
      const matchCty = !countryVal || tutor.country.toLowerCase().includes(countryVal);
      const matchPrc = isNaN(priceVal) || tutor.rate <= priceVal;
      const matchSrc = !searchVal || tutor.name.toLowerCase().includes(searchVal);
      return matchSub && matchCty && matchPrc && matchSrc;
    });

    if (filtered.length === 0) {
      dirGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-search text-muted display-4 mb-3 d-block"></i>
          <h5 class="fw-bold text-muted">No tutors match your search criteria</h5>
          <p class="text-secondary small">Try broadening your subject, country, or price filters.</p>
        </div>`;
      return;
    }

    dirGrid.innerHTML = filtered.map(tutor => `
      <div class="col-md-4">
        <div class="card card-custom h-100 p-3 shadow-sm border-0">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold fs-4" style="width: 50px; height: 50px; background-color: var(--primary-teal);">
              ${tutor.avatar}
            </div>
            <div>
              <h5 class="card-title mb-0 fw-bold">${tutor.name}</h5>
              <span class="text-muted small"><i class="bi bi-geo-alt me-1"></i>${tutor.country}</span>
            </div>
          </div>
          <p class="card-text text-secondary small mb-2">
            <strong>${tutor.subject}</strong> • <span class="badge badge-teal">${tutor.level}</span><br>
            ${tutor.bio}
          </p>
          <div class="d-flex justify-content-between align-items-center my-3 bg-light p-2 rounded">
            <span class="fw-bold text-teal fs-5" style="color: var(--dark-teal);">S$${tutor.rate}<span class="fs-7 text-muted fw-normal">/hr</span></span>
            <span class="text-warning small fw-bold"><i class="bi bi-star-fill"></i> ${tutor.rating} (${tutor.reviews})</span>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-teal btn-sm flex-grow-1 open-tutor-modal" style="color: var(--primary-teal); border-color: var(--primary-teal);" data-id="${tutor.id}">View Profile</button>
            <button class="btn ${ShortlistStorage.has(tutor.id) ? 'btn-coral' : 'btn-outline-danger'} btn-sm toggle-shortlist-btn" data-id="${tutor.id}">
              <i class="bi ${ShortlistStorage.has(tutor.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    attachTutorDirectoryEvents();
  }

  function attachTutorDirectoryEvents() {
    document.querySelectorAll(".open-tutor-modal").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        const tutor = TUTORS_DATA.find(t => t.id === id);
        if (tutor) showTutorModal(tutor);
      });
    });

    document.querySelectorAll(".toggle-shortlist-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        if (ShortlistStorage.has(id)) {
          ShortlistStorage.remove(id);
        } else {
          ShortlistStorage.add(id);
        }
        renderDirectory();
        renderShortlistPage();
      });
    });
  }

  if (filterSub) filterSub.addEventListener("change", renderDirectory);
  if (filterCty) filterCty.addEventListener("change", renderDirectory);
  if (filterPrc) filterPrc.addEventListener("input", renderDirectory);
  if (filterSrc) filterSrc.addEventListener("input", renderDirectory);
  renderDirectory();

  // Modal Display Helper
  function showTutorModal(tutor) {
    const modalEl = document.getElementById("tutorDetailModal");
    if (!modalEl) return;
    document.getElementById("modalTutorName").textContent = tutor.name;
    document.getElementById("modalTutorDetails").innerHTML = `
      <div class="text-center mb-3">
        <div class="rounded-circle text-white d-inline-flex align-items-center justify-content-center fw-bold fs-3 mb-2" style="width: 65px; height: 65px; background-color: var(--primary-teal);">
          ${tutor.avatar}
        </div>
        <h5 class="fw-bold mb-0">${tutor.name}</h5>
        <p class="text-muted small mb-1">${tutor.country} • ${tutor.subject} (${tutor.level})</p>
        <span class="badge bg-warning text-dark fw-bold"><i class="bi bi-star-fill"></i> ${tutor.rating} / 5.0</span>
      </div>
      <div class="bg-light p-3 rounded mb-3">
        <p class="mb-1"><strong>Rate:</strong> S$${tutor.rate}/hour</p>
        <p class="mb-1"><strong>Qualifications:</strong> ${tutor.qualifications}</p>
        <p class="mb-0"><strong>Availability:</strong> ${tutor.availability}</p>
      </div>
      <p class="small text-secondary mb-0">${tutor.bio}</p>
    `;
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }

  // ---------------------------------------------------------
  // 2. SWIPE DECK INTERFACE (tutor-profile.html)
  // ---------------------------------------------------------
  let currentSwipeIndex = 0;
  const swipeDeckEl = document.getElementById("swipeDeckCard");
  
  function renderSwipeDeck() {
    if (!swipeDeckEl) return;
    if (currentSwipeIndex >= TUTORS_DATA.length) {
      swipeDeckEl.innerHTML = `
        <div class="text-center py-4">
          <i class="bi bi-check-circle-fill text-teal display-3 mb-3 d-block" style="color: var(--primary-teal);"></i>
          <h4 class="fw-bold">You've viewed all available tutors!</h4>
          <p class="text-muted small">Check your shortlisted tutors to arrange trial lessons.</p>
          <a href="shortlist.html" class="btn btn-coral mt-2">View Your Shortlist</a>
        </div>`;
      return;
    }

    const tutor = TUTORS_DATA[currentSwipeIndex];
    swipeDeckEl.innerHTML = `
      <div class="rounded-circle text-white d-inline-flex align-items-center justify-content-center fw-bold fs-2 mb-3" style="width: 80px; height: 80px; background-color: var(--primary-teal);">
        ${tutor.avatar}
      </div>
      <h3 class="fw-bold mb-1">${tutor.name}</h3>
      <p class="text-muted mb-2"><i class="bi bi-geo-alt me-1"></i>${tutor.country}</p>
      <div class="d-flex justify-content-center gap-2 mb-3">
        <span class="badge badge-teal fs-6">${tutor.subject}</span>
        <span class="badge bg-light text-dark border fs-6">${tutor.level}</span>
      </div>
      <h4 class="fw-bold text-teal mb-3" style="color: var(--primary-teal);">S$${tutor.rate} <span class="fs-6 text-muted fw-normal">/ hour</span></h4>
      <p class="text-secondary small mb-3">${tutor.bio}</p>
      <div class="small bg-light p-2 rounded text-start">
        <strong>Qualifications:</strong> ${tutor.qualifications}
      </div>
    `;
  }

  const btnDismiss = document.getElementById("btnSwipeDismiss");
  const btnShortlist = document.getElementById("btnSwipeShortlist");

  if (btnDismiss) {
    btnDismiss.addEventListener("click", function () {
      currentSwipeIndex++;
      renderSwipeDeck();
    });
  }
  if (btnShortlist) {
    btnShortlist.addEventListener("click", function () {
      if (currentSwipeIndex < TUTORS_DATA.length) {
        ShortlistStorage.add(TUTORS_DATA[currentSwipeIndex].id);
      }
      currentSwipeIndex++;
      renderSwipeDeck();
    });
  }
  renderSwipeDeck();

  // ---------------------------------------------------------
  // 3. SHORTLIST PAGE (shortlist.html)
  // ---------------------------------------------------------
  const shortlistGrid = document.getElementById("shortlistGrid");

  function renderShortlistPage() {
    if (!shortlistGrid) return;
    const shortlistIds = ShortlistStorage.getIds();
    const shortlistedTutors = TUTORS_DATA.filter(t => shortlistIds.includes(t.id));

    if (shortlistedTutors.length === 0) {
      shortlistGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-heartbreak text-muted display-3 mb-3 d-block"></i>
          <h5 class="fw-bold text-muted">Empty state: "No tutors shortlisted yet — go swipe!"</h5>
          <a href="tutor-profile.html" class="btn btn-teal mt-3">Go to Tutor Swipe Deck</a>
        </div>`;
      return;
    }

    shortlistGrid.innerHTML = shortlistedTutors.map(tutor => `
      <div class="col-md-6">
        <div class="card card-custom p-4 border-0 shadow-sm">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold fs-4" style="width: 55px; height: 55px; background-color: var(--primary-teal);">
              ${tutor.avatar}
            </div>
            <div class="flex-grow-1">
              <h5 class="fw-bold mb-0">${tutor.name}</h5>
              <p class="text-muted small mb-0">${tutor.subject} • S$${tutor.rate}/hr • ${tutor.country}</p>
            </div>
            <button class="btn btn-outline-danger btn-sm remove-shortlist-btn" data-id="${tutor.id}">
              <i class="bi bi-trash"></i> Remove
            </button>
          </div>
          <div class="mt-3 text-end">
            <a href="request-tutor.html" class="btn btn-coral btn-sm">Request Trial with ${tutor.name.split(' ')[0]}</a>
          </div>
        </div>
      </div>
    `).join('');

    document.querySelectorAll(".remove-shortlist-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.dataset.id);
        ShortlistStorage.remove(id);
        renderShortlistPage();
      });
    });
  }
  renderShortlistPage();

  // ---------------------------------------------------------
  // 4. PRICING & CURRENCY CALCULATOR (pricing.html)
  // ---------------------------------------------------------
  const calcBtn = document.getElementById("calcComputeBtn");
  if (calcBtn) {
    calcBtn.addEventListener("click", function () {
      const hours = parseFloat(document.getElementById("calcHoursInput").value);
      const subject = document.getElementById("calcSubjectSelect").value;
      const resultBox = document.getElementById("calcResultBox");

      if (!hours || hours <= 0) {
        resultBox.innerHTML = `<span class="text-danger fw-bold">Please enter a valid number of weekly hours.</span>`;
        return;
      }

      const localRate = 55; // Average SG physical tutor rate
      const platformRate = 16; // TutorBridge average rate
      const monthlyHours = hours * 4;
      const localCost = localRate * monthlyHours;
      const platformCost = platformRate * monthlyHours;
      const savings = localCost - platformCost;

      resultBox.innerHTML = `
        <div class="row text-center align-items-center g-3">
          <div class="col-md-4">
            <div class="p-3 bg-light rounded">
              <span class="small text-muted d-block mb-1">Local SG Physical Rate</span>
              <h4 class="fw-bold text-dark mb-0">S$${localCost.toLocaleString()}<span class="fs-7 text-muted">/mo</span></h4>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-teal text-white rounded" style="background-color: var(--primary-teal);">
              <span class="small text-light opacity-75 d-block mb-1">TutorBridge Rate</span>
              <h4 class="fw-bold text-white mb-0">S$${platformCost.toLocaleString()}<span class="fs-7 text-light opacity-75">/mo</span></h4>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-warning bg-opacity-25 rounded border border-warning">
              <span class="small text-dark fw-bold d-block mb-1">Direct Monthly Savings</span>
              <h3 class="fw-extrabold text-success mb-0">S$${savings.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      `;
    });
  }

  // ---------------------------------------------------------
  // 5. HOW IT WORKS STEP TRACKER (how-it-works.html)
  // ---------------------------------------------------------
  document.querySelectorAll(".step-tab").forEach(tab => {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".step-tab").forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      
      const stepIndex = this.dataset.step;
      document.querySelectorAll(".step-panel-content").forEach(panel => {
        panel.style.display = (panel.dataset.step === stepIndex) ? "block" : "none";
      });
    });
  });

  // ---------------------------------------------------------
  // 6. FORM VALIDATION (request-tutor.html & contact.html)
  // ---------------------------------------------------------
  document.querySelectorAll("form.needs-validation-custom").forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;

      form.querySelectorAll(".form-control, .form-select").forEach(input => {
        if (!input.checkValidity()) {
          input.classList.add("is-invalid");
          isValid = false;
        } else {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
        }
      });

      const feedbackEl = form.querySelector(".form-feedback-msg");
      if (isValid && feedbackEl) {
        feedbackEl.innerHTML = `
          <div class="alert alert-success mt-3 d-flex align-items-center gap-2">
            <i class="bi bi-check-circle-fill fs-5"></i>
            <div><strong>Request Submitted Successfully!</strong> We will match you with a tutor within 24 hours.</div>
          </div>`;
        form.reset();
      }
    });
  });
});
