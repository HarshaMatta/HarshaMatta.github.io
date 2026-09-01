/**
 * Harsha Matta — Personal Website Client Logic
 * Plain Vanilla JS (<2KB) — Instant execution, zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initProjectFiltering();
});

/**
 * Handles Dark / Light Theme switching with localStorage persistence
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Retrieve saved preference or check OS preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = root.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/**
 * Handles category filtering across project cards
 */
function initProjectFiltering() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.project-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Remove active class from all
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
