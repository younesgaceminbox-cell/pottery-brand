'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroPremium from '@/components/HeroPremium';
import BrandValues from '@/components/BrandValues';
import FeaturedProducts from '@/components/FeaturedProducts';
import { getProducts } from '@/lib/products';
import { Product } from '@/types';

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 30,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
  },
  viewport: {
    once: true,
    margin: '0px',
  },
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <main className="w-full bg-ivory dark:bg-dark-bg">
      {/* Premium Hero */}
      <HeroPremium />

      {/* Brand Values */}
      <BrandValues />

      {/* Featured Products */}
      <FeaturedProducts products={products} />

      {/* About Section */}
      <section id="about" className="py-24 md:py-40 bg-cream dark:bg-dark-card border-t border-clay/10">
        <div className="container-editorial">
          <motion.div
            className="max-w-4xl"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <p className="section-label mb-6">Notre Récit</p>
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-deep-brown dark:text-cream mb-12">
              LARBI<br />
              <span className="text-copper">Poterie de Blida</span>
            </h2>

            <div className="space-y-8 text-lg text-warm-gray dark:text-dark-muted leading-relaxed">
              <p>
                Depuis des générations, l'atelier LARBI préserve la tradition ancestrale de la poterie algérienne. Chaque création commence par de l'argile brute extraite des terres de Blida, façonnée par des mains formées à des techniques vieilles de plusieurs siècles.
              </p>
              <p>
                Nous croyons que la poterie est bien plus que de la vaisselle fonctionnelle — c'est une conversation entre l'artisan et la matière, une réflexion de la culture, et un pont reliant le passé au présent.
              </p>
              <p>
                Chaque vase, chaque cruche, chaque bol qui quitte notre atelier porte l'esprit du patrimoine algérien et la marque d'un vrai savoir-faire artisanal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 bg-deep-brown text-center">
        <div className="container-editorial">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ivory mb-8">
              Prêt à posséder une pièce d'art?
            </h2>
            <p className="text-xl text-sand/80 mb-12 leading-relaxed">
              Parcourez notre collection complète et trouvez la pièce de poterie parfaite pour votre maison
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="px-8 py-4 bg-copper hover:bg-copper/90 text-white font-medium rounded-sm transition-all duration-300"
              >
                Découvrir la Collection
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border-2 border-copper text-copper hover:bg-copper hover:text-deep-brown font-medium rounded-sm transition-all duration-300"
              >
                Nous Contacter
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
