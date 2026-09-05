/**
 * Harsha Matta — Modern Engineering Portfolio Engine
 * Kinetics, Streamlit Facades, Cursor Specular Glow & Dynamic RSS Pipeline
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScreenshotLightbox();
  initBentoSpecularGlow();
  initMediumEditorialGrid();
});

/**
 * 1. Dark / Light Theme switching with localStorage persistence
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
 * 2. Kinetic Polish: Cursor-Bound Edge Illumination
 * Tracks mouse position relative to each Bento card and updates CSS variables
 * for dynamic hardware-like specular reflection.
 */
function initBentoSpecularGlow() {
  const cards = document.querySelectorAll('.bento-card, .specular-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 3. Streamlit Project Showcase: Production Facade Pattern
 * Instantiates dark-mode parameterized iframe on-demand upon user interaction.
 */
window.mountStreamlitApp = function(containerId, appUrl) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clean trailing slashes
  const cleanUrl = appUrl.replace(/\/+$/, '');
  
  // High-performance dark embed parameters per Section 6 specification
  const embedUrl = `${cleanUrl}/?embed=true&embed_options=dark_theme&embed_options=hide_loading_screen&embed_options=disable_scrolling`;

  container.innerHTML = `
    <div class="streamlit-frame-wrapper">
      <div class="streamlit-frame-bar">
        <span class="pulse-indicator"></span>
        <span class="frame-url">${cleanUrl}</span>
        <a href="${cleanUrl}" target="_blank" rel="noopener" class="frame-external-link" title="Open in new window">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      </div>
      <iframe 
        src="${embedUrl}" 
        class="streamlit-frame"
        title="Live Streamlit Application"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
        loading="lazy">
      </iframe>
    </div>
  `;
};

/**
 * 4. Dynamic Medium RSS Ingestion Pipeline
 * Ingests user profile feed via RSS-to-JSON, extracts true cover image via regex,
 * clamps excerpts, and renders 16:9 editorial cards. Includes pre-rendered fallback.
 */
const FALLBACK_MEDIUM_ARTICLES = [
  {
    title: "How do you price an option?",
    link: "https://medium.com/@harsha.v.matta/how-do-you-price-an-option-5fbdbce99280",
    pubDate: "Feb 14, 2025",
    topic: "Pricing Theory",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1200/1*bJ5-0R9F1qE8y6eY1B1qbg.png",
    excerpt: "The intuitive foundation of modern derivative valuation theory: expected payoffs, risk-neutral probabilities, and no-arbitrage mechanics."
  },
  {
    title: "American Options, Part 1: Portfolio Approach",
    link: "https://medium.com/@harsha.v.matta/how-to-price-an-american-option-part-1-portfolio-approach-df14612ef694",
    pubDate: "Feb 18, 2025",
    topic: "Derivatives",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1200/1*9I5N-c7V6o1Y4u2B6L4lCw.png",
    excerpt: "Constructing replication portfolios, deriving the early exercise boundary, and examining put-call parity violations under early exercise."
  },
  {
    title: "American Options, Part 2: The Risk-Neutral Approach",
    link: "https://medium.com/@harsha.v.matta/how-to-price-an-american-option-part-2-the-risk-neutral-approach-509ef168a3fe",
    pubDate: "Feb 24, 2025",
    topic: "Quantitative Modeling",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1200/1*y6f1M2L6m8N1o5R8P4qTgA.png",
    excerpt: "Discretizing continuous diffusion paths into binomial lattice trees, backwards induction algorithms, and path-dependent exercise premiums."
  },
  {
    title: "Volatility Risk Premium",
    link: "https://medium.com/@harsha.v.matta/volatility-risk-premium-a35d89502110",
    pubDate: "Mar 1, 2025",
    topic: "Volatility Research",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1200/1*3m7X8k2V5n1A4c9D0eF2hQ.png",
    excerpt: "An empirical investigation into why S&P 500 options systematically price forward volatility higher than realized volatility over 15 years."
  }
];

function parseMediumArticle(rawItem) {
  // Extract high-resolution image URL from the description string
  const imgMatch = rawItem.description?.match(/<img[^>]+src="([^">]+)"/i);
  const heroThumbnail = imgMatch ? imgMatch[1] : '';
  
  // Clean excerpt: strip HTML tags and clamp length
  const plainExcerpt = (rawItem.description || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()
    .slice(0, 140) + '...';

  const dateObj = new Date(rawItem.pubDate);
  const formattedDate = isNaN(dateObj.getTime())
    ? rawItem.pubDate
    : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return {
    title: rawItem.title,
    link: rawItem.link,
    pubDate: formattedDate,
    thumbnail: heroThumbnail,
    excerpt: plainExcerpt
  };
}

async function initMediumEditorialGrid() {
  const container = document.getElementById('editorial-cards-container');
  if (!container) return;

  try {
    const rssUrl = encodeURIComponent('https://medium.com/feed/@harsha.v.matta');
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
    
    // Set a short timeout so that if the user is offline or the proxy is slow, fallback displays immediately
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    
    const data = await response.json();
    if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
      const parsedArticles = data.items.slice(0, 6).map((item, idx) => {
        const parsed = parseMediumArticle(item);
        if (!parsed.thumbnail && FALLBACK_MEDIUM_ARTICLES[idx]) {
          parsed.thumbnail = FALLBACK_MEDIUM_ARTICLES[idx].thumbnail;
        }
        return parsed;
      });
      renderMediumCards(container, parsedArticles);
      return;
    }
  } catch (err) {
    // Graceful fallback to pre-rendered high-quality article metadata
  }

  // Render fallback articles if dynamic fetch fails or runs offline
  renderMediumCards(container, FALLBACK_MEDIUM_ARTICLES);
}

function renderMediumCards(container, articles) {
  const defaultBg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%23121215'/><text x='50%' y='50%' fill='%2306b6d4' font-family='monospace' font-size='20' text-anchor='middle'>Harsha Matta — Quantitative Research</text></svg>";

  container.innerHTML = articles.map(art => `
    <article class="editorial-card specular-card">
      <a href="${art.link}" target="_blank" rel="noopener" class="editorial-card-link" aria-label="${art.title}">
        <div class="editorial-thumbnail-frame">
          <img 
            src="${art.thumbnail || defaultBg}" 
            alt="${art.title}" 
            class="editorial-thumbnail" 
            loading="lazy" 
            onerror="this.onerror=null;this.src='${defaultBg}';"
          />
          <div class="editorial-gradient-scrim"></div>
          <div class="editorial-badge-overlay">
            <span class="editorial-topic">${art.topic || 'Quantitative'}</span>
            <span class="editorial-pubdate">${art.pubDate}</span>
          </div>
        </div>
        <div class="editorial-content">
          <h3 class="editorial-title">${art.title}</h3>
          <p class="editorial-excerpt">${art.excerpt}</p>
          <div class="editorial-cta">
            <span>Read on Medium</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
          </div>
        </div>
      </a>
    </article>
  `).join('');

  // Re-bind specular glow to newly rendered editorial cards
  initBentoSpecularGlow();
}

/**
 * 5. Lightweight Lightbox Modal for Screenshots
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
