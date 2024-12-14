import React, { useEffect, useRef } from 'react';

interface GoogleAdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layout?: string;
  className?: string;
  id: string;
}

export const GoogleAd: React.FC<GoogleAdProps> = ({
  slot,
  format = 'auto',
  layout,
  className = '',
  id
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const hasAttemptedLoad = useRef(false);

  useEffect(() => {
    const initAd = () => {
      try {
        if (
          typeof window !== 'undefined' &&
          window.adsbygoogle && 
          adRef.current && 
          !hasAttemptedLoad.current
        ) {
          hasAttemptedLoad.current = true;
          const adElement = adRef.current.querySelector('.adsbygoogle');
          if (adElement && !adElement.hasAttribute('data-ad-status')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }
      } catch (error) {
        console.error('Failed to initialize ad:', error);
      }
    };

    // Attempt to initialize ad after component mounts
    const timer = setTimeout(initAd, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={adRef} className={`google-ad ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-test="on"
        id={`google-ad-${id}`}
        {...(layout && { 'data-ad-layout': layout })}
      />
    </div>
  );
};