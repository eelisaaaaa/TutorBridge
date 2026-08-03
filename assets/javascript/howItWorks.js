// howItWorks.js

document.addEventListener("DOMContentLoaded", () => {
  // Step cards hover effect (optional JS enhancement)
  const stepCards = document.querySelectorAll("main > section");
  stepCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // FAQ toggle
  const faqItems = document.querySelectorAll(".faq-section .faq-item");
  faqItems.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("open");
      const answer = item.querySelector(".faq-answer");
      if (item.classList.contains("open")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // Star rating
  const stars = document.querySelectorAll(".star-rating span");
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      stars.forEach((s, i) => {
        if (i <= index) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });
  });

  // Feedback submission
  const feedbackForm = document.querySelector(".feedback-section");
  if (feedbackForm) {
    const submitBtn = feedbackForm.querySelector("button");
    const textarea = feedbackForm.querySelector("textarea");

    submitBtn.addEventListener("click", () => {
      const feedbackText = textarea.value.trim();
      if (feedbackText.length > 0) {
        alert("Thank you for your feedback! 🎉");
        textarea.value = "";
        stars.forEach(s => s.classList.remove("active"));
      } else {
        alert("Please enter your feedback before submitting.");
      }
    });
  }
});
