// Lab 6 — small navigation enhancement
// Close the mobile navigation menu is not required because links remain visible.
// This script adds a subtle scroll-to-section focus for keyboard users.
document.querySelectorAll('.nav-links a, .hero-button').forEach(function (link) {
    link.addEventListener('click', function () {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        }
    });
});
