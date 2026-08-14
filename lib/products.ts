import { Product } from '@/types';
import { generateId, slugify } from './utils';

const PRODUCTS_KEY = 'pottery_products_v2';
const IMAGES_KEY = 'pottery_images_v2';

// ============================================================
// DEFAULT PRODUCTS
// ============================================================

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'classic-terracotta-vase',
    name: 'Classic Terracotta Vase',
    price: 4500,
    currency: 'DZD',
    description:
      'Hand-thrown traditional terracotta vase with authentic glazing. Perfect for flowers or standalone display.',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop',
    ],
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
    price: 5500,
    currency: 'DZD',
    description:
      'Traditional Algerian water jug with decorative patterns. Handcrafted using ancestral techniques.',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=800&h=800&fit=crop',
    ],
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
    price: 3500,
    currency: 'DZD',
    description:
      'Natural earth-toned bowl perfect for serving or display. Each piece is unique and handmade.',
    images: [
      'https://images.unsplash.com/photo-1565193566173-7cda482f1448?w=800&h=800&fit=crop',
    ],
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
    price: 6500,
    currency: 'DZD',
    description:
      'Large ornamental pot with intricate surface patterns. A statement piece for any interior.',
    images: [
      'https://images.unsplash.com/photo-1578963389147-5cbe63360503?w=800&h=800&fit=crop',
    ],
    featured: true,
    available: true,
    category: 'Pots',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ============================================================
// GET ALL PRODUCTS
// ============================================================

export function getProducts(): Product[] {
  if (typeof window === 'undefined') {
    return DEFAULT_PRODUCTS;
  }

  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);

    if (!stored) {
      return DEFAULT_PRODUCTS;
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : DEFAULT_PRODUCTS;
  } catch (error) {
    console.error('Error loading products:', error);
    return DEFAULT_PRODUCTS;
  }
}

// ============================================================
// GET PRODUCT BY ID
// ============================================================

export function getProductById(
  id: string
): Product | undefined {
  return getProducts().find((product) => product.id === id);
}

// ============================================================
// GET PRODUCT BY SLUG
// ============================================================

export function getProductBySlug(
  slug: string
): Product | undefined {
  return getProducts().find(
    (product) => product.slug === slug
  );
}

// ============================================================
// GET FEATURED PRODUCTS
// ============================================================

export function getFeaturedProducts(
  limit?: number
): Product[] {
  const products = getProducts().filter(
    (product) =>
      product.featured && product.available
  );

  return typeof limit === 'number'
    ? products.slice(0, limit)
    : products;
}

// ============================================================
// GET AVAILABLE PRODUCTS
// ============================================================

export function getAvailableProducts(): Product[] {
  return getProducts().filter(
    (product) => product.available
  );
}

// ============================================================
// GET RELATED PRODUCTS
// ============================================================

export function getRelatedProducts(
  productId: string,
  limit: number = 3
): Product[] {
  const product = getProductById(productId);

  if (!product) {
    return [];
  }

  return getProducts()
    .filter(
      (p) =>
        p.id !== productId &&
        p.category === product.category
    )
    .slice(0, limit);
}

// ============================================================
// CREATE PRODUCT
// ============================================================

export function createProduct(
  data: Omit<
    Product,
    'id' | 'slug' | 'createdAt' | 'updatedAt'
  > & {
    slug?: string;
  }
): Product {
  const now = new Date().toISOString();

  const product: Product = {
    ...data,

    id: generateId(),

    slug:
      data.slug && data.slug.trim()
        ? data.slug
        : slugify(data.name),

    currency: 'DZD',

    createdAt: now,
    updatedAt: now,
  };

  const products = getProducts();

  products.push(product);

  saveProducts(products);

  return product;
}

// ============================================================
// UPDATE PRODUCT
// ============================================================

