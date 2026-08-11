'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Music } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = {
    whatsapp: '+213 XXX XXX XXX',
    phone: '+213 XXX XXX XXX',
    email: 'info@pottery-brand.com',
    facebook: 'https://facebook.com/pottery-brand',
    instagram: 'https://instagram.com/pottery-brand',
    tiktok: 'https://tiktok.com/@pottery-brand',
    location: 'Algiers, Algeria',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/\s/g, '')}`}
            className="group card p-8 hover:shadow-clay-lg hover:-translate-y-2 transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Phone className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                WhatsApp
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {contactInfo.whatsapp}
              </p>
              <span className="mt-4 text-clay hover:text-clay-dark transition-colors font-medium">
                Chat Now →
              </span>
            </div>
          </a>

          {/* Phone */}
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
            className="group card p-8 hover:shadow-clay-lg hover:-translate-y-2 transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Phone className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Phone Call
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {contactInfo.phone}
              </p>
              <span className="mt-4 text-clay hover:text-clay-dark transition-colors font-medium">
                Call Now →
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${contactInfo.email}`}
            className="group card p-8 hover:shadow-clay-lg hover:-translate-y-2 transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <Mail className="text-red-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {contactInfo.email}
              </p>
              <span className="mt-4 text-clay hover:text-clay-dark transition-colors font-medium">
                Send Email →
              </span>
            </div>
          </a>
        </div>

        {/* Social Media */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Follow Our Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with us on social media for daily inspiration and updates
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Facebook */}
            <a
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-8 flex flex-col items-center text-center hover:shadow-clay-lg transition-all group"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors">
                <Facebook className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Facebook
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                pottery-brand
              </p>
            </a>

            {/* Instagram */}
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-8 flex flex-col items-center text-center hover:shadow-clay-lg transition-all group"
            >
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-700 transition-colors">
                <Instagram className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Instagram
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                pottery-brand
              </p>
            </a>

            {/* TikTok */}
            <a
              href={contactInfo.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-8 flex flex-col items-center text-center hover:shadow-clay-lg transition-all group"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-800 transition-colors">
                <Music className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                TikTok
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                pottery-brand
              </p>
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="card p-8 mb-16">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-clay-light rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Visit Our Studio
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {contactInfo.location}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                By appointment only. Please contact us in advance to arrange a visit.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have questions? We're here to help!
          </p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
