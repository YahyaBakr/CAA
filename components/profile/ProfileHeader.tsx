import React from 'react';
import { useTranslation } from 'react-i18next';
import { Camera } from 'lucide-react';
import { UserProfile } from '../../types/user';

interface ProfileHeaderProps {
  profile: UserProfile;
  onAvatarChange: (file: File) => void;
  isLoading?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onAvatarChange,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full overflow-hidden ring-4 ring-white">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-medium text-gray-500">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={isLoading}
            >
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {profile.name}
              </h1>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};