export function updateProduct(
  id: string,
  updates: Partial<
    Omit<Product, 'id' | 'createdAt'>
  >
): Product | null {
  const products = getProducts();

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...updates,

    currency: 'DZD',

    id: products[index].id,

    createdAt: products[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  saveProducts(products);

  return products[index];
}

// ============================================================
// DELETE PRODUCT
// ============================================================

export function deleteProduct(
  id: string
): boolean {
  const products = getProducts();

  const filtered = products.filter(
    (product) => product.id !== id
  );

  if (filtered.length === products.length) {
    return false;
  }

  saveProducts(filtered);

  return true;
}

// ============================================================
// DUPLICATE PRODUCT
// ============================================================

export function duplicateProduct(
  id: string
): Product | null {
  const product = getProductById(id);

  if (!product) {
    return null;
  }

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

// ============================================================
// SAVE PRODUCTS
// ============================================================

function saveProducts(
  products: Product[]
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(
      PRODUCTS_KEY,
      JSON.stringify(products)
    );
  } catch (error) {
    console.error(
      'Error saving products:',
      error
    );
  }
}

// ============================================================
// EXPORT PRODUCTS
// ============================================================

export function exportProducts(): string {
  const products = getProducts();

  return JSON.stringify(
    products,
    null,
    2
  );
}

// ============================================================
// IMPORT PRODUCTS
// ============================================================

export function importProducts(
  jsonData: string
): {
  success: boolean;
  message: string;
  count?: number;
  products?: Product[];
} {
  try {
    const products = JSON.parse(jsonData);

    if (!Array.isArray(products)) {
      return {
        success: false,
        message:
          'Invalid format: Expected an array of products',
      };
    }

    const validated: Product[] = products.map(
      (p: any) => {
        const now = new Date().toISOString();

        return {
          ...p,

          id:
            typeof p.id === 'string'
              ? p.id
              : generateId(),

          slug:
            typeof p.slug === 'string' &&
            p.slug.trim()
              ? p.slug
              : slugify(
                  typeof p.name === 'string'
                    ? p.name
                    : 'product'
                ),

          name:
            typeof p.name === 'string'
              ? p.name
              : 'Product',

          price:
            typeof p.price === 'number'
              ? p.price
              : parseInt(p.price) || 0,

          currency: 'DZD',

          description:
            typeof p.description === 'string'
              ? p.description
              : '',

          images:
            Array.isArray(p.images)
              ? p.images
              : [],

          featured:
            Boolean(p.featured),

          available:
            p.available !== false,

          category:
            typeof p.category === 'string'
              ? p.category
              : 'Poterie',

          createdAt:
            typeof p.createdAt === 'string'
              ? p.createdAt
              : now,

          updatedAt:
            now,
        };
      }
    );

    saveProducts(validated);

    return {
      success: true,

      message: `Successfully imported ${validated.length} products`,

      count: validated.length,

      products: validated,
    };
  } catch (error) {
    return {
      success: false,

      message: `Import failed: ${
        error instanceof Error
          ? error.message
          : 'Unknown error'
      }`,
    };
  }
}

// ============================================================
// PRODUCT STATISTICS
// ============================================================

export function getProductStats() {
  const products = getProducts();

  return {
    total: products.length,

    available: products.filter(
      (product) => product.available
    ).length,

    featured: products.filter(
      (product) => product.featured
    ).length,

    totalValue: products.reduce(
      (sum, product) =>
        sum +
        (product.available
          ? product.price
          : 0),
      0
    ),

    categories: [
      ...new Set(
        products
          .map(
            (product) => product.category
          )
          .filter(Boolean)
      ),
    ],
  };
}

// ============================================================
// IMAGE STORAGE
// ============================================================

export function saveImageData(
  imageUrl: string,
  base64: string
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const images = JSON.parse(
      localStorage.getItem(
        IMAGES_KEY
      ) || '{}'
    );

    images[imageUrl] = base64;

    localStorage.setItem(
      IMAGES_KEY,
      JSON.stringify(images)
    );
  } catch (error) {
    console.error(
      'Error saving image:',
      error
    );
  }
}

// ============================================================
// GET IMAGE DATA
// ============================================================

export function getImageData(
  imageUrl: string
): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const images = JSON.parse(
      localStorage.getItem(
        IMAGES_KEY
      ) || '{}'
    );

    return images[imageUrl] || null;
  } catch (error) {
    return null;
  }
}

// ============================================================
// RESET PRODUCTS
// ============================================================

export function resetToDefaults(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(
      DEFAULT_PRODUCTS
    )
  );
}