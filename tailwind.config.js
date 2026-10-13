/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: {
          DEFAULT: 'var(--bg-surface)',
          elevated: 'var(--bg-surface-elevated)',
          hover: 'var(--bg-surface-hover)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          hover: 'var(--border-hover)',
          focus: 'var(--border-focus)',
        },
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          tint: 'var(--accent-tint)',
        },
        paper: {
          canvas: '#FBF9F5',
          surface: '#FAF8F5',
          elevated: '#F3EFE9',
          border: 'rgba(44, 42, 41, 0.12)',
          'border-hover': 'rgba(44, 42, 41, 0.28)',
          ink: '#2C2A29',
          secondary: '#706E6B',
          muted: '#999590',
          accent: '#0369A1',
          'accent-hover': '#0284C7',
          'accent-tint': 'rgba(3, 105, 161, 0.08)',
        },
        obsidian: {
          canvas: '#0B0D0E',
          surface: '#141618',
          elevated: '#1B1E22',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.20)',
          ink: '#F3F4F6',
          secondary: '#CBD5E1',
          muted: '#9CA3AF',
          accent: '#38BDF8',
          'accent-hover': '#7DD3FC',
          'accent-tint': 'rgba(56, 189, 248, 0.12)',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      screens: {
        mobile: '390px',
        tablet: '768px',
        desktop: '1440px',
      },
    },
  },
  plugins: [],
};
