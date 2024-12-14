import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListingApprovalQueue } from '../../components/admin/ListingApprovalQueue';
import { useAdmin } from '../../hooks/useAdmin';

export const AdminListingsPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    pendingListings,
    isLoading,
    approveListing,
    rejectListing,
  } = useAdmin();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('admin.pendingListings')}
        </h1>
      </div>

      <ListingApprovalQueue
        listings={pendingListings}
        onApprove={approveListing}
        onReject={rejectListing}
        isLoading={isLoading}
      />
    </div>
  );
};