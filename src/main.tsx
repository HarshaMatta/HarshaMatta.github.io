import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Fatal: Failed to find target DOM container with id "root". Ensure index.html defines <div id="root"></div>.');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
