import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/useAuthStore';
import { DealerProfile } from './profile/DealerProfile';
import { UserProfile } from './profile/UserProfile';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useProfile } from '../hooks/useProfile';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { isDealer } = useAuthStore();
  const { profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {isDealer() ? (
        <DealerProfile profile={profile} />
      ) : (
        <UserProfile profile={profile} />
      )}
    </div>
  );
};