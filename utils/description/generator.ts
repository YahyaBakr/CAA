import { Car } from '../../types/car';
import { DescriptionContext, DescriptionSection } from './types';
import { generateIntroSection } from './sections/intro';
import { generateSpecsSection } from './sections/specs';
import { generateFeaturesSection } from './sections/features';
import { useTranslation } from 'react-i18next';

export const useDescriptionGenerator = () => {
  const { t, i18n } = useTranslation();

  const generateDescription = (car: Partial<Car>): string => {
    const context: DescriptionContext = {
      isRTL: i18n.dir() === 'rtl',
      language: i18n.language
    };

    const sections: (DescriptionSection | null)[] = [
      generateIntroSection(car, t, context),
      generateSpecsSection(car, t, context),
      generateFeaturesSection(car, t, context)
    ];

    // Filter out null sections and join their content
    return sections
      .filter((section): section is DescriptionSection => section !== null)
      .map(section => section.content)
      .join(' ');
  };

  return { generateDescription };
};

// Export a simple version for direct use without hooks
export const generateCarDescription = (car: Partial<Car>): string => {
  const sections = [
    `${car.year} ${car.make} ${car.model}${car.trim ? ` ${car.trim}` : ''}`,
    car.mileage ? `${car.mileage.toLocaleString()} km` : null,
    car.condition === 'new' ? 'Brand New' : 'Pre-owned',
    car.location,
  ];

  return sections.filter(Boolean).join(' - ');
};