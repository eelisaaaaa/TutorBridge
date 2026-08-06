// howItWorks.js

document.addEventListener("DOMContentLoaded", () => {
  // Step card hover effect
  const stepCards = document.querySelectorAll(".step-card");
  stepCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      card.style.boxShadow = "0 10px 20px rgba(15,107,102,0.15)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
    });
  });

  // Star rating interaction
  const stars = document.querySelectorAll(".star-rating span");
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      stars.forEach((s, i) => {
        s.classList.toggle("active", i <= index);
      });
    });
  });

  // Feedback submission
  const feedbackBtn = document.querySelector(".feedback-section button");
  const feedbackTextarea = document.querySelector(".feedback-section textarea");

  if (feedbackBtn && feedbackTextarea) {
    feedbackBtn.addEventListener("click", () => {
      const feedback = feedbackTextarea.value.trim();
      if (feedback) {
        alert("✅ Thank you for your feedback!");
        feedbackTextarea.value = "";
      } else {
        alert("⚠️ Please enter your feedback before submitting.");
      }
    });
  }
});
