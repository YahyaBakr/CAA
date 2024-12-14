import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselButtonProps {
  direction: 'prev' | 'next';
  onClick: (e: React.MouseEvent) => void;
}

export const CarouselButton: React.FC<CarouselButtonProps> = ({
  direction,
  onClick,
}) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const position = direction === 'prev' ? 'left-2' : 'right-2';

  return (
    <button
      onClick={onClick}
      className={`absolute ${position} top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity`}
      aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} image`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
};