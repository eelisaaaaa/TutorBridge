// aboutus.js

document.addEventListener("DOMContentLoaded", () => {
  // Hover + click on tutor cards
  document.querySelectorAll(".tutor-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
      card.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
      // Name hover color handled in CSS
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "var(--shadow-sm)";
    });

    card.addEventListener("click", () => {
      const name = card.querySelector(".tutor-name")?.textContent.trim();
      const role = card.querySelector(".tutor-tag")?.textContent.trim();
      if (name && role) {
        alert(`${name} — ${role}`);
      }
    });
  });

  // Smooth scroll to Problem Section (if link exists)
  const problemLink = document.querySelector(".problem-link");
  const problemSection = document.querySelector(".problem-section");
  if (problemLink && problemSection) {
    problemLink.addEventListener("click", e => {
      e.preventDefault();
      problemSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Back to Top button tooltip + scroll
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    backToTopBtn.setAttribute("title", "Back to Top");
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
