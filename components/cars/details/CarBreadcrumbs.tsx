import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CarBreadcrumbsProps {
  location: string;
  make: string;
  model: string;
}

export const CarBreadcrumbs: React.FC<CarBreadcrumbsProps> = ({
  location,
  make,
  model,
}) => {
  const navigate = useNavigate();

  const handleLocationClick = () => {
    navigate('/cars', { state: { filters: { location } } });
  };

  const handleMakeClick = () => {
    navigate('/cars', { state: { filters: { make } } });
  };

  const handleModelClick = () => {
    navigate('/cars', { state: { filters: { make, model } } });
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <button
            onClick={handleLocationClick}
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            {location}
          </button>
        </li>
        <li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </li>
        <li>
          <button
            onClick={handleMakeClick}
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            {make}
          </button>
        </li>
        <li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </li>
        <li>
          <button
            onClick={handleModelClick}
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            {model}
          </button>
        </li>
      </ol>
    </nav>
  );
};