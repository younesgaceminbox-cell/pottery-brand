'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden bg-gradient-to-b from-ivory via-cream to-sand">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-clay/5 via-transparent to-terracotta/10" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-sand/30 to-transparent blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section Label */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="section-label">الفخار التقليدي</span>
          </motion.div>

          {/* Logo - Transparent */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/logo.png"
                alt="LARBI Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-playfair font-bold text-deep-brown mb-6"
          >
            LARBI
          </motion.h1>

          {/* Arabic Slogan - Elegant Calligraphy */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <p className="arabic-display text-clay">
              ثقافة ولا أصل<br/>
              الفخار ديما حاضر
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="mb-12 flex justify-center">
            <div className="divider" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-earth mb-12 max-w-2xl mx-auto font-light tracking-wide"
          >
            Poterie de Blida — Handcrafted Algerian pottery rooted in tradition
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/products" className="btn-primary">
              Explore Collection
            </Link>
            <Link href="#about" className="btn-secondary">
              Learn Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-clay">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-clay to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
