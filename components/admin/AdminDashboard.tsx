'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import * as ProductLib from '@/lib/products';
import ProductList from './ProductList';
import ProductEditor from './ProductEditor';
import ContactSettings from './ContactSettings';
import BackupManager from './BackupManager';
import DashboardOverview from './DashboardOverview';

type Tab = 'dashboard' | 'products' | 'create' | 'contact' | 'backup';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProducts(ProductLib.getProducts());
  }, []);

  const handleProductSaved = () => {
    setProducts(ProductLib.getProducts());
    setEditingProduct(null);
    if (activeTab === 'create') {
      setActiveTab('products');
    }
  };

  const handleProductDelete = (id: string) => {
    ProductLib.deleteProduct(id);
    setProducts(ProductLib.getProducts());
  };

  const handleProductDuplicate = (id: string) => {
    ProductLib.duplicateProduct(id);
    setProducts(ProductLib.getProducts());
  };

  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
    setActiveTab('create');
  };

  return (
    <div className="flex h-screen bg-ivory dark:bg-dark-bg">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white dark:bg-dark-card border-r border-clay/10">
        <div className="p-6 border-b border-clay/10">
          <h1 className="text-2xl font-playfair font-bold text-clay">Admin</h1>
          <p className="text-sm text-warm-gray dark:text-dark-muted">LARBI Control Panel</p>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { tab: 'dashboard' as Tab, label: 'Dashboard', icon: '📊' },
            { tab: 'products' as Tab, label: 'Products', icon: '🏺' },
            { tab: 'create' as Tab, label: 'New Product', icon: '➕' },
            { tab: 'contact' as Tab, label: 'Contact Settings', icon: '📞' },
            { tab: 'backup' as Tab, label: 'Backup & Import', icon: '💾' },
          ].map(({ tab, label, icon }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-clay text-white'
                  : 'text-clay hover:bg-clay/10'
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          {activeTab === 'dashboard' && <DashboardOverview products={products} />}
          {activeTab === 'products' && (
            <ProductList
              products={products}
              onEdit={handleProductEdit}
              onDelete={handleProductDelete}
              onDuplicate={handleProductDuplicate}
            />
          )}
          {activeTab === 'create' && (
            <ProductEditor
              product={editingProduct}
              onSave={handleProductSaved}
              onCancel={() => {
                setEditingProduct(null);
                setActiveTab('products');
              }}
            />
          )}
          {activeTab === 'contact' && <ContactSettings />}
          {activeTab === 'backup' && (
            <BackupManager onImported={handleProductSaved} />
          )}
        </div>
      </main>
    </div>
  );
}
