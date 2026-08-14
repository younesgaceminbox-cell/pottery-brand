'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Facebook, Instagram, Music, Mail, Phone, MapPin } from 'lucide-react';

interface ContactSettings {
  phone?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  location?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [contactSettings, setContactSettings] = useState<ContactSettings>({});

  useEffect(() => {
    // Load contact settings from localStorage
    try {
      const saved = localStorage.getItem('pottery_contact_settings');
      if (saved) {
        setContactSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading contact settings:', error);
    }
  }, []);

  const socialLinks = [
    {
      name: 'Facebook',
      url: contactSettings.facebook,
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Instagram',
      url: contactSettings.instagram,
      icon: Instagram,
      color: 'bg-pink-600 hover:bg-pink-700',
    },
    {
      name: 'TikTok',
      url: contactSettings.tiktok,
      icon: Music,
      color: 'bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200',
    },
  ];

  return (
    <footer className="bg-deep-brown dark:bg-dark-brown text-ivory relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-copper rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-terracotta rounded-full filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
            variants={{ staggerChildren: 0.1 }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Brand Column */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/logo.png"
                  alt="LARBI Pottery"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <div>
                  <h3 className="text-2xl font-playfair font-bold">LARBI</h3>
                  <p className="text-xs text-sand uppercase tracking-widest">Poterie</p>
                </div>
              </div>
              <p className="text-sand/80 leading-relaxed mb-6">
                Poteries artisanales algériennes façonnées à la main avec tradition et authenticité. Chaque pièce raconte l'histoire de nos ancêtres.
              </p>
              {contactSettings.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-copper flex-shrink-0 mt-1" />
                  <p className="text-sm text-sand/80">{contactSettings.location}</p>
                </div>
              )}
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeInUp}>
              <h4 className="font-playfair font-bold text-lg mb-8 text-copper">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sand hover:text-copper transition-colors flex items-center gap-2">
                    <span>→</span> Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-sand hover:text-copper transition-colors flex items-center gap-2">
                    <span>→</span> Collection
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sand hover:text-copper transition-colors flex items-center gap-2">
                    <span>→</span> Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sand hover:text-copper transition-colors flex items-center gap-2">
                    <span>→</span> À Propos
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Information */}
            <motion.div variants={fadeInUp}>
              <h4 className="font-playfair font-bold text-lg mb-8 text-copper">Information</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sand hover:text-copper transition-colors flex items-center gap-2">
                    <span>→</span> Politique de Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sand hover:text-copper transition-colors flex items-center gap-2">
                    <span>→</span> Conditions Générales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sand hover:text-copper transition-colors flex items-center gap-2">
                    <span>→</span> Livraison
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sand hover:text-copper transition-colors flex items-center gap-2">
                    <span>→</span> Retours
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Follow Us - LIVE FROM CONTACT SETTINGS */}
            <motion.div variants={fadeInUp}>
              <h4 className="font-playfair font-bold text-lg mb-8 text-copper">Suivez-Nous</h4>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3 mb-8">
                {socialLinks.map((social) => {
                  if (!social.url) return null;
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg ${social.color} text-white flex items-center justify-center transition-all hover:scale-110`}
                      aria-label={social.name}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactSettings.email && (
                  <a href={`mailto:${contactSettings.email}`} className="flex items-center gap-3 text-sand hover:text-copper transition-colors">
                    <Mail className="w-5 h-5 text-copper flex-shrink-0" />
                    <span className="text-sm break-all">{contactSettings.email}</span>
                  </a>
                )}
                {contactSettings.phone && (
                  <a href={`tel:${contactSettings.phone}`} className="flex items-center gap-3 text-sand hover:text-copper transition-colors">
                    <Phone className="w-5 h-5 text-copper flex-shrink-0" />
                    <span className="text-sm">{contactSettings.phone}</span>
                  </a>
                )}
                {contactSettings.whatsapp && (
                  <a href={`https://wa.me/${contactSettings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sand hover:text-copper transition-colors">
                    <Music className="w-5 h-5 text-copper flex-shrink-0" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="border-t border-copper/20 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-sand/70">
              <div>
                <p>&copy; {currentYear} LARBI - Poterie de Blida. Tous droits réservés.</p>
                <p className="mt-2 text-xs">Pièces artisanales uniques façonnées avec passion et tradition.</p>
              </div>
              <div className="flex flex-col md:flex-row justify-start md:justify-end gap-6">
                <a href="#" className="hover:text-copper transition-colors">
                  Conditions Légales
                </a>
                <a href="#" className="hover:text-copper transition-colors">
                  Confidentialité
                </a>
                <a href="#" className="hover:text-copper transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
