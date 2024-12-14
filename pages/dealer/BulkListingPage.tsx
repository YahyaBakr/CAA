import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Copy, Save } from 'lucide-react';
import { Car } from '../../types/car';
import { useCars } from '../../hooks/useCars';
import { CarForm } from '../../components/cars/CarForm';
import { FeaturedAdSelector } from '../../components/featured/FeaturedAdSelector';
import { PaymentForm } from '../../components/payment/PaymentForm';
import { FeaturedPlan } from '../../types/payment';
import { featuredPlans } from '../../data/featuredPlans';
import { toast } from 'react-hot-toast';

interface ListingFormData extends Partial<Car> {
  isFeatured?: boolean;
  featuredPlan?: FeaturedPlan;
}

export const BulkListingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createCar, isCreating } = useCars();
  const [listings, setListings] = useState<ListingFormData[]>([{}]);
  const [currentStep, setCurrentStep] = useState<'details' | 'featured' | 'payment'>('details');
  const [selectedPlan, setSelectedPlan] = useState<FeaturedPlan>();

  const handleAddListing = () => {
    setListings([...listings, {}]);
  };

  const handleRemoveListing = (index: number) => {
    setListings(listings.filter((_, i) => i !== index));
  };

  const handleCopyListing = (index: number) => {
    const listingToCopy = { ...listings[index] };
    setListings([...listings, listingToCopy]);
    toast.success(t('dealer.listingCopied'));
  };

  const handleListingChange = (index: number, data: Partial<Car>) => {
    const updatedListings = [...listings];
    updatedListings[index] = { ...updatedListings[index], ...data };
    setListings(updatedListings);
  };

  const handlePlanSelect = (plan: FeaturedPlan) => {
    setSelectedPlan(plan);
    setCurrentStep('payment');
  };

  const handleSkipFeatured = async () => {
    try {
      await Promise.all(listings.map(listing => createCar(listing)));
      toast.success(t('dealer.bulkListingSuccess'));
      navigate('/profile');
    } catch (error) {
      toast.error(t('dealer.bulkListingError'));
    }
  };

  const handlePayment = async (paymentData: any) => {
    try {
      const enhancedListings = listings.map(listing => ({
        ...listing,
        isFeatured: true,
        featuredUntil: selectedPlan 
          ? new Date(Date.now() + selectedPlan.days * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
      }));

      await Promise.all(enhancedListings.map(listing => createCar(listing)));
      toast.success(t('dealer.featuredListingsCreated'));
      navigate('/profile');
    } catch (error) {
      toast.error(t('errors.payment'));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-5 sm:p-6 bg-white shadow-sm rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('dealer.bulkListing')}
          </h1>
          {currentStep === 'details' && (
            <button
              onClick={handleAddListing}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('dealer.addMore')}
            </button>
          )}
        </div>

        {currentStep === 'details' && (
          <div className="space-y-8">
            {listings.map((listing, index) => (
              <div
                key={index}
                className="relative p-6 border rounded-lg bg-gray-50"
              >
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleCopyListing(index)}
                    className="p-2 text-gray-400 hover:text-blue-500 bg-white rounded-full shadow-sm"
                    title={t('dealer.copyListing')}
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveListing(index)}
                    className="p-2 text-gray-400 hover:text-red-500 bg-white rounded-full shadow-sm"
                    disabled={listings.length === 1}
                    title={t('dealer.removeListing')}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <CarForm
                  initialData={listing}
                  onSubmit={(data) => handleListingChange(index, data)}
                  isLoading={isCreating}
                />
              </div>
            ))}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setCurrentStep('featured')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {t('common.continue')}
              </button>
            </div>
          </div>
        )}

        {currentStep === 'featured' && (
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

        {currentStep === 'payment' && selectedPlan && (
          <PaymentForm
            plan={selectedPlan}
            onSubmit={handlePayment}
            isLoading={isCreating}
          />
        )}
      </div>
    </div>
  );
};