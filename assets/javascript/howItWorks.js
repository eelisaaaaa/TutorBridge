// about.js

document.addEventListener("DOMContentLoaded", () => {
  // Tutor card hover effect
  const tutorCards = document.querySelectorAll(".tutor-card");
  tutorCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      card.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "var(--shadow-sm)";
    });
  });

  // Click tutor card to show more info
  tutorCards.forEach(card => {
    card.addEventListener("click", () => {
      const name = card.querySelector(".tutor-name")?.textContent.trim();
      const role = card.querySelector(".tutor-tag")?.textContent.trim();
      if (name && role) {
        alert(`${name} — ${role}`);
      }
    });
  });

  // Smooth scroll to Problem Section if link exists
  const problemLink = document.querySelector(".problem-link");
  if (problemLink) {
    problemLink.addEventListener("click", e => {
      e.preventDefault();
      const problemSection = document.querySelector(".problem-section");
      if (problemSection) {
        problemSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});
