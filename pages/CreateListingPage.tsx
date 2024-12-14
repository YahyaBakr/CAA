import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CarForm } from '../components/cars/CarForm';
import { FeaturedAdSelector } from '../components/featured/FeaturedAdSelector';
import { PaymentForm } from '../components/payment/PaymentForm';
import { useCars } from '../hooks/useCars';
import { Car } from '../types/car';
import { FeaturedPlan } from '../types/payment';
import { featuredPlans } from '../data/featuredPlans';
import { toast } from 'react-hot-toast';

export const CreateListingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createCar, isCreating } = useCars();
  const [step, setStep] = useState<'details' | 'featured' | 'payment'>('details');
  const [listingData, setListingData] = useState<Partial<Car>>();
  const [selectedPlan, setSelectedPlan] = useState<FeaturedPlan>();

  const handleListingSubmit = async (data: Partial<Car>) => {
    setListingData(data);
    setStep('featured');
  };

  const handlePlanSelect = (plan: FeaturedPlan) => {
    setSelectedPlan(plan);
    setStep('payment');
  };

  const handleSkipFeatured = async () => {
    if (!listingData) return;
    
    try {
      await createCar(listingData);
      toast.success(t('cars.listingCreated'));
      navigate('/profile');
    } catch (error) {
      toast.error(t('errors.createListing'));
    }
  };

  const handlePayment = async (paymentData: any) => {
    if (!listingData || !selectedPlan) return;

    try {
      // Add featured listing data
      const enhancedListing = {
        ...listingData,
        isFeatured: true,
        featuredUntil: new Date(Date.now() + selectedPlan.days * 24 * 60 * 60 * 1000).toISOString(),
      };

      await createCar(enhancedListing);
      toast.success(t('cars.featuredListingCreated'));
      navigate('/profile');
    } catch (error) {
      toast.error(t('errors.payment'));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {t('cars.addListing')}
          </h1>

          {step === 'details' && (
            <CarForm onSubmit={handleListingSubmit} isLoading={isCreating} />
          )}

          {step === 'featured' && (
            <div className="space-y-6">
              <FeaturedAdSelector
                plans={featuredPlans}
                selectedPlan={selectedPlan}
                onSelect={handlePlanSelect}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleSkipFeatured}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  {t('featured.skip')}
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && selectedPlan && (
            <PaymentForm
              plan={selectedPlan}
              onSubmit={handlePayment}
              isLoading={isCreating}
            />
          )}
        </div>
      </div>
    </div>
  );
};