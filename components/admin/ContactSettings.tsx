'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ContactData {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  location: string;
}

const STORAGE_KEY = 'pottery_contact_settings';

export default function ContactSettings() {
  const [formData, setFormData] = useState<ContactData>({
    phone: '',
    whatsapp: '',
    email: '',
    instagram: '',
    tiktok: '',
    facebook: '',
    location: '',
  });

  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load saved settings
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading contact settings:', error);
    }
  }, []);

  const handleChange = (field: keyof ContactData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to save settings' });
    }
  };

  const contactFields = [
    { key: 'phone', label: 'Phone Number', placeholder: '+213 XXX XX XX XX', type: 'tel' },
    { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '+213 XXX XX XX XX', type: 'tel' },
    { key: 'email', label: 'Email Address', placeholder: 'info@larbi.com', type: 'email' },
    { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/larbi', type: 'url' },
    { key: 'tiktok', label: 'TikTok URL', placeholder: 'https://tiktok.com/@larbi', type: 'url' },
    { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/larbi', type: 'url' },
    { key: 'location', label: 'Business Location', placeholder: 'Blida, Algeria', type: 'text' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-deep-brown dark:text-cream mb-2">
          Contact Settings
        </h1>
        <p className="text-warm-gray dark:text-dark-muted">
          Manage your contact information displayed throughout the website
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {contactFields.map(({ key, label, placeholder, type }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-deep-brown dark:text-cream mb-2">
              {label}
            </label>
            <input
              type={type}
              value={formData[key as keyof ContactData]}
              onChange={(e) => handleChange(key as keyof ContactData, e.target.value)}
              placeholder={placeholder}
              className="input-premium w-full"
            />
            {errors[key] && (
              <p className="text-red-600 text-sm mt-1">{errors[key]}</p>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="pt-8 border-t border-clay/10 flex gap-4">
          <button
            type="submit"
            className="px-8 py-3 bg-clay hover:bg-terracotta text-white font-medium rounded-sm transition-colors"
          >
            Save Settings
          </button>
          {saved && (
            <div className="px-4 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-sm font-medium flex items-center">
              ✓ Settings saved successfully!
            </div>
          )}
        </div>

        {errors.submit && (
          <p className="text-red-600 text-sm">{errors.submit}</p>
        )}
      </form>

      {/* Preview */}
      <div className="mt-12 pt-12 border-t border-clay/10">
        <h2 className="text-2xl font-bold text-deep-brown dark:text-cream mb-6">
          Preview
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {formData.email && (
            <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-clay/10">
              <p className="text-sm text-warm-gray dark:text-dark-muted">Email</p>
              <p className="font-medium text-clay">{formData.email}</p>
            </div>
          )}
          {formData.phone && (
            <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-clay/10">
              <p className="text-sm text-warm-gray dark:text-dark-muted">Phone</p>
              <p className="font-medium text-clay">{formData.phone}</p>
            </div>
          )}
          {formData.whatsapp && (
            <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-clay/10">
              <p className="text-sm text-warm-gray dark:text-dark-muted">WhatsApp</p>
              <p className="font-medium text-clay">{formData.whatsapp}</p>
            </div>
          )}
          {formData.location && (
            <div className="p-4 bg-white dark:bg-dark-card rounded-lg border border-clay/10">
              <p className="text-sm text-warm-gray dark:text-dark-muted">Location</p>
              <p className="font-medium text-clay">{formData.location}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
