import { Car } from '../../../types/car';
import { DescriptionContext, DescriptionSection } from '../types';
import { joinPhrases } from '../formatters';

export const generateSpecsSection = (
  car: Partial<Car>,
  t: (key: string, options?: any) => string,
  context: DescriptionContext
): DescriptionSection | null => {
  const specs: string[] = [];

  if (car.engineCapacity) {
    specs.push(t('description.engine', { capacity: car.engineCapacity }));
  }
  if (car.transmission) {
    specs.push(t('description.transmission', { type: car.transmission }));
  }
  if (car.fuelType) {
    specs.push(t('description.fuel', { type: car.fuelType }));
  }
  if (car.horsepower) {
    specs.push(t('description.horsepower', { value: car.horsepower }));
  }

  if (specs.length === 0) return null;

  return {
    key: 'specs',
    content: t('description.specs', { specs: joinPhrases(specs, context) })
  };
};