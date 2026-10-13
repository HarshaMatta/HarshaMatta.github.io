/**
 * DOM, Accessibility, Layout & Storage Simulator
 * Harsha Matta Portfolio Rebuild Test Suite
 */

export class LocalStorageSimulator {
  constructor() {
    this.store = new Map();
    this.quotaExceeded = false;
    this.listeners = new Set();
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    if (this.quotaExceeded) {
      const err = new Error('QuotaExceededError: The quota has been exceeded.');
      err.name = 'QuotaExceededError';
      throw err;
    }
    const oldValue = this.getItem(key);
    const strValue = String(value);
    this.store.set(key, strValue);
    this.notify(key, oldValue, strValue);
  }

  removeItem(key) {
    const oldValue = this.getItem(key);
    this.store.delete(key);
    this.notify(key, oldValue, null);
  }

  clear() {
    this.store.clear();
  }

  simulateQuotaExceeded(val = true) {
    this.quotaExceeded = val;
  }

  addEventListener(listener) {
    this.listeners.add(listener);
  }

  removeEventListener(listener) {
    this.listeners.delete(listener);
  }

  notify(key, oldValue, newValue) {
    for (const listener of this.listeners) {
      try {
        listener({ key, oldValue, newValue });
      } catch (e) {
        // ignore listener exceptions
      }
    }
  }
}

export class ThemeEngineSimulator {
  constructor(storage = new LocalStorageSimulator(), prefersDark = true) {
    this.storage = storage;
    this.prefersDark = prefersDark;
    const classes = new Set();
    this.documentElement = {
      classList: {
        add: (c) => classes.add(c),
        remove: (c) => classes.delete(c),
        contains: (c) => classes.has(c)
      },
      attributes: new Map(),
      setAttribute(name, val) {
        this.attributes.set(name, String(val));
      },
      getAttribute(name) {
        return this.attributes.get(name) || null;
      },
      hasAttribute(name) {
        return this.attributes.has(name);
      }
    };
  }

  /**
   * Simulates critical inline <head> anti-flash execution
   */
  executeHeadScript() {
    try {
      const stored = this.storage.getItem('theme');
      let theme;
      if (stored === 'light' || stored === 'dark') {
        theme = stored;
      } else {
        theme = this.prefersDark ? 'dark' : 'light';
      }

      if (theme === 'dark') {
        this.documentElement.classList.add('dark');
        this.documentElement.setAttribute('data-theme', 'dark');
      } else {
        this.documentElement.classList.remove('dark');
        this.documentElement.setAttribute('data-theme', 'light');
      }
      return theme;
    } catch (e) {
      // Safe fallback
      this.documentElement.classList.add('dark');
      this.documentElement.setAttribute('data-theme', 'dark');
      return 'dark';
    }
  }

  toggleTheme() {
    const isDark = this.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    if (newTheme === 'dark') {
      this.documentElement.classList.add('dark');
      this.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.documentElement.classList.remove('dark');
      this.documentElement.setAttribute('data-theme', 'light');
    }
    try {
      this.storage.setItem('theme', newTheme);
    } catch (e) {
      // Graceful degradation when storage throws
    }
    return newTheme;
  }

  getCurrentTheme() {
    return this.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }
}

export class FocusTrapSimulator {
  constructor(focusableElements = []) {
    this.elements = [...focusableElements];
    this.activeIndex = 0;
    this.isOpen = false;
    this.triggerElement = null;
  }

  open(trigger = null) {
    this.triggerElement = trigger;
    this.isOpen = true;
    this.activeIndex = 0;
    return this.elements[this.activeIndex] || null;
  }

  close() {
    this.isOpen = false;
    const restored = this.triggerElement;
    return restored;
  }

  getCurrentFocus() {
    if (!this.isOpen || this.elements.length === 0) return null;
    return this.elements[this.activeIndex];
  }

  handleKeyDown(key, shiftKey = false) {
    if (!this.isOpen) return null;

    if (key === 'Escape') {
      return this.close();
    }

    if (key === 'Tab') {
      if (this.elements.length === 0) return null;

      if (shiftKey) {
        // Backward cycle
        this.activeIndex = (this.activeIndex - 1 + this.elements.length) % this.elements.length;
      } else {
        // Forward cycle
        this.activeIndex = (this.activeIndex + 1) % this.elements.length;
      }
      return this.elements[this.activeIndex];
    }

    return null;
  }
}

export class ScrollLockSimulator {
  constructor() {
    this.body = {
      style: {
        overflow: ''
      }
    };
    this.previousOverflow = '';
    this.isLocked = false;
  }

  lock() {
    if (!this.isLocked) {
      this.previousOverflow = this.body.style.overflow;
      this.isLocked = true;
    }
    this.body.style.overflow = 'hidden';
  }

  unlock() {
    this.body.style.overflow = this.previousOverflow;
    this.isLocked = false;
  }
}

export class LayoutSimulator {
  static evaluateViewport(viewportWidth, elements = []) {
    const isMobile = viewportWidth <= 480;
    const isTablet = viewportWidth > 480 && viewportWidth <= 1024;
    const isDesktop = viewportWidth > 1024;

    const overflows = elements.filter(el => (el.width || 0) > viewportWidth);

    return {
      viewportWidth,
      isMobile,
      isTablet,
      isDesktop,
      hasHorizontalOverflow: overflows.length > 0,
      overflowingElements: overflows
    };
  }
}

/**
 * Regex-based HTML / text extractor for static analysis
 */
export class HtmlInspector {
  constructor(htmlContent) {
    this.html = htmlContent;
  }

  hasElementWithId(id) {
    const regex = new RegExp(`id=["']${id}["']`, 'i');
    return regex.test(this.html);
  }

  hasElementWithClass(className) {
    const regex = new RegExp(`class=["'][^"']*\\b${className}\\b[^"']*["']`, 'i');
    return regex.test(this.html);
  }

  hasMetaTag(name, content = null) {
    const regex = content
      ? new RegExp(`<meta\\s+[^>]*name=["']${name}["'][^>]*content=["']${content}["']`, 'i')
      : new RegExp(`<meta\\s+[^>]*name=["']${name}["']`, 'i');
    return regex.test(this.html);
  }

  getScripts() {
    const matches = [...this.html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
    return matches.map(m => ({
      attributes: m[1],
      content: m[2]
    }));
  }

  getHeadContent() {
    const match = this.html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
    return match ? match[1] : '';
  }

  hasSkipLink() {
    return /<a\b[^>]*href=["']#(?:main-content|content)["'][^>]*>[\s\S]*?<\/a>/i.test(this.html);
  }

  hasAriaAttribute(attr, value = null) {
    const regex = value
      ? new RegExp(`${attr}=["']${value}["']`, 'i')
      : new RegExp(`${attr}=["'][^"']+["']`, 'i');
    return regex.test(this.html);
  }
}
