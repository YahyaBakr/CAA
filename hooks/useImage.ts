import { useState, useEffect } from 'react';

export function useImage(src?: string, fallback?: string) {
  const [state, setState] = useState({
    isLoading: true,
    error: false,
    imageSrc: src || fallback,
  });

  useEffect(() => {
    if (!src) {
      setState({
        isLoading: false,
        error: true,
        imageSrc: fallback || '',
      });
      return;
    }

    const validateImage = async () => {
      try {
        const response = await fetch(src, { method: 'HEAD' });
        if (!response.ok) throw new Error('Image validation failed');
        
        setState({
          isLoading: false,
          error: false,
          imageSrc: src,
        });
      } catch {
        setState({
          isLoading: false,
          error: true,
          imageSrc: fallback || '',
        });
      }
    };

    validateImage();
  }, [src, fallback]);

  return state;
}