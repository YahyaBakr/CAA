import React from 'react';
import { GoogleAd } from './GoogleAd';

export const DetailPageAds: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <GoogleAd
          id="detail-in-article"
          slot="0987654321"
          format="fluid"
          layout="in-article"
          className="min-h-[250px] bg-gray-50 rounded-lg overflow-hidden shadow-sm my-8"
        />
      </div>
      <div>
        <GoogleAd
          id="detail-responsive"
          slot="1234567890"
          format="auto"
          className="min-h-[250px] bg-gray-50 rounded-lg overflow-hidden shadow-sm"
        />
      </div>
    </div>
  );
};
