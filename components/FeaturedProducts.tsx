'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true, margin: '-100px' },
};

interface FeaturedProductsProps {
  products: any[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = products.filter(p => p.featured).slice(0, 4);

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-40 bg-ivory dark:bg-dark-bg">
      <div className="container-editorial">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-20 pb-8 border-b-2 border-clay/20"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <div>
            <p className="section-label mb-4">Nos Créations</p>
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-deep-brown dark:text-cream">
              Pièces en vedette
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-clay hover:text-terracotta font-medium transition-colors"
          >
            Voir tous les produits
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Products Grid - Editorial Layout */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6"
          variants={{ staggerChildren: 0.15 }}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {featured.map((product, index) => (
            <motion.div key={product.id} className="group" variants={fadeInUp}>
              <Link href={`/products/${product.slug}`}>
                {/* Product Image */}
                <div className="relative mb-6 overflow-hidden rounded-sm bg-cream dark:bg-dark-card aspect-square">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Featured Badge */}
                  {index === 0 && (
                    <div className="absolute top-4 left-4 bg-clay text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-sm">
                      Nouveau
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <div className="space-y-3">
                {/* Category */}
                <p className="text-xs font-semibold uppercase tracking-widest text-clay/70">
                  {product.category || 'Poterie'}
                </p>

                {/* Name */}
                <h3 className="text-lg md:text-xl font-playfair font-bold text-deep-brown dark:text-cream group-hover:text-clay transition-colors duration-300">
                  <Link href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-sm text-warm-gray dark:text-dark-muted line-clamp-2">
                  {product.description}
                </p>

                {/* Price & Status */}
                <div className="flex items-center justify-between pt-4 border-t border-clay/10">
                  <span className="text-xl font-semibold text-clay">
                    {formatPrice(product.price)}
                  </span>
                  {product.available && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                      Disponible
                    </span>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 text-clay hover:text-terracotta font-medium text-sm transition-colors pt-2"
                >
                  Voir les détails
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div
          className="md:hidden flex justify-center pt-12"
          variants={fadeInUp}
        >
          <Link href="/products" className="btn-primary">
            Voir tous les produits
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
