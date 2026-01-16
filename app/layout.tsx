import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://profixautocare.ae'),
  title: 'Profix Auto Care — Precision German Car Service in Dubai',
  description:
    'Top-rated German car workshop in Al Quoz, Dubai. OEM parts, certified technicians, transparent pricing — Book online.',
  keywords: [
    'German car service Dubai',
    'BMW service Dubai',
    'Mercedes service Dubai',
    'Audi service Dubai',
    'Porsche service Dubai',
    'VW service Dubai',
    'Al Quoz car workshop',
    'German auto repair',
    'OEM parts Dubai',
  ],
  authors: [{ name: 'Profix Auto Care' }],
  creator: 'Profix Auto Care',
  publisher: 'Profix Auto Care',
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
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    alternateLocale: 'ar_AE',
    url: 'https://profixautocare.ae',
    siteName: 'Profix Auto Care',
    title: 'Profix Auto Care — Precision German Car Service in Dubai',
    description:
      'Top-rated German car workshop in Al Quoz, Dubai. OEM parts, certified technicians, transparent pricing — Book online.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Profix Auto Care — Premium German Car Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profix Auto Care — Precision German Car Service in Dubai',
    description:
      'Top-rated German car workshop in Al Quoz, Dubai. OEM parts, certified technicians, transparent pricing.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://profixautocare.ae',
    languages: {
      'en-AE': 'https://profixautocare.ae',
      'ar-AE': 'https://profixautocare.ae/ar',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

// JSON-LD Structured Data for LocalBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  '@id': 'https://profixautocare.ae/#business',
  name: 'Profix Auto Care',
  description:
    'Premium German car workshop specializing in BMW, Mercedes-Benz, Audi, Porsche, and VW service and repair.',
  url: 'https://profixautocare.ae',
  logo: 'https://profixautocare.ae/logo.png',
  image: 'https://profixautocare.ae/workshop.jpg',
  telephone: '+971-4-XXX-XXXX',
  email: 'service@profixautocare.ae',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Al Quoz Industrial Area 3',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    postalCode: 'XXXXX',
    addressCountry: 'AE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.1234,
    longitude: 55.1234,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '14:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$$',
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
  currenciesAccepted: 'AED',
  areaServed: {
    '@type': 'City',
    name: 'Dubai',
  },
  brand: [
    { '@type': 'Brand', name: 'BMW' },
    { '@type': 'Brand', name: 'Mercedes-Benz' },
    { '@type': 'Brand', name: 'Audi' },
    { '@type': 'Brand', name: 'Porsche' },
    { '@type': 'Brand', name: 'Volkswagen' },
  ],
  sameAs: [
    'https://www.instagram.com/profixautocare',
    'https://www.facebook.com/profixautocare',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/sequence/poster.webp"
          as="image"
          type="image/webp"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Google Tag Manager - Replace with actual ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {children}
      </body>
    </html>
  );
}
