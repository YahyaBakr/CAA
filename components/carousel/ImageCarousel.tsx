import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Car } from 'lucide-react';
import { DEFAULT_CAR_IMAGE, handleImageError, validateImageUrl } from '../../utils/imageUtils';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images: initialImages, 
  alt,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateImages = async () => {
      setIsLoading(true);
      const validatedImages = await Promise.all(
        initialImages.map(async (url) => {
          const isValid = await validateImageUrl(url);
          return isValid ? url : null;
        })
      );
      
      const filteredImages = validatedImages
        .filter((url): url is string => url !== null);
      
      setValidImages(filteredImages.length > 0 ? filteredImages : [DEFAULT_CAR_IMAGE]);
      setIsLoading(false);
    };

    validateImages();
  }, [initialImages]);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Car className="h-8 w-8 text-gray-400 mb-2" />
          <div className="h-2 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group">
      <img
        src={validImages[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        className={`w-full h-full object-cover ${className}`}
        onError={handleImageError}
      />
      
      {validImages.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};