import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/users.service';

export function useUserListings() {
  const listingsQuery = useQuery({
    queryKey: ['userListings'],
    queryFn: usersService.getListings,
  });

  return {
    listings: listingsQuery.data || [],
    isLoading: listingsQuery.isLoading,
    error: listingsQuery.error,
  };
}