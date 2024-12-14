import { Car, CarFilters } from '../types/car';

// Helper function to create a mock car
const createMockCar = (index: number, isFeatured: boolean = false): Car => ({
  id: (index + 1).toString(),
  make: ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Ferrari', 'Lamborghini'][Math.floor(Math.random() * 6)],
  model: ['M4', 'AMG GT', 'RS7', '911', 'F8', 'Huracan'][Math.floor(Math.random() * 6)],
  year: 2020 + Math.floor(Math.random() * 4),
  price: 50000 + Math.floor(Math.random() * 200000),
  mileage: Math.floor(Math.random() * 50000),
  condition: Math.random() > 0.3 ? 'used' : 'new',
  location: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Riyadh', 'Doha'][Math.floor(Math.random() * 5)],
  description: 'Luxury vehicle in excellent condition',
  fuelType: 'Gasoline',
  transmission: 'Automatic',
  regionalSpec: 'GCC',
  engineCapacity: '3.0L',
  horsepower: '450',
  cylinders: '6',
  warranty: '2 years',
  targetMarket: 'GCC',
  steeringSide: 'left',
  trim: 'Sport',
  bodyType: 'Coupe',
  sellerType: 'Dealer',
  dealerName: 'Premium Motors',
  exteriorColor: ['Black', 'White', 'Silver', 'Blue'][Math.floor(Math.random() * 4)],
  interiorColor: ['Black', 'Brown', 'Red'][Math.floor(Math.random() * 3)],
  serviceHistory: 'Full Service History',
  isFirstOwner: Math.random() > 0.5,
  hasWarranty: Math.random() > 0.3,
  hasServiceHistory: true,
  hasAccidents: false,
  images: [
    'https://images.unsplash.com/photo-1617814076668-4af3ff1dd40f?auto=format&fit=crop&q=80&w=1536',
    'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=1536',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1536'
  ],
  sellerId: `user${Math.floor(Math.random() * 10) + 1}`,
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  isFeatured,
  featuredUntil: isFeatured ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  status: 'approved',
});

// Generate mock cars with 80% featured
const totalCars = 50;
const featuredCount = Math.ceil(totalCars * 0.8); // 80% featured

export const mockCars: Car[] = [
  ...Array.from({ length: featuredCount }, (_, i) => createMockCar(i, true)),
  ...Array.from({ length: totalCars - featuredCount }, (_, i) => createMockCar(i + featuredCount, false))
];

export const filterCars = (cars: Car[], filters: CarFilters): Car[] => {
  return cars.filter(car => {
    // Basic text search
    if (filters.searchText) {
      const searchText = filters.searchText.toLowerCase();
      const searchableFields = [
        car.make,
        car.model,
        car.location,
        car.fuelType,
        car.transmission,
        car.exteriorColor,
        car.interiorColor,
        car.engineCapacity,
        car.cylinders,
        car.dealerName,
      ].filter(Boolean);

      const matchesSearch = searchableFields.some(field =>
        field?.toLowerCase().includes(searchText)
      );

      if (!matchesSearch) return false;
    }

    // Make and model
    if (filters.make && car.make !== filters.make) return false;
    if (filters.model && car.model !== filters.model) return false;

    // Price range
    if (filters.priceFrom && car.price < filters.priceFrom) return false;
    if (filters.priceTo && car.price > filters.priceTo) return false;

    // Year range
    if (filters.yearFrom && car.year < filters.yearFrom) return false;
    if (filters.yearTo && car.year > filters.yearTo) return false;

    // Mileage range
    if (filters.mileageFrom && car.mileage < filters.mileageFrom) return false;
    if (filters.mileageTo && car.mileage > filters.mileageTo) return false;

    // Seller type and dealer
    if (filters.sellerType && car.sellerType !== filters.sellerType) return false;
    if (filters.dealerName && car.dealerName !== filters.dealerName) return false;

    // Colors
    if (filters.exteriorColor && car.exteriorColor !== filters.exteriorColor) return false;
    if (filters.interiorColor && car.interiorColor !== filters.interiorColor) return false;

    // Engine and transmission
    if (filters.engineCapacity && car.engineCapacity !== filters.engineCapacity) return false;
    if (filters.cylinders && car.cylinders !== filters.cylinders) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;

    // Posted time
    if (filters.postedTime) {
      const postedDate = new Date(car.createdAt);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));

      switch (filters.postedTime) {
        case 'today':
          if (diffInDays > 0) return false;
          break;
        case '3days':
          if (diffInDays > 3) return false;
          break;
        case 'week':
          if (diffInDays > 7) return false;
          break;
        case 'month':
          if (diffInDays > 30) return false;
          break;
      }
    }

    // Badges
    if (filters.badges) {
      if (filters.badges.firstOwner && !car.isFirstOwner) return false;
      if (filters.badges.underWarranty && !car.hasWarranty) return false;
      if (filters.badges.serviceHistory && !car.hasServiceHistory) return false;
      if (filters.badges.noAccidents && car.hasAccidents) return false;
    }

    return true;
  });
};