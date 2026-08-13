// howItWorks.js


document.addEventListener("DOMContentLoaded", () => {
  // Step card hover effect
  const stepCards = document.querySelectorAll(".step-card");
  stepCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
      card.style.boxShadow = "0 10px 20px rgba(15,107,102,0.15)";
    });


    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
    });
  });


  // Star rating interaction
  const stars = document.querySelectorAll(".star-rating span");
  const ratingMessage = document.createElement("p");
  ratingMessage.className = "text-success";
  ratingMessage.style.marginTop = "10px";


  const starSection = document.querySelector(".star-rating-section");
  if (starSection) {
    starSection.appendChild(ratingMessage);
  }


  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      stars.forEach((s, i) => {
        s.classList.toggle("active", i <= index);
      });
      ratingMessage.textContent = `✅ You rated ${index + 1} star${index > 0 ? "s" : ""}`;
    });
    star.setAttribute("title", `Rate ${index + 1} star${index > 0 ? "s" : ""}`);
  });


  // Feedback submission
  const feedbackBtn = document.querySelector(".feedback-section button");
  const feedbackTextarea = document.querySelector(".feedback-section textarea");


  if (feedbackBtn && feedbackTextarea) {
    const feedbackMessage = document.createElement("p");
    feedbackMessage.style.marginTop = "10px";
    feedbackBtn.parentNode.appendChild(feedbackMessage);


    feedbackBtn.addEventListener("click", () => {
      const feedback = feedbackTextarea.value.trim();
      if (feedback) {
        feedbackMessage.textContent = "✅ Thank you for your feedback!";
        feedbackMessage.className = "text-success";
        feedbackTextarea.value = "";
      } else {
        feedbackMessage.textContent = "⚠️ Please enter your feedback before submitting.";
        feedbackMessage.className = "text-danger";
      }
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
