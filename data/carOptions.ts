import { locations } from './locations';

export const carMakes = [
  'Audi',
  'BMW',
  'Ferrari',
  'Honda',
  'Lamborghini',
  'McLaren',
  'Mercedes-Benz',
  'Porsche',
  'Tesla',
  'Toyota',
] as const;

export const carModels: Record<string, string[]> = {
  BMW: ['M3', 'M4', 'M5', 'X5', 'X6', '7 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'G-Class', 'AMG GT'],
  Porsche: ['911', 'Cayenne', 'Panamera', 'Taycan', 'Macan'],
  Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'RS e-tron GT'],
  Ferrari: ['F8 Tributo', '296 GTB', 'SF90 Stradale', 'Roma', 'Portofino'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V'],
  Lamborghini: ['Huracán', 'Aventador', 'Urus'],
  McLaren: ['720S', '765LT', 'Artura', 'GT'],
  Toyota: ['Camry', 'RAV4', 'Land Cruiser', 'Corolla', 'Highlander'],
};

export const bodyTypes = [
  'Sedan',
  'SUV',
  'Coupe',
  'Convertible',
  'Hatchback',
  'Wagon',
  'Van',
  'Truck',
] as const;

export const transmissionTypes = [
  'Automatic',
  'Manual',
  'CVT',
  'DCT',
  'Semi-Automatic',
] as const;

export const regionalSpecs = [
  'GCC',
  'Chinese',
  'Korean',
  'Europe',
  'US',
  'Japanese',
] as const;

export const sellerTypes = ['Private', 'Dealer'] as const;

export const fuelTypes = [
  'Gasoline',
  'Diesel',
  'Electric',
  'Hybrid',
  'Plug-in Hybrid',
] as const;

export const dealerNames = [
  'Premium Motors',
  'Luxury Auto Gallery',
  'Elite Cars',
  'AutoMax Dealers',
  'Royal Motors',
] as const;

export const exteriorColors = [
  'Black',
  'White',
  'Silver',
  'Gray',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Brown',
  'Orange',
] as const;

export const interiorColors = [
  'Black',
  'Beige',
  'Brown',
  'Gray',
  'Red',
  'White',
] as const;

export const engineCapacities = [
  '1.0L',
  '1.4L',
  '1.6L',
  '1.8L',
  '2.0L',
  '2.5L',
  '3.0L',
  '3.5L',
  '4.0L',
  '5.0L',
  '6.0L+',
] as const;

export const cylinderOptions = [
  '3',
  '4',
  '5',
  '6',
  '8',
  '10',
  '12',
] as const;

export const serviceHistoryOptions = [
  'Full Service History',
  'Partial Service History',
  'No Service History',
  'Agency Service History',
] as const;

export const badges = [
  { id: 'firstOwner', label: 'First Owner' },
  { id: 'underWarranty', label: 'Under Warranty' },
  { id: 'serviceHistory', label: 'Service History' },
  { id: 'noAccidents', label: 'No Accidents' },
] as const;

export { locations };