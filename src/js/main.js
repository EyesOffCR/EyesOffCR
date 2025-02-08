import '../css/styles.css';

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach((section) => {
    section.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
    observer.observe(section);
});

// Email obfuscation
const emailParts = {
    user: 'ZXllc29mZmNy',  // eyesoffcr
    domain: 'cHJvdG9uLm1l'  // proton.me
};

function decodeEmailParts() {
    return atob(emailParts.user) + '@' + atob(emailParts.domain);
}

// Initialize email links
document.addEventListener('DOMContentLoaded', function() {
    const emailLinks = document.querySelectorAll('.contact-email');
    const decodedEmail = decodeEmailParts();
    
    emailLinks.forEach(link => {
        link.href = `mailto:${decodedEmail}`;
        if (link.classList.contains('show-email')) {
            link.textContent = decodedEmail;
        } else {
            link.textContent = 'Contact Us';
        }
    });
}); 