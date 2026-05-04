import type { Metadata } from 'next';
import DashboardPageClient from './DashboardPageClient';

const title = 'Лелека';
const description =
  'Лелека - додаток для майбутніх мам: відстежуйте вагітність, отримуйте персоналізовані поради, ведіть щоденник і керуйте важливими завданнями.';
const ogImage = '/images/og-home.jpg';

export const metadata: Metadata = {
  metadataBase: new URL('https://little-steps-kappa.vercel.app'),
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Лелека',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Лелека - додаток для майбутніх мам',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

export default function DashboardPage() {
  return <DashboardPageClient />;
}
