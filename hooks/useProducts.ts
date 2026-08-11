'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  exportProducts,
  importProducts,
  getFeaturedProducts,
  getAvailableProducts,
  getProduct as getProductBySlug,
  duplicateProduct,
} from '@/lib/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = getProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setLoading(false);
    }
  }, []);

  const add = useCallback((data: Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
    try {
      const product = createProduct(data);
      setProducts((prev) => [...prev, product]);
      return product;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
      throw err;
    }
  }, []);

  const edit = useCallback((id: string, data: Partial<Product>) => {
    try {
      const updated = updateProduct(id, data);
      if (!updated) throw new Error('Product not found');

      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
      throw err;
    }
  }, []);

  const remove = useCallback((id: string) => {
    try {
      const deleted = deleteProduct(id);
      if (!deleted) throw new Error('Product not found');

      setProducts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
      throw err;
    }
  }, []);

  const duplicate = useCallback((id: string) => {
    try {
      const product = duplicateProduct(id);
      if (!product) throw new Error('Product not found');

      setProducts((prev) => [...prev, product]);
      return product;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate product');
      throw err;
    }
  }, []);

  const exportData = useCallback(() => {
    try {
      return exportProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export products');
      throw err;
    }
  }, []);

  const importData = useCallback((jsonString: string) => {
    try {
      const imported = importProducts(jsonString);
      setProducts(imported);
      return imported;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import products');
      throw err;
    }
  }, []);

  const getFeatured = useCallback((limit?: number) => {
    return getFeaturedProducts(limit);
  }, []);

  const getAvailable = useCallback(() => {
    return getAvailableProducts();
  }, []);

  const getBySlug = useCallback((slug: string) => {
    return getProductBySlug(slug);
  }, []);

  return {
    products,
    loading,
    error,
    add,
    edit,
    remove,
    duplicate,
    export: exportData,
    import: importData,
    getFeatured,
    getAvailable,
    getBySlug,
  };
}
