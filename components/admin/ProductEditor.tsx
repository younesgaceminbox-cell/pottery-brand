'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/types';
import * as ProductLib from '@/lib/products';
import { slugify, generateId } from '@/lib/utils';
import { Upload, X, ChevronUp, ChevronDown } from 'lucide-react';

interface ProductEditorProps {
  product: Product | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProductEditor({ product, onSave, onCancel }: ProductEditorProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    description: product?.description || '',
    category: product?.category || '',
    images: product?.images || [],
    featured: product?.featured || false,
    available: product?.available || true,
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      // Create a data URL for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, dataUrl],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add image URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) {
      setErrors((prev) => ({ ...prev, imageUrl: 'Image URL cannot be empty' }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl],
    }));
    setNewImageUrl('');
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.imageUrl;
      return updated;
    });
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Reorder images
  const handleMoveImage = (from: number, to: number) => {
    const newImages = [...formData.images];
    const [movedImage] = newImages.splice(from, 1);
    newImages.splice(to, 0, movedImage);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  // Validate and save
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (product?.id) {
        // Update existing product
        ProductLib.updateProduct(product.id, {
          ...formData,
          currency: 'DZD',
          slug: product.slug,
        });
      } else {
        // Create new product
        ProductLib.createProduct({
          ...formData,
          currency: 'DZD',
          slug: slugify(formData.name),
        });
      }
      onSave();
    } catch (error) {
      setErrors({ submit: 'Failed to save product' });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-deep-brown dark:text-cream mb-2">
          {product ? 'Edit Product' : 'Create New Product'}
        </h1>
        <p className="text-warm-gray dark:text-dark-muted">
          {product
            ? 'Update product details and images'
            : 'Add a new pottery piece to your collection'}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="md:col-span-2 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-deep-brown dark:text-cream mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Classic Terracotta Vase"
              className="input-premium w-full"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-deep-brown dark:text-cream mb-2">
                Price (DZD)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: parseInt(e.target.value) || 0 }))
                }
                placeholder="2500"
                className="input-premium w-full"
                min="0"
              />
              {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-deep-brown dark:text-cream mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., Vases, Bowls"
                className="input-premium w-full"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-deep-brown dark:text-cream mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Describe your pottery piece..."
              rows={5}
              className="input-premium w-full resize-none"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Toggles */}
          <div className="flex gap-8 pt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                }
                className="w-4 h-4"
              />
              <span className="font-medium text-deep-brown dark:text-cream">Featured</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, available: e.target.checked }))
                }
                className="w-4 h-4"
              />
              <span className="font-medium text-deep-brown dark:text-cream">Available</span>
            </label>
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-deep-brown dark:text-cream mb-4">Images</h3>

            {/* File Upload */}
            <label className="block border-2 border-dashed border-clay/30 rounded-lg p-6 text-center cursor-pointer hover:border-clay/60 transition-colors mb-4">
              <Upload className="w-8 h-8 text-clay mx-auto mb-2" />
              <p className="font-medium text-clay">Upload Images</p>
              <p className="text-xs text-warm-gray dark:text-dark-muted">
                Click or drag to select
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>

            {/* Add URL */}
            <div className="space-y-2 mb-4">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="input-premium w-full text-sm"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="w-full px-4 py-2 bg-clay/10 hover:bg-clay/20 text-clay font-medium rounded transition-colors text-sm"
              >
                Add URL
              </button>
              {errors.imageUrl && (
                <p className="text-red-600 text-sm">{errors.imageUrl}</p>
              )}
            </div>

            {/* Image List */}
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-start p-2 bg-clay/5 rounded group"
                >
                  <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-warm-gray dark:text-dark-muted truncate">
                      {image.substring(0, 30)}...
                    </p>
                    {index === 0 && (
                      <p className="text-xs font-semibold text-clay">Featured image</p>
                    )}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleMoveImage(index, index - 1)}
                        className="p-1 hover:bg-clay/20 rounded"
                      >
                        <ChevronUp className="w-4 h-4 text-clay" />
                      </button>
                    )}
                    {index < formData.images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleMoveImage(index, index + 1)}
                        className="p-1 hover:bg-clay/20 rounded"
                      >
                        <ChevronDown className="w-4 h-4 text-clay" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {errors.images && (
              <p className="text-red-600 text-sm">{errors.images}</p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-8 border-t border-clay/10">
        <button
          type="submit"
          className="px-8 py-3 bg-clay hover:bg-terracotta text-white font-medium rounded-sm transition-colors"
        >
          {product ? 'Update Product' : 'Create Product'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3 border-2 border-clay text-clay hover:bg-clay/5 font-medium rounded-sm transition-colors"
        >
          Cancel
        </button>
      </div>

      {errors.submit && (
        <p className="text-red-600 text-sm mt-4">{errors.submit}</p>
      )}
    </motion.form>
  );
}
