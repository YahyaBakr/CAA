import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carsService } from '../services/cars.service';
import { CarFilters } from '../types/car';

export function useCars(filters?: CarFilters) {
  const queryClient = useQueryClient();

  const carsQuery = useQuery({
    queryKey: ['cars', filters],
    queryFn: () => carsService.list(filters),
  });

  const createCarMutation = useMutation({
    mutationFn: carsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  const updateCarMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      carsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  const deleteCarMutation = useMutation({
    mutationFn: carsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  return {
    cars: carsQuery.data || [],
    isLoading: carsQuery.isLoading,
    error: carsQuery.error,
    createCar: createCarMutation.mutate,
    updateCar: updateCarMutation.mutate,
    deleteCar: deleteCarMutation.mutate,
    isCreating: createCarMutation.isPending,
    isUpdating: updateCarMutation.isPending,
    isDeleting: deleteCarMutation.isPending,
  };
}