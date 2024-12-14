import React from 'react';
import { Crown } from 'lucide-react';

export const FeaturedBadge: React.FC = () => {
  return (
    <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full flex items-center shadow-lg z-10">
      <Crown className="w-4 h-4 mr-1" />
      <span className="text-sm font-medium">Featured</span>
    </div>
  );
};