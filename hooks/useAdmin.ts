import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/admin.service';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function useAdmin() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const pendingListingsQuery = useQuery({
    queryKey: ['admin', 'pendingListings'],
    queryFn: adminService.getPendingListings,
  });

  const featuredListingsQuery = useQuery({
    queryKey: ['admin', 'featuredListings'],
    queryFn: adminService.getFeaturedListings,
  });

  const approveListingMutation = useMutation({
    mutationFn: adminService.approveListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pendingListings'] });
      toast.success(t('admin.listingApproved'));
    },
  });

  const rejectListingMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      adminService.rejectListing(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pendingListings'] });
      toast.success(t('admin.listingRejected'));
    },
  });

  const approveFeaturedMutation = useMutation({
    mutationFn: adminService.approveFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'featuredListings'] });
      toast.success(t('admin.featuredApproved'));
    },
  });

  const rejectFeaturedMutation = useMutation({
    mutationFn: adminService.rejectFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'featuredListings'] });
      toast.success(t('admin.featuredRejected'));
    },
  });

  return {
    pendingListings: pendingListingsQuery.data || [],
    featuredListings: featuredListingsQuery.data || [],
    isLoading:
      pendingListingsQuery.isLoading || featuredListingsQuery.isLoading,
    approveListing: approveListingMutation.mutate,
    rejectListing: (id: string, reason: string) =>
      rejectListingMutation.mutate({ id, reason }),
    approveFeatured: approveFeaturedMutation.mutate,
    rejectFeatured: rejectFeaturedMutation.mutate,
  };
}