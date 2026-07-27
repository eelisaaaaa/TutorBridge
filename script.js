/* =========================
   EduBridge Custom Scripts
   ========================= */

// Tutor Directory Filtering
function filterTutors() {
  const subject = document.getElementById("filterSubject").value.toLowerCase();
  const country = document.getElementById("filterCountry").value.toLowerCase();
  const price = parseFloat(document.getElementById("filterPrice").value);
  const search = document.getElementById("filterSearch").value.toLowerCase();

  const tutors = document.querySelectorAll(".tutor-card");
  tutors.forEach(card => {
    const cardSubject = card.dataset.subject.toLowerCase();
    const cardCountry = card.dataset.country.toLowerCase();
    const cardPrice = parseFloat(card.dataset.price);
    const cardName = card.dataset.name.toLowerCase();

    const matches =
      (!subject || cardSubject.includes(subject)) &&
      (!country || cardCountry.includes(country)) &&
      (!price || cardPrice <= price) &&
      (!search || cardName.includes(search));

    card.style.display = matches ? "block" : "none";
  });
}

// Tutor Profile Modal
document.querySelectorAll(".view-profile-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const tutorId = this.dataset.tutorId;
    const modal = document.getElementById("tutorModal");
    // Populate modal dynamically (example)
    modal.querySelector(".modal-title").textContent = "Tutor Profile: " + tutorId;
    modal.querySelector(".modal-body").textContent = "Details for " + tutorId;
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  });
});

// Pricing Calculator
function calculateSavings() {
  const subject = document.getElementById("calcSubject").value;
  const hours = parseFloat(document.getElementById("calcHours").value);
  const localRate = 50; // Example: local tuition rate per hour
  const platformRate = 15; // Example: average EduBridge rate per hour

  if (!hours || hours <= 0) {
    document.getElementById("calcResult").textContent = "Please enter valid hours.";
    return;
  }

  const localCost = localRate * hours;
  const platformCost = platformRate * hours;
  const savings = localCost - platformCost;

  document.getElementById("calcResult").innerHTML =
    `<strong>Local cost:</strong> S$${localCost}<br>
     <strong>EduBridge cost:</strong> S$${platformCost}<br>
     <strong>Savings:</strong> S$${savings}`;
}

// Form Validation (Sign-Up & Contact)
document.querySelectorAll("form.needs-validation").forEach(form => {
  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  });
});

// FAQ Accordion Toggle (Bootstrap handles most, but add custom highlight)
document.querySelectorAll(".accordion-button").forEach(btn => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// Testimonials Carousel (Bootstrap)
const testimonialCarousel = document.getElementById("testimonialCarousel");
if (testimonialCarousel) {
  new bootstrap.Carousel(testimonialCarousel, {
    interval: 5000,
    wrap: true
  });
}

// How It Works Step Tracker
document.querySelectorAll(".step-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".step-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    const stepContent = document.getElementById(this.dataset.target);
    document.querySelectorAll(".step-content").forEach(c => c.style.display = "none");
    stepContent.style.display = "block";
  });
});