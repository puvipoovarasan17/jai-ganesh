import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';
import Footer from '../components/Footer';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://jai-ganesh-platform.vercel.app'), // Update with actual domain later
  title: 'Jai Ganesh Catering & Service | Catering in Chennai & Kanchipuram',
  description: 'Premium Veg & Non-Veg Catering for Weddings and Events in Chennai & Kanchipuram. Jai Ganesh Catering & Service. Contact us for a quote today.',
  keywords: 'Jai Ganesh Catering, Catering Service Chennai, Wedding Catering Chennai, Catering Service Saidapet, Veg Catering Chennai, Non-Veg Catering Chennai, Wedding Catering Kanchipuram',
  openGraph: {
    title: 'Jai Ganesh Catering & Service | Catering in Chennai & Kanchipuram',
    description: 'Premium Veg & Non-Veg Catering for Weddings and Events in Chennai & Kanchipuram.',
    url: 'https://jai-ganesh-platform.vercel.app',
    siteName: 'Jai Ganesh Catering & Service',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jai Ganesh Catering & Service',
    description: 'Premium Veg & Non-Veg Catering for Weddings and Events in Chennai & Kanchipuram.',
  },
  manifest: '/manifest.json',
  themeColor: '#160a21',
};

import { Providers } from './providers';

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Jai Ganesh Catering & Service',
    image: 'https://jai-ganesh-platform.vercel.app/images/icons/icon-512x512.png',
    '@id': 'https://jai-ganesh-platform.vercel.app',
    url: 'https://jai-ganesh-platform.vercel.app',
    telephone: '9941813565',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'No. 4/15, Elaiyalwar Koil Street, West Saidapet',
        addressLocality: 'Chennai',
        postalCode: '600015',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Orikkai',
        addressLocality: 'Kanchipuram',
        postalCode: '631502',
        addressCountry: 'IN',
      }
    ],
    areaServed: ['Chennai', 'Kanchipuram', 'Saidapet']
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
