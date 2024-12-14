import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CarGrid } from '../components/cars/CarGrid';
import { SearchFilters } from '../components/filters/SearchFilters';
import { CarSort } from '../components/cars/CarSort';
import { Pagination } from '../components/common/Pagination';
import { PageSizeSelector } from '../components/common/PageSizeSelector';
import { ListingPageAds } from '../components/ads/ListingPageAds';
import { CarFilters } from '../types/car';
import { mockCars, filterCars } from '../data/mockCars';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState<CarFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  // Handle filters from navigation state
  useEffect(() => {
    if (location.state?.filters) {
      setFilters(prevFilters => ({
        ...prevFilters,
        ...location.state.filters
      }));
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleContactClick = (carId: string) => {
    navigate(`/cars/${carId}`);
  };

  const handleFilterChange = (newFilters: CarFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setIsLoading(true);
  };

  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, orderBy: value as CarFilters['orderBy'] }));
    setCurrentPage(1);
    setIsLoading(true);
  };

  // Apply filters
  const filteredCars = filterCars(mockCars, filters);

  // Apply sorting
  let displayedCars = [...filteredCars];
  if (filters.orderBy) {
    switch (filters.orderBy) {
      case 'price_asc':
        displayedCars.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        displayedCars.sort((a, b) => b.price - a.price);
        break;
      case 'date_desc':
        displayedCars.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'date_asc':
        displayedCars.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'year_desc':
        displayedCars.sort((a, b) => b.year - a.year);
        break;
      case 'year_asc':
        displayedCars.sort((a, b) => a.year - b.year);
        break;
      case 'mileage_desc':
        displayedCars.sort((a, b) => b.mileage - a.mileage);
        break;
      case 'mileage_asc':
        displayedCars.sort((a, b) => a.mileage - b.mileage);
        break;
    }
  }

  // Pagination
  const totalPages = Math.ceil(displayedCars.length / pageSize);
  const paginatedCars = displayedCars.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-gray-500">
            {t('cars.found', { count: displayedCars.length })}
          </p>
          <PageSizeSelector
            value={pageSize}
            onChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            options={[12, 24, 36, 48]}
          />
        </div>
        <CarSort
          value={filters.orderBy || ''}
          onChange={handleSortChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <CarGrid 
            cars={paginatedCars} 
            onContactClick={handleContactClick} 
            isLoading={isLoading}
            pageSize={pageSize}
          />

          {!isLoading && totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <ListingPageAds />
        </div>
      </div>
    </div>
  );
};