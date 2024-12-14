import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const useGoogleAds = () => {
  useEffect(() => {
    try {
      // Initialize adsbygoogle array if not already initialized
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
      }

      // Only add script if not already present
      if (!document.querySelector('script[src*="adsbygoogle"]')) {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.dataset.adClient = 'ca-pub-XXXXXXXXXXXXXXXX'; // Replace with your ad client ID

        script.onerror = () => {
          console.error('Failed to load AdSense script');
        };

        document.head.appendChild(script);
      }
    } catch (error) {
      console.error('Error initializing AdSense:', error);
    }
  }, []);
};