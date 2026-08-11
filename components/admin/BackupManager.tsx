'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, RotateCcw } from 'lucide-react';
import * as ProductLib from '@/lib/products';

interface BackupManagerProps {
  onImported: () => void;
}

export default function BackupManager({ onImported }: BackupManagerProps) {
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    try {
      const data = ProductLib.exportProducts();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pottery-products-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'Products exported successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export products' });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = event.target?.result as string;
        const result = ProductLib.importProducts(json);

        if (result.success) {
          setMessage({ type: 'success', text: result.message });
          onImported();
        } else {
          setMessage({ type: 'error', text: result.message });
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to import products' });
      } finally {
        setImporting(false);
      }
    };

    reader.onerror = () => {
      setMessage({ type: 'error', text: 'Failed to read file' });
      setImporting(false);
    };

    reader.readAsText(file);
  };

  const handleReset = () => {
    if (
      confirm(
        'Are you sure? This will reset all products to the default collection. This action cannot be undone.'
      )
    ) {
      ProductLib.resetToDefaults();
      onImported();
      setMessage({ type: 'success', text: 'Products reset to defaults' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-deep-brown dark:text-cream mb-2">
          Backup & Import
        </h1>
        <p className="text-warm-gray dark:text-dark-muted">
          Export your products for backup or import from a previous backup
        </p>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg font-medium ${
            message.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="space-y-6">
        {/* Export */}
        <div className="bg-white dark:bg-dark-card rounded-lg p-8 border border-clay/10">
          <div className="flex items-start gap-4 mb-4">
            <Download className="w-6 h-6 text-clay flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-deep-brown dark:text-cream">
                Export Products
              </h2>
              <p className="text-sm text-warm-gray dark:text-dark-muted mt-1">
                Download all your products as a JSON file for backup
              </p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-clay hover:bg-terracotta text-white font-medium rounded-sm transition-colors"
          >
            Export Now
          </button>
        </div>

        {/* Import */}
        <div className="bg-white dark:bg-dark-card rounded-lg p-8 border border-clay/10">
          <div className="flex items-start gap-4 mb-4">
            <Upload className="w-6 h-6 text-clay flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-deep-brown dark:text-cream">
                Import Products
              </h2>
              <p className="text-sm text-warm-gray dark:text-dark-muted mt-1">
                Import products from a previously exported JSON file
              </p>
            </div>
          </div>
          <label className="inline-block">
            <div className="px-6 py-3 bg-clay hover:bg-terracotta text-white font-medium rounded-sm transition-colors cursor-pointer">
              {importing ? 'Importing...' : 'Choose File'}
            </div>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              disabled={importing}
              className="hidden"
            />
          </label>
        </div>

        {/* Reset */}
        <div className="bg-white dark:bg-dark-card rounded-lg p-8 border border-red-100 dark:border-red-900/30">
          <div className="flex items-start gap-4 mb-4">
            <RotateCcw className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-deep-brown dark:text-cream">
                Reset to Defaults
              </h2>
              <p className="text-sm text-warm-gray dark:text-dark-muted mt-1">
                Restore all products to the initial default collection
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-sm transition-colors"
          >
            Reset Now
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-12 p-6 bg-clay/5 dark:bg-dark-card rounded-lg border border-clay/20">
        <h3 className="font-bold text-deep-brown dark:text-cream mb-3">
          💡 Tips for Backups
        </h3>
        <ul className="text-sm text-warm-gray dark:text-dark-muted space-y-2">
          <li>• Export your products weekly to maintain a backup</li>
          <li>• Store backups in multiple secure locations</li>
          <li>• Always test imports on a development site first</li>
          <li>• Include the date in backup filenames</li>
        </ul>
      </div>
    </motion.div>
  );
}
