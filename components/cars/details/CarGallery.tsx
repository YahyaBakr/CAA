import React from 'react';
import { ImageCarousel } from '../../carousel/ImageCarousel';

interface CarGalleryProps {
  images: string[];
  alt: string;
}

export const CarGallery: React.FC<CarGalleryProps> = ({ images, alt }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <ImageCarousel images={images} alt={alt} />
    </div>
  );
};