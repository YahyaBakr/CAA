import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ProfileImageUploadProps {
  currentImage?: string;
  name: string;
  onImageChange: (file: File) => void;
  isLoading?: boolean;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImage,
  name,
  onImageChange,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(t('profile.invalidImageType'));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('profile.imageTooLarge'));
      return;
    }

    onImageChange(file);
  };

  return (
    <div className="relative group">
      <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white bg-white">
        {currentImage ? (
          <img
            src={currentImage}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-blue-100 flex items-center justify-center">
            <span className="text-4xl font-medium text-blue-600">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        disabled={isLoading}
        title={t('profile.changePhoto')}
      >
        <Camera className="h-5 w-5 text-gray-600" />
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
  );
};