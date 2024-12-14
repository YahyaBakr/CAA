export type UserRole = 'user' | 'dealer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  companyName?: string;
  tradeLicenseNumber?: string;
}

export interface DealerProfile extends UserProfile {
  role: 'dealer';
  companyName: string;
  tradeLicenseNumber: string;
  location: string;
  establishedYear: number;
  totalListings: number;
}

export interface AdminProfile extends UserProfile {
  role: 'admin';
}