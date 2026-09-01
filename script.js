/**
 * Harsha Matta — Personal Portfolio Client Logic
 * Plain Vanilla JS (<2KB) — Ultra-fast, zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScreenshotLightbox();
});

/**
 * Handles Dark / Light Theme switching with localStorage persistence
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const activeTheme = root.getAttribute('data-theme') || 'dark';
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {}
  });
}

/**
 * Lightweight lightbox to click and expand app screenshots
 */
function initScreenshotLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const frames = document.querySelectorAll('.device-frame-sm img, .screenshot-item img');

  if (!lightbox || !lightboxImg || frames.length === 0) return;

  frames.forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
}
