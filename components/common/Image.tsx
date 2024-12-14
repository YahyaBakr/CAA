import React from 'react';
import { Car } from 'lucide-react';
import { useImage } from '../../hooks/useImage';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  showLoadingState?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1536',
  showLoadingState = false,
  className = '',
  ...props
}) => {
  const { isLoading, error, imageSrc } = useImage(src, fallback);

  if (isLoading && showLoadingState) {
    return (
      <div className="bg-gray-100 flex items-center justify-center w-full h-full">
        <div className="animate-pulse flex flex-col items-center">
          <Car className="h-8 w-8 text-gray-400 mb-2" />
          <div className="h-2 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={error ? fallback : imageSrc}
      alt={alt}
      className={className}
      {...props}
    />
  );
};