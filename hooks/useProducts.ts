'use client';

import {
  useState,
  useEffect,
  useCallback,
} from 'react';

import { Product } from '@/types';

import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  exportProducts,
  importProducts,
  getFeaturedProducts,
  getAvailableProducts,
  duplicateProduct,
} from '@/lib/products';

export function useProducts() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // ============================================================
  // LOAD PRODUCTS
  // ============================================================

  useEffect(() => {
    try {
      const data = getProducts();

      setProducts(data);

      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load products'
      );

      setLoading(false);
    }
  }, []);

  // ============================================================
  // ADD PRODUCT
  // ============================================================

  const add = useCallback(
    (
      data: Omit<
        Product,
        'id' | 'slug' | 'createdAt' | 'updatedAt'
      >
    ) => {
      try {
        const product = createProduct(data);

        setProducts((prev) => [
          ...prev,
          product,
        ]);

        return product;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to create product'
        );

        throw err;
      }
    },
    []
  );

  // ============================================================
  // EDIT PRODUCT
  // ============================================================

  const edit = useCallback(
    (
      id: string,
      data: Partial<Product>
    ) => {
      try {
        const updated = updateProduct(
          id,
          data
        );

        if (!updated) {
          throw new Error(
            'Product not found'
          );
        }

        setProducts((prev) =>
          prev.map((product) =>
            product.id === id
              ? updated
              : product
          )
        );

        return updated;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to update product'
        );

        throw err;
      }
    },
    []
  );

  // ============================================================
  // DELETE PRODUCT
  // ============================================================

  const remove = useCallback(
    (id: string) => {
      try {
        const deleted =
          deleteProduct(id);

        if (!deleted) {
          throw new Error(
            'Product not found'
          );
        }

        setProducts((prev) =>
          prev.filter(
            (product) =>
              product.id !== id
          )
        );

        return true;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to delete product'
        );

        throw err;
      }
    },
    []
  );

  // ============================================================
  // DUPLICATE PRODUCT
  // ============================================================

  const duplicate = useCallback(
    (id: string) => {
      try {
        const product =
          duplicateProduct(id);

        if (!product) {
          throw new Error(
            'Product not found'
          );
        }

        setProducts((prev) => [
          ...prev,
          product,
        ]);

        return product;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to duplicate product'
        );

        throw err;
      }
    },
    []
  );

  // ============================================================
  // EXPORT PRODUCTS
  // ============================================================

  const exportData = useCallback(() => {
    try {
      return exportProducts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to export products'
      );

      throw err;
    }
  }, []);

  // ============================================================
  // IMPORT PRODUCTS
  // ============================================================

  const importData = useCallback(
    (jsonString: string) => {
      try {
        const result =
          importProducts(
            jsonString
          );

        if (
          result.success &&
          result.products
        ) {
          setProducts(
            result.products
          );
        }

        return result;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to import products'
        );

        throw err;
      }
    },
    []
  );

  // ============================================================
  // GET FEATURED
  // ============================================================

  const getFeatured = useCallback(
    (limit?: number) => {
      return getFeaturedProducts(
        limit
      );
    },
    []
  );

  // ============================================================
  // GET AVAILABLE
  // ============================================================

  const getAvailable =
    useCallback(() => {
      return getAvailableProducts();
    }, []);

  // ============================================================
  // GET BY SLUG
  // ============================================================

  const getBySlug = useCallback(
    (slug: string) => {
      return getProductBySlug(
        slug
      );
    },
    []
  );

  // ============================================================
  // RETURN
  // ============================================================

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