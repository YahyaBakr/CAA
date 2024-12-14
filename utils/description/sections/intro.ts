import { Car } from '../../../types/car';
import { DescriptionContext, DescriptionSection } from '../types';

export const generateIntroSection = (
  car: Partial<Car>,
  t: (key: string, options?: any) => string,
  context: DescriptionContext
): DescriptionSection | null => {
  if (!car.make || !car.model || !car.year) return null;

  return {
    key: 'intro',
    content: t('description.intro', {
      year: car.year,
      make: car.make,
      model: car.model,
      trim: car.trim || ''
    })
  };
};