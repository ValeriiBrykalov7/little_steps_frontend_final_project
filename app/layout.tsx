import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

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

export const metadata: Metadata = {
  title: 'Leleka',
  description:
    'Leleka is an app for future mothers. Track your pregnancy journey, get personalized tips and manage important tasks.',
  icons: {
    icon: '/stork.png',
  },
  openGraph: {
    title: 'Leleka',
    description:
      'Leleka is an app for future mothers. Track your pregnancy journey, get personalized tips and manage important tasks.',
    url: 'https://little-steps-kappa.vercel.app/',
    siteName: 'Leleka',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Leleka app',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk' className={`${lato.variable} ${comfortaa.variable}`}>
      <body>
        {
          <TanStackProvider>
            <AuthProvider>{children}</AuthProvider>
          </TanStackProvider>
        }
      </body>
    </html>
  );
}
