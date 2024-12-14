import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, FileText, MapPin, Calendar } from 'lucide-react';
import { DealerProfile as DealerProfileType } from '../../types/user';
import { DealerStats } from '../../components/dealer/DealerStats';
import { UserListings } from '../../components/profile/UserListings';
import { ProfileImageUpload } from '../../components/profile/ProfileImageUpload';
import { useProfile } from '../../hooks/useProfile';

interface DealerProfileProps {
  profile: DealerProfileType;
}

export const DealerProfile: React.FC<DealerProfileProps> = ({ profile }) => {
  const { t } = useTranslation();
  const { updateProfileImage, isUpdating } = useProfile();

  const dealerInfo = [
    {
      icon: Building2,
      label: t('auth.companyName'),
      value: profile.companyName,
    },
    {
      icon: FileText,
      label: t('auth.tradeLicenseNumber'),
      value: profile.tradeLicenseNumber,
    },
    {
      icon: MapPin,
      label: t('auth.location'),
      value: profile.location,
    },
    {
      icon: Calendar,
      label: t('auth.establishedYear'),
      value: profile.establishedYear,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
        <div className="relative px-6 pb-6">
          <div className="flex items-center">
            <div className="-mt-16">
              <ProfileImageUpload
                currentImage={profile.avatar}
                name={profile.name}
                onImageChange={updateProfileImage}
                isLoading={isUpdating}
              />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dealer Stats */}
      <DealerStats
        totalListings={profile.totalListings}
        activeSales={profile.totalListings}
        viewsToday={245}
        inquiriesToday={12}
      />

      {/* Dealer Information */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {t('auth.dealerInfo')}
          </h3>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dealerInfo.map((info) => (
              <div key={info.label} className="flex items-center">
                <info.icon className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <dt className="text-sm font-medium text-gray-500">
                    {info.label}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{info.value}</dd>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-5">
          <UserListings />
        </div>
      </div>
    </div>
  );
};