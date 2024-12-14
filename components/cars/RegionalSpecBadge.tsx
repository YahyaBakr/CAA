import React from 'react';
import { useTranslation } from 'react-i18next';
import { RegionalSpec } from '../../types/car';

interface RegionalSpecBadgeProps {
  spec: RegionalSpec;
  size?: 'sm' | 'md';
}

export const RegionalSpecBadge: React.FC<RegionalSpecBadgeProps> = ({ 
  spec,
  size = 'sm'
}) => {
  const { t } = useTranslation();

  const baseClasses = "inline-flex items-center rounded-full font-medium";
  const sizeClasses = size === 'sm' 
    ? "px-2.5 py-0.5 text-xs"
    : "px-3 py-1 text-sm";

  const getSpecClasses = (spec: RegionalSpec) => {
    switch (spec.toLowerCase()) {
      case 'gcc':
        return 'bg-amber-100 text-amber-800';
      case 'chinese':
        return 'bg-red-100 text-red-800';
      case 'korean':
        return 'bg-blue-100 text-blue-800';
      case 'europe':
        return 'bg-indigo-100 text-indigo-800';
      case 'us':
        return 'bg-purple-100 text-purple-800';
      case 'japanese':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`${baseClasses} ${sizeClasses} ${getSpecClasses(spec)}`}>
      {t(`cars.specs.${spec.toLowerCase()}`)}
    </span>
  );
};