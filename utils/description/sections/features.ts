import { Car } from '../../../types/car';
import { DescriptionContext, DescriptionSection } from '../types';
import { joinPhrases } from '../formatters';

export const generateFeaturesSection = (
  car: Partial<Car>,
  t: (key: string, options?: any) => string,
  context: DescriptionContext
): DescriptionSection | null => {
  const features: string[] = [];

  if (car.isFirstOwner) features.push(t('description.firstOwner'));
  if (car.hasWarranty) features.push(t('description.warranty'));
  if (car.hasServiceHistory) features.push(t('description.serviceHistory'));
  if (!car.hasAccidents) features.push(t('description.noAccidents'));

  if (features.length === 0) return null;

  return {
    key: 'features',
    content: t('description.features', { features: joinPhrases(features, context) })
  };
};