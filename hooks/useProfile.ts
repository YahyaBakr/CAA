import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { DealerProfile, UserProfile } from '../types/user';
import { usersService } from '../services/users.service';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

// Mock data for demonstration
const mockUsers = {
  'user1': {
    id: 'user1',
    email: 'user@user.com',
    name: 'John Smith',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  } as UserProfile,
  'user2': {
    id: 'user2',
    email: 'dealer@example.com',
    name: 'Premium Motors',
    role: 'dealer',
    companyName: 'Premium Motors LLC',
    tradeLicenseNumber: 'TL789012',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  } as DealerProfile,
};

export function useProfile() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      // Mock API call - return profile based on user type
      return new Promise<UserProfile>((resolve) => {
        setTimeout(() => {
          if (user?.email === 'adm@adm.com') {
            resolve({
              id: '1',
              email: 'adm@adm.com',
              name: 'Admin Dealer',
              role: 'dealer',
              companyName: 'Admin Motors',
              tradeLicenseNumber: 'TL123456',
              location: 'Dubai, UAE',
              establishedYear: 2010,
              totalListings: 45,
              avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            } as DealerProfile);
          } else {
            resolve({
              id: '2',
              email: 'user@user.com',
              name: 'Regular User',
              role: 'user',
              phone: '+1234567890',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            } as UserProfile);
          }
        }, 500);
      });
    },
    enabled: !!user,
  });

  const updateProfileMutation = useMutation({
    mutationFn: usersService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(t('profile.updateSuccess'));
    },
    onError: () => {
      toast.error(t('profile.updateError'));
    },
  });

  const updateProfileImageMutation = useMutation({
    mutationFn: usersService.updateProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(t('profile.photoUpdateSuccess'));
    },
    onError: () => {
      toast.error(t('profile.photoUpdateError'));
    },
  });

  const getSellerInfo = (sellerId: string) => {
    return mockUsers[sellerId as keyof typeof mockUsers];
  };

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    updateProfile: updateProfileMutation.mutate,
    updateProfileImage: updateProfileImageMutation.mutate,
    isUpdating: updateProfileMutation.isPending || updateProfileImageMutation.isPending,
    getSellerInfo,
  };
}