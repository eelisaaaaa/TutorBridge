document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".guide-btn").forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();
            alert("Full guide article loaded!");

        });

    });

    document.getElementById("tys-link").addEventListener("click", (event) => {

        event.preventDefault();
        alert("Ten-Year-Series Digital Practice Bank opened.");

    });

    document.getElementById("faq-button").addEventListener("click", () => {

        openFAQModal();

    });

});