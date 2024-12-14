import React from 'react';
import { useTranslation } from 'react-i18next';
import { Crown, Check, Star } from 'lucide-react';
import { FeaturedPlan } from '../../types/payment';
import { formatCurrency } from '../../utils/formatters';

interface FeaturedAdSelectorProps {
  plans: FeaturedPlan[];
  selectedPlan?: FeaturedPlan;
  onSelect: (plan: FeaturedPlan) => void;
}

export const FeaturedAdSelector: React.FC<FeaturedAdSelectorProps> = ({
  plans,
  selectedPlan,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 text-amber-600 mb-2">
          <Crown className="h-6 w-6" />
          <h3 className="text-lg font-semibold">
            {t('featured.makeYourAdStandOut')}
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          {t('featured.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => onSelect(plan)}
            className={`relative p-6 rounded-lg border-2 transition-all ${
              selectedPlan?.id === plan.id
                ? 'border-amber-500 bg-amber-50'
                : 'border-gray-200 hover:border-amber-200'
            }`}
          >
            {selectedPlan?.id === plan.id && (
              <div className="absolute -top-3 -right-3">
                <div className="bg-amber-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            <div className="flex items-center justify-center mb-4">
              <Star className={`w-8 h-8 ${
                selectedPlan?.id === plan.id ? 'text-amber-500' : 'text-gray-400'
              }`} />
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">{plan.name}</p>
              <p className="text-2xl font-bold text-amber-600 mt-2">
                {formatCurrency(plan.price)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {formatCurrency(plan.price / plan.days)}/{t('common.day')}
              </p>
              <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-amber-800 mb-2">
          {t('featured.benefits.title')}
        </h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-amber-700">
            <Check className="h-4 w-4 mr-2" />
            {t('featured.benefits.visibility')}
          </li>
          <li className="flex items-center text-sm text-amber-700">
            <Check className="h-4 w-4 mr-2" />
            {t('featured.benefits.priority')}
          </li>
          <li className="flex items-center text-sm text-amber-700">
            <Check className="h-4 w-4 mr-2" />
            {t('featured.benefits.badge')}
          </li>
        </ul>
      </div>
    </div>
  );
};