import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/rtl.css';
import './i18n';

// Set initial direction based on language
document.dir = document.documentElement.lang === 'ar' ? 'rtl' : 'ltr';
document.body.classList.toggle('rtl', document.documentElement.lang === 'ar');

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);