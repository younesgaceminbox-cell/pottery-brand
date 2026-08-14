'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/products';
import { searchProducts, sortProducts, formatPrice } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

export default function ProductsPage() {
  const products = getProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'newest' | 'oldest'>('newest');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = searchProducts(products, searchQuery);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    result = sortProducts(result, sortBy);
    return result;
  }, [searchQuery, sortBy, priceRange]);

  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));

  return (
    <div className="min-h-screen bg-ivory dark:bg-dark-bg py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="section-label mb-4">Notre Catalogue</p>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-deep-brown dark:text-cream">
            Pièces en Vedette
          </h1>
          <p className="text-xl text-warm-gray dark:text-dark-muted max-w-2xl mx-auto">
            Découvrez notre collection complète de poteries artisanales algériennes, façonnées à la main avec tradition et authenticité
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-copper via-copper/50 to-transparent mx-auto mt-8" />
        </motion.div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-copper w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-premium pl-12 w-full"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-premium flex-1 text-deep-brown dark:text-cream"
            >
              <option value="newest">Plus récent</option>
              <option value="oldest">Plus ancien</option>
              <option value="name">Nom (A-Z)</option>
              <option value="price-asc">Prix (↑)</option>
              <option value="price-desc">Prix (↓)</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 border-2 border-clay/20 hover:border-clay dark:border-clay/30 rounded transition-colors lg:hidden"
            >
              <SlidersHorizontal size={20} className="text-clay" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block">
            <motion.div 
              className="sticky top-24 space-y-6"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {/* Price Filter */}
              <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-clay/10">
                <h3 className="font-playfair font-bold text-deep-brown dark:text-cream mb-6">Gamme de Prix</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-copper"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-copper"
                  />
                  <div className="flex justify-between text-sm font-semibold text-clay">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-clay/10">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSortBy('newest');
                    setPriceRange([minPrice, maxPrice]);
                  }}
                  className="w-full px-4 py-2 bg-clay/10 hover:bg-clay/20 text-clay font-semibold rounded transition-colors"
                >
                  Réinitialiser
                </button>
              </div>
            </motion.div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div 
              className="lg:hidden mb-6 bg-white dark:bg-dark-card rounded-lg p-6 border border-clay/10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="space-y-4">
                <h3 className="font-playfair font-bold text-deep-brown dark:text-cream">Gamme de Prix</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-copper"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-copper"
                  />
                  <div className="flex justify-between text-sm font-semibold text-clay">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filtered.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={{ staggerChildren: 0.1 }}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {filtered.map((product) => (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="group"
                    >
                      <div className="bg-white dark:bg-dark-card rounded-lg overflow-hidden border border-clay/10 hover:border-copper/50 transition-all duration-300 h-full flex flex-col">
                        {/* Product Image */}
                        <div className="relative h-72 bg-cream dark:bg-dark-card overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {product.featured && (
                            <div className="absolute top-4 left-4 bg-copper text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                              Vedette
                            </div>
                          )}
                          {!product.available && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">Épuisé</span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Category */}
                          <p className="text-xs font-semibold uppercase tracking-widest text-clay/70 mb-2">
                            {product.category || 'Poterie'}
                          </p>

                          {/* Name */}
                          <h3 className="text-xl font-playfair font-bold text-deep-brown dark:text-cream mb-3 group-hover:text-copper transition-colors line-clamp-2">
                            {product.name}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-warm-gray dark:text-dark-muted mb-6 line-clamp-2 flex-grow">
                            {product.description}
                          </p>

                          {/* Price & Status */}
                          <div className="flex items-center justify-between pt-6 border-t border-clay/10">
                            <span className="text-2xl font-bold text-copper">
                              {formatPrice(product.price)}
                            </span>
                            <span className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                              product.available
                                ? 'bg-green-100/20 text-green-700 dark:text-green-400'
                                : 'bg-red-100/20 text-red-700 dark:text-red-400'
                            }`}>
                              {product.available ? 'Disponible' : 'Épuisé'}
                            </span>
                          </div>

                          {/* CTA Link */}
                          <div className="mt-4 flex items-center gap-2 text-copper font-semibold group-hover:gap-3 transition-all">
                            Voir les détails
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-xl text-warm-gray dark:text-dark-muted">
                  Aucun produit trouvé correspondant à vos critères.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
