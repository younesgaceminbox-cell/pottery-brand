'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Heart,
  Share2,
  ShoppingCart,
  Zap,
  Award,
  Clock,
} from 'lucide-react';
import { getProducts, getProductBySlug } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-dark-bg">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-4xl font-playfair font-bold mb-6 text-deep-brown dark:text-cream">
            Produit non trouvé
          </h1>

          <p className="text-warm-gray dark:text-dark-muted mb-8">
            Désolé, ce produit n'existe pas.
          </p>

          <Link
            href="/products"
            className="px-8 py-4 bg-copper hover:bg-copper/90 text-white font-semibold rounded-sm transition-colors inline-block"
          >
            Retour à la Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  const relatedProducts = getProducts()
    .filter(
      (p) => p.id !== product.id && p.category === product.category
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-ivory dark:bg-dark-bg">
      {/* Breadcrumb */}
      <motion.div
        className="bg-cream dark:bg-dark-card border-b border-clay/10 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-copper hover:text-terracotta flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Accueil
            </Link>

            <span className="text-clay/40">/</span>

            <Link
              href="/products"
              className="text-copper hover:text-terracotta"
            >
              Collection
            </Link>

            <span className="text-clay/40">/</span>

            <span className="text-warm-gray dark:text-dark-muted font-semibold">
              {product.name}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Images Column */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {/* Main Image */}
            <div className="relative h-96 md:h-[500px] bg-cream dark:bg-dark-card rounded-lg overflow-hidden mb-6 border border-clay/10">
              <Image
                src={product.images[activeImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Badge */}
              {product.featured && (
                <div className="absolute top-6 left-6 bg-copper text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  ⭐ Vedette
                </div>
              )}

              {/* Status */}
              {!product.available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-2xl font-bold">
                    Épuisé
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <motion.div
                className="grid grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-24 rounded-lg overflow-hidden border-3 transition-all ${
                      activeImageIndex === index
                        ? 'border-copper shadow-lg'
                        : 'border-clay/20 hover:border-copper/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Info Column */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            {/* Category */}
            {product.category && (
              <p className="text-sm font-bold uppercase tracking-widest text-copper mb-4">
                {product.category}
              </p>
            )}

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-deep-brown dark:text-cream mb-8 leading-tight">
              {product.name}
            </h1>

            {/* Divider */}
            <div className="w-20 h-1 bg-gradient-to-r from-copper to-transparent mb-8" />

            {/* Price Section */}
            <motion.div className="mb-8" variants={fadeInUp}>
              <p className="text-sm text-warm-gray dark:text-dark-muted mb-2 font-semibold">
                Prix
              </p>

              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-copper">
                  {formatPrice(product.price)}
                </span>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${
                    product.available
                      ? 'bg-green-100/20 text-green-700 dark:text-green-400'
                      : 'bg-red-100/20 text-red-700 dark:text-red-400'
                  }`}
                >
                  {product.available
                    ? '✓ Disponible'
                    : '✗ Épuisé'}
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="mb-10 pb-10 border-b border-clay/20"
              variants={fadeInUp}
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-deep-brown dark:text-cream mb-4">
                Description
              </h3>

              <p className="text-lg leading-relaxed text-warm-gray dark:text-dark-muted">
                {product.description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-2 gap-6 mb-12"
              variants={fadeInUp}
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-copper" />
                </div>

                <div>
                  <p className="font-bold text-deep-brown dark:text-cream mb-1">
                    Artisanat
                  </p>

                  <p className="text-sm text-warm-gray dark:text-dark-muted">
                    Façonné à la main
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-copper" />
                </div>

                <div>
                  <p className="font-bold text-deep-brown dark:text-cream mb-1">
                    Unique
                  </p>

                  <p className="text-sm text-warm-gray dark:text-dark-muted">
                    Pièce unique
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-copper" />
                </div>

                <div>
                  <p className="font-bold text-deep-brown dark:text-cream mb-1">
                    Héritage
                  </p>

                  <p className="text-sm text-warm-gray dark:text-dark-muted">
                    Tradition algérienne
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-copper" />
                </div>

                <div>
                  <p className="font-bold text-deep-brown dark:text-cream mb-1">
                    Qualité
                  </p>

                  <p className="text-sm text-warm-gray dark:text-dark-muted">
                    Premium
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="flex gap-4 mb-8"
              variants={fadeInUp}
            >
              <button
                disabled={!product.available}
                className="flex-1 px-8 py-4 bg-copper hover:bg-copper/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <ShoppingCart className="w-5 h-5" />
                Ajouter au Panier
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-14 h-14 rounded-sm border-2 border-copper/30 hover:border-copper hover:bg-copper/10 flex items-center justify-center transition-all"
              >
                <Heart
                  size={24}
                  className={
                    isFavorite
                      ? 'fill-red-500 text-red-500'
                      : 'text-copper'
                  }
                />
              </button>

              <button className="w-14 h-14 rounded-sm border-2 border-copper/30 hover:border-copper hover:bg-copper/10 flex items-center justify-center transition-all">
                <Share2 size={24} className="text-copper" />
              </button>
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={fadeInUp}
            >
              <div className="bg-cream dark:bg-dark-card p-4 rounded-lg border border-clay/10">
                <p className="text-xs font-bold uppercase tracking-widest text-warm-gray dark:text-dark-muted mb-2">
                  ID Produit
                </p>

                <p className="font-mono text-sm text-deep-brown dark:text-cream">
                  {product.id}
                </p>
              </div>

              <div className="bg-cream dark:bg-dark-card p-4 rounded-lg border border-clay/10">
                <p className="text-xs font-bold uppercase tracking-widest text-warm-gray dark:text-dark-muted mb-2">
                  Catégorie
                </p>

                <p className="font-semibold text-deep-brown dark:text-cream">
                  {product.category || 'Poterie'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12 border-t border-clay/20 pt-12">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="section-label mb-4">Connexe</p>

                  <h2 className="text-4xl md:text-5xl font-playfair font-bold text-deep-brown dark:text-cream">
                    Produits Associés
                  </h2>
                </div>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial="initial"
                animate="animate"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {relatedProducts.map((related) => (
                  <motion.div
                    key={related.id}
                    variants={fadeInUp}
                  >
                    <Link
                      href={`/products/${related.slug}`}
                      className="group"
                    >
                      <div className="bg-white dark:bg-dark-card rounded-lg overflow-hidden border border-clay/10 hover:border-copper/50 transition-all h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-64 bg-cream dark:bg-dark-card overflow-hidden">
                          <Image
                            src={related.images[0]}
                            alt={related.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        {/* Info */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-lg font-playfair font-bold mb-2 text-deep-brown dark:text-cream group-hover:text-copper transition-colors">
                            {related.name}
                          </h3>

                          <p className="text-sm text-warm-gray dark:text-dark-muted mb-6 flex-grow line-clamp-2">
                            {related.description}
                          </p>

                          <div className="pt-4 border-t border-clay/10 flex justify-between items-center">
                            <span className="text-2xl font-bold text-copper">
                              {formatPrice(related.price)}
                            </span>

                            <span className="text-copper font-semibold text-sm">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.section
          className="mt-24 py-16 px-8 md:px-12 bg-gradient-to-r from-deep-brown to-clay/80 rounded-lg text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-playfair font-bold text-ivory mb-6">
            Prêt à ajouter cette pièce à votre collection?
          </h3>

          <p className="text-ivory/80 mb-8 max-w-2xl mx-auto">
            Chaque pièce est unique et façonnée avec passion. Une fois
            vendue, elle ne peut pas être reproduite à l'identique.
          </p>

          <button
            disabled={!product.available}
            className="px-8 py-4 bg-copper hover:bg-copper/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-sm transition-all uppercase tracking-wide inline-block"
          >
            Ajouter au Panier Maintenant
          </button>
        </motion.section>
      </div>
    </div>
  );
}