// /assets/js/amenities.js
document.addEventListener('DOMContentLoaded', () => {
  // Check if AOS is loaded to avoid errors
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100, // Start animation a bit sooner
    });
  }
});
