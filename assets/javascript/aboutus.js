// about.js

document.addEventListener("DOMContentLoaded", () => {
  // Tutor card hover effect (extra smooth)
  const tutorCards = document.querySelectorAll(".tutor-card");
  tutorCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
      card.style.transition = "transform 0.3s ease";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // Optional: Click tutor card to show more info (simple alert for demo)
  tutorCards.forEach(card => {
    card.addEventListener("click", () => {
      const name = card.querySelector(".tutor-name")?.textContent;
      const role = card.querySelector(".tutor-tag")?.textContent;
      alert(`${name} — ${role}`);
    });
  });

  // Example: Smooth scroll to Problem Section if needed
  const problemLink = document.querySelector(".problem-link");
  if (problemLink) {
    problemLink.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(".problem-section").scrollIntoView({
        behavior: "smooth"
      });
    });
  }
});
