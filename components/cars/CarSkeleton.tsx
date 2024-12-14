import React from 'react';
import { Crown } from 'lucide-react';
import { Skeleton } from '../common/Skeleton';

interface CarSkeletonProps {
  isFeatured?: boolean;
}

export const CarSkeleton: React.FC<CarSkeletonProps> = ({ isFeatured = false }) => {
  return (
    <div className={`relative bg-white rounded-lg shadow-sm overflow-hidden flex flex-col ${
      isFeatured ? 'border-2 border-amber-200' : ''
    }`}>
      {isFeatured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1.5 rounded-full flex items-center shadow-lg">
          <Crown className="w-4 h-4 mr-1.5" />
          <span className="text-sm font-medium">Featured</span>
        </div>
      )}
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="mt-auto flex items-center justify-between">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};