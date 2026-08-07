// howItWorks.js

document.addEventListener("DOMContentLoaded", () => {
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
