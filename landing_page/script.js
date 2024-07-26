document.addEventListener("DOMContentLoaded", function() {
    const ctaButton = document.querySelector(".cta-button");
    ctaButton.addEventListener("click", function() {
        alert("Thank you for your interest! Pre-order page coming soon.");
    });

    // Sticky header
    window.addEventListener("scroll", function() {
        const header = document.querySelector(".header");
        header.classList.toggle("sticky", window.scrollY > 0);
    });

    // Smooth scrolling
    document.querySelectorAll(".nav-links a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Scroll animations
    const sections = document.querySelectorAll(".features, .specs, .reviews, .footer");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
