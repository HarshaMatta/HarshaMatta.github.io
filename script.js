/**
 * Harsha Matta — Personal Engineering Portfolio
 * Fast, minimal, static interactions: Scroll Spy & Accessible Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initLightbox();
});

/**
 * 1. Scroll Spy for Sticky Sidebar Navigation
 * Uses IntersectionObserver to update active navigation state
 */
function initScrollSpy() {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const sections = document.querySelectorAll('main section[id]');

  if (!navItems.length || !sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach((item) => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

/**
 * 2. Accessible Lightbox for Screenshots and Technical Diagrams
 */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const triggers = document.querySelectorAll('[data-lightbox], .screenshot-item img');

  if (!modal || !modalImg || !triggers.length) return;

  const openLightbox = (src, alt) => {
    modalImg.src = src;
    modalImg.alt = alt || 'Enlarged project media';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    modalImg.src = '';
    document.body.style.overflow = '';
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox') || trigger.getAttribute('src');
      const caption = trigger.getAttribute('data-caption') || trigger.getAttribute('alt') || '';
      if (src) {
        openLightbox(src, caption);
      }
    });
  });

  modal.addEventListener('click', (e) => {
    // Dismiss when clicking anywhere except the enlarged image itself
    if (e.target !== modalImg) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}
