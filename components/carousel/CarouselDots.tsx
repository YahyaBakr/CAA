import React from 'react';

interface CarouselDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({
  total,
  current,
  onSelect,
}) => {
  if (total <= 1) return null;

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
          }}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            index === current ? 'bg-white' : 'bg-white/50'
          }`}
          aria-label={`Go to image ${index + 1}`}
        />
      ))}
    </div>
  );
};