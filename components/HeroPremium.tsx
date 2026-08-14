'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroPremium() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-deep-brown">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/image01.png')",
            opacity: 0.35,
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-brown via-deep-brown/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-brown/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-screen flex items-center">
        <div className="container-editorial h-full flex items-center">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Column - Content */}
            <motion.div className="space-y-8" variants={itemVariants}>
              {/* Eyebrow */}
              <motion.div
                className="space-y-4"
                variants={itemVariants}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-copper/80">
                  Artisanat Algérien
                </p>
                <div className="w-12 h-px bg-gradient-to-r from-copper via-copper/50 to-transparent" />
              </motion.div>

              {/* Brand Name */}
              <motion.div variants={itemVariants}>
                <h1 className="text-6xl lg:text-7xl font-playfair font-bold text-ivory leading-tight mb-4">
                  LARBI
                </h1>
                <p className="text-xl lg:text-2xl font-light text-sand/90">
                  Poterie de Blida
                </p>
              </motion.div>

              {/* Arabic Slogan - Elegant Display */}
              <motion.div
                className="py-8 border-t border-b border-copper/30"
                variants={itemVariants}
              >
                <p className="text-3xl lg:text-4xl font-amiri font-light text-copper leading-relaxed">
                  ثقافة ولا أصل<br />
                  الفخار ديما حاضر
                </p>
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-lg text-sand/80 font-light leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                Chaque pièce raconte une histoire. Façonnée à la main, inspirée par des siècles de tradition et d'authenticité.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
              >
                <Link
                  href="/products"
                  className="px-8 py-4 bg-copper hover:bg-copper/90 text-white font-medium rounded-sm transition-all duration-300 text-center"
                >
                  Découvrir nos produits
                </Link>
                <Link
                  href="#about"
                  className="px-8 py-4 border-2 border-copper text-copper hover:bg-copper hover:text-deep-brown font-medium rounded-sm transition-all duration-300 text-center"
                >
                  Notre histoire
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              className="hidden lg:block relative h-full min-h-screen"
              variants={itemVariants}
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/images/image01.png"
                  alt="LARBI Pottery"
                  fill
                  priority
                  className="object-cover object-center"
                />
                {/* Subtle overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-deep-brown/40" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-copper/60">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-copper via-copper/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
