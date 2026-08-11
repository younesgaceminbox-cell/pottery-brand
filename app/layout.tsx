import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pottery Brand - Handcrafted Algerian Ceramics',
  description: 'Discover authentic handcrafted Algerian pottery. Traditional craftsmanship meets modern luxury.',
  keywords: 'pottery, ceramics, Algeria, handcrafted, clay, artisan',
  authors: [{ name: 'Pottery Brand' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pottery-brand.com',
    title: 'Pottery Brand - Handcrafted Algerian Ceramics',
    description: 'Discover authentic handcrafted Algerian pottery. Traditional craftsmanship meets modern luxury.',
    siteName: 'Pottery Brand',
    images: [{
      url: '/logo.png',
      width: 1200,
      height: 1200,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pottery Brand - Handcrafted Algerian Ceramics',
    description: 'Discover authentic handcrafted Algerian pottery. Traditional craftsmanship meets modern luxury.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://pottery-brand.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#a0633a" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="bg-white text-gray-900 dark:bg-dark-bg dark:text-white transition-colors">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
