// Product Interface
export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // Numeric price in DZD
  currency: 'DZD'; // Always DZD
  description: string;
  images: string[]; // Image URLs or data URLs
  featured: boolean;
  available: boolean;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// Contact Settings
export interface ContactSettings {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  location: string;
  businessHours?: string;
}

// Brand Configuration
export interface BrandConfig {
  name: string;
  subtitle: string;
  slogan: string; // Arabic slogan
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  contactSettings: ContactSettings;
}

// Admin Session
export interface AdminSession {
  isAuthenticated: boolean;
  token?: string;
  createdAt?: number;
}

// Form Validation
export interface FormErrors {
  [key: string]: string;
}
