import { DescriptionContext } from './types';

export const formatNumber = (value: number, context: DescriptionContext): string => {
  return value.toLocaleString(context.language);
};

export const joinPhrases = (phrases: string[], context: DescriptionContext): string => {
  const separator = context.isRTL ? ' ، ' : ', ';
  return phrases.join(separator);
};