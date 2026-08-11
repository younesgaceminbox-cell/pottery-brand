'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true, margin: '-100px' },
};

const values = [
  {
    icon: '✋',
    title: 'Fait à la main',
    subtitle: 'Chaque pièce est unique',
    description: 'Façonnée à la main par des artisans formés à des techniques ancestrales transmises de génération en génération.',
  },
  {
    icon: '🌿',
    title: 'Matériaux naturels',
    subtitle: 'Argile locale & cuissons artisanales',
    description: 'Utilisant l\'argile pure de Blida et des méthodes traditionnelles de cuisson pour préserver l\'authenticité.',
  },
  {
    icon: '🏛️',
    title: 'Héritage culturel',
    subtitle: 'Un savoir-faire transmis',
    description: 'Chaque création est porteuse de l\'identité culturelle algérienne et de la fierté artisanale de nos ancêtres.',
  },
  {
    icon: '♾️',
    title: 'Pièces durables',
    subtitle: 'Conçues pour traverser le temps',
    description: 'Créations robustes destinées à devenir des heirlooms familiaux et à traverser les générations.',
  },
];

export default function BrandValues() {
  return (
    <section className="py-20 md:py-32 bg-cream dark:bg-dark-card border-t border-clay/10">
      <div className="container-editorial">
        <motion.div
          className="grid md:grid-cols-4 gap-8 md:gap-6"
          variants={{ staggerChildren: 0.12 }}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={fadeInUp}
            >
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-lg bg-clay/10 group-hover:bg-clay/20 transition-colors duration-300">
                <span className="text-2xl">{value.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-playfair font-bold text-deep-brown dark:text-cream mb-2 group-hover:text-clay transition-colors">
                {value.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm font-semibold text-clay mb-3 uppercase tracking-wide">
                {value.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-warm-gray dark:text-dark-muted leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
