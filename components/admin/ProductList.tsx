'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Search, Edit2, Trash2, Copy } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
  onDuplicate,
}: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter products
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-deep-brown dark:text-cream mb-6">
          Products
        </h1>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-gray" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium pl-12 w-full"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-premium"
          >
            <option value="newest">Newest</option>
            <option value="name">Name A-Z</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-clay/20">
              <th className="px-4 py-4 font-semibold text-deep-brown dark:text-cream">Name</th>
              <th className="px-4 py-4 font-semibold text-deep-brown dark:text-cream">Price</th>
              <th className="px-4 py-4 font-semibold text-deep-brown dark:text-cream">Category</th>
              <th className="px-4 py-4 font-semibold text-deep-brown dark:text-cream">Available</th>
              <th className="px-4 py-4 font-semibold text-deep-brown dark:text-cream">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((product) => (
              <tr
                key={product.id}
                className="border-b border-clay/10 hover:bg-clay/5 dark:hover:bg-dark-card/50 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="font-medium text-deep-brown dark:text-cream">
                    {product.name}
                  </div>
                  <div className="text-sm text-warm-gray dark:text-dark-muted">
                    {product.slug}
                  </div>
                </td>
                <td className="px-4 py-4 font-semibold text-clay">
                  {formatPrice(product.price)}
                </td>
                <td className="px-4 py-4 text-warm-gray dark:text-dark-muted">
                  {product.category || '-'}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      product.available
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {product.available ? 'Available' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 hover:bg-clay/10 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-clay" />
                    </button>
                    <button
                      onClick={() => onDuplicate(product.id)}
                      className="p-2 hover:bg-clay/10 rounded transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4 text-clay" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${product.name}"?`)) {
                          onDelete(product.id);
                        }
                      }}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-12">
          <p className="text-warm-gray dark:text-dark-muted">No products found</p>
        </div>
      )}
    </div>
  );
}
