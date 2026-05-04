import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { Toaster } from 'react-hot-toast';

const lato = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-family',
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['700'],
  variable: '--second-family',
  display: 'swap',
});

const siteUrl = 'https://little-steps-kappa.vercel.app';
const title = 'Лелека';
const description =
  'Лелека - додаток для майбутніх мам. Відстежуйте вагітність, отримуйте персоналізовані поради, ведіть щоденник та керуйте важливими завданнями.';
const ogImage = '/images/og-home.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: title,
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  icons: {
    icon: [{ url: '/stork.png', type: 'image/png' }],
    shortcut: '/stork.png',
    apple: '/stork.png',
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: title,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='uk'
      suppressHydrationWarning
      className={`${lato.variable} ${comfortaa.variable}`}
    >
      <body>
        <TanStackProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </TanStackProvider>
        <div id='modal-root' />
      </body>
    </html>
  );
}
