import { Product } from '@/types';
import { generateId, slugify } from './utils';

const PRODUCTS_KEY = 'pottery_products_v2';
const IMAGES_KEY = 'pottery_images_v2';

// Default sample products in DZD
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'classic-terracotta-vase',
    name: 'Classic Terracotta Vase',
    price: 4500, // DZD
    currency: 'DZD',
    description: 'Hand-thrown traditional terracotta vase with authentic glazing. Perfect for flowers or standalone display.',
    images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop'],
    featured: true,
    available: true,
    category: 'Vases',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-002',
    slug: 'berber-water-jug',
    name: 'Berber Water Jug',
    price: 5500, // DZD
    currency: 'DZD',
    description: 'Traditional Algerian water jug with decorative patterns. Handcrafted using ancestral techniques.',
    images: ['https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=800&h=800&fit=crop'],
    featured: true,
    available: true,
    category: 'Jugs',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-003',
    slug: 'artisan-earthen-bowl',
    name: 'Artisan Earthen Bowl',
    price: 3500, // DZD
    currency: 'DZD',
    description: 'Natural earth-toned bowl perfect for serving or display. Each piece is unique and handmade.',
    images: ['https://images.unsplash.com/photo-1565193566173-7cda482f1448?w=800&h=800&fit=crop'],
    featured: false,
    available: true,
    category: 'Bowls',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-004',
    slug: 'decorative-clay-pot',
    name: 'Decorative Clay Pot',
    price: 6500, // DZD
    currency: 'DZD',
    description: 'Large ornamental pot with intricate surface patterns. A statement piece for any interior.',
    images: ['https://images.unsplash.com/photo-1578963389147-5cbe63360503?w=800&h=800&fit=crop'],
    featured: true,
    available: true,
    category: 'Pots',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Get all products
export function getProducts(): Product[] {
  if (typeof window === 'undefined') {
    return DEFAULT_PRODUCTS;
  }

  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
  } catch (error) {
    console.error('Error loading products:', error);
    return DEFAULT_PRODUCTS;
  }
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return getProducts().filter((p) => p.featured && p.available);
}

// Get related products
export function getRelatedProducts(
  productId: string,
  limit: number = 3
): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  return getProducts()
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

// Create product
export function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const product: Product = {
    ...data,
    id: generateId(),
    slug: data.slug || slugify(data.name),
    currency: 'DZD',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const products = getProducts();
  products.push(product);
  saveProducts(products);

  return product;
}

// Update product
export function updateProduct(
  id: string,
  updates: Partial<Omit<Product, 'id' | 'createdAt'>>
): Product | null {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...updates,
    currency: 'DZD', // Always DZD
    id: products[index].id, // Don't change ID
    createdAt: products[index].createdAt, // Don't change creation date
    updatedAt: new Date().toISOString(), // Update modification date
  };

  saveProducts(products);
  return products[index];
}

// Delete product
export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);

  if (filtered.length === products.length) return false;

  saveProducts(filtered);
  return true;
}

// Duplicate product
export function duplicateProduct(id: string): Product | null {
  const product = getProductById(id);
  if (!product) return null;

  const duplicate: Product = {
    ...product,
    id: generateId(),
    slug: `${product.slug}-copy`,
    name: `${product.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const products = getProducts();
  products.push(duplicate);
  saveProducts(products);

  return duplicate;
}

// Save products to localStorage
function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products:', error);
  }
}

// Export products as JSON
export function exportProducts(): string {
  const products = getProducts();
  return JSON.stringify(products, null, 2);
}

// Import products from JSON
export function importProducts(jsonData: string): { success: boolean; message: string; count?: number } {
  try {
    const products = JSON.parse(jsonData);

    if (!Array.isArray(products)) {
      return { success: false, message: 'Invalid format: Expected an array of products' };
    }

    // Validate products
    const validated = products.map((p: any) => ({
      ...p,
      currency: 'DZD', // Force DZD
      price: typeof p.price === 'number' ? p.price : parseInt(p.price) || 0,
    }));

    saveProducts(validated);
    return {
      success: true,
      message: `Successfully imported ${validated.length} products`,
      count: validated.length,
    };
  } catch (error) {
    return {
      success: false,
      message: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Get statistics
export function getProductStats() {
  const products = getProducts();
  return {
    total: products.length,
    available: products.filter((p) => p.available).length,
    featured: products.filter((p) => p.featured).length,
    totalValue: products.reduce((sum, p) => sum + (p.available ? p.price : 0), 0),
    categories: [...new Set(products.map((p) => p.category).filter(Boolean))],
  };
}

// Image storage functions
export function saveImageData(imageUrl: string, base64: string): void {
  if (typeof window === 'undefined') return;

  try {
    const images = JSON.parse(localStorage.getItem(IMAGES_KEY) || '{}');
    images[imageUrl] = base64;
    localStorage.setItem(IMAGES_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Error saving image:', error);
  }
}

export function getImageData(imageUrl: string): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const images = JSON.parse(localStorage.getItem(IMAGES_KEY) || '{}');
    return images[imageUrl] || null;
  } catch (error) {
    return null;
  }
}

// Reset to defaults
export function resetToDefaults(): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
}
