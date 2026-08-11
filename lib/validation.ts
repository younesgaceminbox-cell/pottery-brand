import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.number().min(0, 'Price must be non-negative'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
  featured: z.boolean().default(false),
  available: z.boolean().default(true),
  category: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const ProductFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  price: z.string().min(1, 'Price is required').transform((val) => parseFloat(val)),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description is too long'),
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required').max(10, 'Maximum 10 images'),
  featured: z.boolean().default(false),
  available: z.boolean().default(true),
  category: z.string().optional(),
});

export const AdminLoginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

export const BulkImportSchema = z.array(ProductSchema);

export type ProductFormData = z.infer<typeof ProductFormSchema>;
export type AdminLoginData = z.infer<typeof AdminLoginSchema>;
