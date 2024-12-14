import React from 'react';
import { useProfile } from '../../hooks/useProfile';

interface SellerAvatarProps {
  sellerId: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SellerAvatar: React.FC<SellerAvatarProps> = ({ 
  sellerId,
  size = 'sm'
}) => {
  const { getSellerInfo } = useProfile();
  const seller = getSellerInfo(sellerId);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  if (!seller) return null;

  return (
    <div className="flex items-center space-x-2">
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0`}>
        {seller.avatar ? (
          <img
            src={seller.avatar}
            alt={seller.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-blue-100 flex items-center justify-center">
            <span className="font-medium text-blue-600">
              {seller.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{seller.name}</span>
        {seller.role === 'dealer' && (
          <span className="text-xs text-gray-500">{seller.companyName}</span>
        )}
      </div>
    </div>
  );
};