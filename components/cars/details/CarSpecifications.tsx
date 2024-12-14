import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Calendar, 
  Gauge, 
  Info, 
  Globe,
  Fuel,
  CircuitBoard,
  Zap,
  Cog,
  Settings,
  Shield,
  Target,
  RotateCw,
  Tag,
  Car,
  Users,
  Key,
  Building2,
  Flag
} from 'lucide-react';
import { Car as CarType } from '../../../types/car';
import { RegionalSpecBadge } from '../RegionalSpecBadge';

interface CarSpecificationsProps {
  car: CarType;
}

export const CarSpecifications: React.FC<CarSpecificationsProps> = ({ car }) => {
  const { t } = useTranslation();

  const mainSpecs = [
    {
      icon: <Calendar className="h-5 w-5" />,
      label: t('cars.year'),
      value: car.year,
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      label: t('cars.mileage'),
      value: `${car.mileage.toLocaleString()} km`,
    },
    {
      icon: <Info className="h-5 w-5" />,
      label: t('cars.condition'),
      value: t(`filters.condition.${car.condition}`),
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: t('cars.regionalSpec'),
      value: <RegionalSpecBadge spec={car.regionalSpec} size="md" />,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: t('cars.location'),
      value: car.location,
    },
  ];

  const additionalSpecs = [
    {
      icon: <Fuel className="h-5 w-5" />,
      label: t('cars.fuelType'),
      value: car.fuelType,
    },
    {
      icon: <CircuitBoard className="h-5 w-5" />,
      label: t('cars.engineCapacity'),
      value: car.engineCapacity || t('cars.unknown'),
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: t('cars.horsepower'),
      value: car.horsepower || t('cars.unknown'),
    },
    {
      icon: <Cog className="h-5 w-5" />,
      label: t('cars.cylinders'),
      value: car.cylinders || '8',
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: t('cars.transmission'),
      value: car.transmission,
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: t('cars.warranty'),
      value: car.warranty || t('cars.noWarranty'),
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: t('cars.targetMarket'),
      value: car.targetMarket || t('cars.exportable'),
    },
    {
      icon: <RotateCw className="h-5 w-5" />,
      label: t('cars.steeringSide'),
      value: car.steeringSide || t('cars.leftHand'),
    },
    {
      icon: <Tag className="h-5 w-5" />,
      label: t('cars.trim'),
      value: car.trim || 'LE',
    },
  ];

  const ownershipInfo = [
    {
      icon: <Car className="h-5 w-5" />,
      label: t('cars.firstOwner'),
      value: t('cars.yes'),
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: t('cars.financed'),
      value: t('cars.yes'),
    },
    {
      icon: <Flag className="h-5 w-5" />,
      label: t('cars.registrationCity'),
      value: 'Abu Dhabi',
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: t('cars.sellerNationality'),
      value: 'India',
    },
    {
      icon: <Key className="h-5 w-5" />,
      label: t('cars.numberOfKeys'),
      value: '2',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Specifications */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mainSpecs.map((spec, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center"
          >
            <div className="text-gray-500 mb-2">{spec.icon}</div>
            <p className="text-sm text-gray-500">{spec.label}</p>
            <div className="mt-1">
              {React.isValidElement(spec.value) ? (
                spec.value
              ) : (
                <p className="text-lg font-medium">{spec.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('cars.additionalDetails')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalSpecs.map((spec, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                {spec.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{spec.label}</p>
                <p className="font-medium">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ownership Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('cars.ownershipInfo')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownershipInfo.map((info, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                {info.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{info.label}</p>
                <p className="font-medium">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      {car.description && (
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('cars.description')}</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600 whitespace-pre-line">{car.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};