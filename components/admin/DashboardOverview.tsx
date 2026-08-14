'use client';

import { motion } from 'motion/react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import * as ProductLib from '@/lib/products';

interface DashboardOverviewProps {
  products: Product[];
}

export default function DashboardOverview({ products }: DashboardOverviewProps) {
  const stats = ProductLib.getProductStats();

  const statCards = [
    { label: 'Total Products', value: stats.total, icon: '🏺' },
    { label: 'Available', value: stats.available, icon: '✅' },
    { label: 'Featured', value: stats.featured, icon: '⭐' },
    { label: 'Total Value', value: formatPrice(stats.totalValue), icon: '💰', isPrice: true },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-playfair font-bold text-deep-brown dark:text-cream mb-2">
          Dashboard
        </h1>
        <p className="text-warm-gray dark:text-dark-muted">
          Welcome back! Here's your pottery business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-dark-card rounded-lg p-6 border border-clay/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-warm-gray dark:text-dark-muted uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold mt-2 ${stat.isPrice ? 'text-clay' : 'text-deep-brown dark:text-cream'}`}>
                  {stat.value}
                </p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-dark-card rounded-lg p-6 border border-clay/10"
      >
        <h2 className="text-xl font-bold text-deep-brown dark:text-cream mb-6">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {stats.categories.map((category, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-clay/10 text-clay rounded-full text-sm font-medium"
            >
              {category}
            </span>
          ))}
          {stats.categories.length === 0 && (
            <p className="text-warm-gray dark:text-dark-muted">No categories yet</p>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 grid md:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-clay/10">
          <h3 className="font-bold text-deep-brown dark:text-cream mb-2">Add New Product</h3>
          <p className="text-sm text-warm-gray dark:text-dark-muted mb-4">
            Create a new pottery piece listing
          </p>
          <a href="#" className="text-clay hover:text-terracotta font-semibold text-sm">
            Go to Create →
          </a>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-clay/10">
          <h3 className="font-bold text-deep-brown dark:text-cream mb-2">Export Products</h3>
          <p className="text-sm text-warm-gray dark:text-dark-muted mb-4">
            Download your products as JSON
          </p>
          <a href="#" className="text-clay hover:text-terracotta font-semibold text-sm">
            Go to Backup →
          </a>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-clay/10">
          <h3 className="font-bold text-deep-brown dark:text-cream mb-2">Contact Settings</h3>
          <p className="text-sm text-warm-gray dark:text-dark-muted mb-4">
            Update your contact information
          </p>
          <a href="#" className="text-clay hover:text-terracotta font-semibold text-sm">
            Go to Settings →
          </a>
        </div>
      </motion.div>
    </div>
  );
}
