import { useState, useEffect } from 'react';
import { useImage } from './useImage';

export function useCarousel(images: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateImages = async () => {
      setIsLoading(true);
      const validatedImages = await Promise.all(
        images.map(async (url) => {
          try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok ? url : null;
          } catch {
            return null;
          }
        })
      );
      
      const filteredImages = validatedImages
        .filter((url): url is string => url !== null);
      
      setValidImages(filteredImages.length > 0 ? filteredImages : [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1536'
      ]);
      setIsLoading(false);
    };

    validateImages();
  }, [images]);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return {
    currentIndex,
    validImages,
    isLoading,
    handlePrevious,
    handleNext,
    setCurrentIndex,
  };
}