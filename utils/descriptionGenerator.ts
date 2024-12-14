import { Car } from '../types/car';
import { useTranslation } from 'react-i18next';

interface DescriptionSection {
  key: string;
  content: string;
}

interface DescriptionContext {
  isRTL: boolean;
  language: string;
}

const formatNumber = (value: number, context: DescriptionContext): string => {
  return value.toLocaleString(context.language);
};

const joinPhrases = (phrases: string[], context: DescriptionContext): string => {
  const separator = context.isRTL ? ' ، ' : ', ';
  return phrases.join(separator);
};

export const generateCarDescription = (car: Partial<Car>): string => {
  // Fallback description generator for non-React contexts
  const sections = [
    `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''}`,
    car.mileage ? `${car.mileage.toLocaleString()} km` : null,
    car.condition === 'new' ? 'Brand New' : 'Pre-owned',
    car.location,
  ];

  return sections.filter(Boolean).join(' - ');
};

export const useDescriptionGenerator = () => {
  const { t, i18n } = useTranslation();

  const generateDescription = (car: Partial<Car>): string => {
    const context: DescriptionContext = {
      isRTL: i18n.dir() === 'rtl',
      language: i18n.language
    };

    const parts: string[] = [];

    // Introduction
    if (car.make && car.model && car.year) {
      parts.push(
        t('description.intro', {
          year: car.year,
          make: car.make,
          model: car.model,
          trim: car.trim
        })
      );
    }

    // Condition and Mileage
    if (car.condition) {
      const conditionText = t(`description.${car.condition}`);
      if (car.mileage) {
        parts.push(
          t('description.conditionWithMileage', {
            condition: conditionText,
            mileage: formatNumber(car.mileage, context),
            unit: t('description.kilometers')
          })
        );
      } else {
        parts.push(t('description.conditionOnly', { condition: conditionText }));
      }
    }

    // Specifications
    const specs: string[] = [];
    if (car.engineCapacity) specs.push(t('description.engine', { capacity: car.engineCapacity }));
    if (car.transmission) specs.push(t('description.transmission', { type: car.transmission }));
    if (car.fuelType) specs.push(t('description.fuel', { type: car.fuelType }));
    if (car.horsepower) specs.push(t('description.horsepower', { value: car.horsepower }));
    
    if (specs.length > 0) {
      parts.push(t('description.specs', { specs: joinPhrases(specs, context) }));
    }

    // Colors
    if (car.exteriorColor || car.interiorColor) {
      parts.push(
        t('description.colors', {
          exterior: car.exteriorColor,
          interior: car.interiorColor
        })
      );
    }

    // Regional Specifications
    if (car.regionalSpec) {
      parts.push(t('description.specifications', { spec: t(`cars.specs.${car.regionalSpec}`) }));
    }

    // Additional Features
    const features: string[] = [];
    if (car.isFirstOwner) features.push(t('description.firstOwner'));
    if (car.hasWarranty) features.push(t('description.warranty'));
    if (car.hasServiceHistory) features.push(t('description.serviceHistory'));
    if (!car.hasAccidents) features.push(t('description.noAccidents'));
    
    if (features.length > 0) {
      parts.push(
        t('description.features', { features: joinPhrases(features, context) })
      );
    }

    // Location and Contact
    if (car.location) {
      parts.push(t('description.location', { location: car.location }));
    }

    // Call to Action
    parts.push(t('description.callToAction'));

    return parts.join(' ');
  };

  return { generateDescription };
};