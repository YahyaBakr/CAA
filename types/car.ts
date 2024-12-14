export type RegionalSpec = 'GCC' | 'Chinese' | 'Korean' | 'Europe' | 'US' | 'Japanese';
export type SteeringSide = 'left' | 'right';
export type BodyType = 'Sedan' | 'SUV' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Wagon' | 'Van' | 'Truck';
export type SellerType = 'Private' | 'Dealer';
export type TransmissionType = 'Automatic' | 'Manual' | 'CVT' | 'DCT' | 'Semi-Automatic';
export type PostedTime = 'today' | '3days' | 'week' | 'month';
export type AdStatus = 'pending' | 'approved' | 'rejected';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'new' | 'used';
  location: string;
  fuelType: string;
  transmission: TransmissionType;
  regionalSpec: RegionalSpec;
  description?: string;
  engineCapacity?: string;
  horsepower?: string;
  cylinders?: string;
  warranty?: string;
  targetMarket?: string;
  steeringSide?: SteeringSide;
  trim?: string;
  bodyType?: BodyType;
  sellerType?: SellerType;
  dealerName?: string;
  exteriorColor?: string;
  interiorColor?: string;
  serviceHistory?: string;
  isFirstOwner?: boolean;
  hasWarranty?: boolean;
  hasServiceHistory?: boolean;
  hasAccidents?: boolean;
  images: string[];
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  featuredUntil?: string;
  status: AdStatus;
  rejectionReason?: string;
}

export interface CarFilters {
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  condition?: 'new' | 'used';
  location?: string;
  regionalSpec?: RegionalSpec;
  bodyType?: BodyType;
  sellerType?: SellerType;
  transmission?: TransmissionType;
  dealerName?: string;
  exteriorColor?: string;
  interiorColor?: string;
  engineCapacity?: string;
  cylinders?: string;
  postedTime?: PostedTime;
  searchText?: string;
  badges?: {
    firstOwner?: boolean;
    underWarranty?: boolean;
    serviceHistory?: boolean;
    noAccidents?: boolean;
  };
  orderBy?: 
    | 'price_asc' 
    | 'price_desc' 
    | 'date_desc' 
    | 'date_asc'
    | 'year_desc' 
    | 'year_asc'
    | 'mileage_desc'
    | 'mileage_asc';
}