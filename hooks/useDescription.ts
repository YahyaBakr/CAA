import { useTranslation } from 'react-i18next';
import { Car } from '../types/car';
import { useDescriptionGenerator } from '../utils/description';

export const useDescription = () => {
  const { t, i18n } = useTranslation();
  const { generateDescription } = useDescriptionGenerator();

  const generateCarDescription = (car: Partial<Car>): string => {
    return generateDescription(car);
  };

  const isRTL = i18n.dir() === 'rtl';

  return {
    generateCarDescription,
    isRTL,
    currentLanguage: i18n.language,
  };
};