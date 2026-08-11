'use client';

import { useState, useEffect } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { validateAdminSession } from '@/config/admin';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const isValid = validateAdminSession();
    setIsAuthenticated(isValid);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">⏳</div>
          <p className="mt-4 text-warm-gray dark:text-dark-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <AdminDashboard />
  ) : (
    <AdminLogin onSuccess={() => setIsAuthenticated(true)} />
  );
}
