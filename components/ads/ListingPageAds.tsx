import React from 'react';
import { GoogleAd } from './GoogleAd';

export const ListingPageAds: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="sticky top-4">
        <GoogleAd
          id="listing-sidebar-1"
          slot="1234567890"
          format="rectangle"
          className="min-h-[600px] bg-gray-50 rounded-lg overflow-hidden shadow-sm"
        />
      </div>
      <div className="mt-6">
        <GoogleAd
          id="listing-sidebar-2"
          slot="0987654321"
          format="rectangle"
          className="min-h-[250px] bg-gray-50 rounded-lg overflow-hidden shadow-sm"
        />
      </div>
    </div>
  );
};
