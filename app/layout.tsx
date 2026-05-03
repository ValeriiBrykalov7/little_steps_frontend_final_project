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

export const metadata: Metadata = {
  title: 'Лелека',
  description:
    'Лелека - додаток для майбутніх мам. Відстежуйте свою вагітність, отримуйте персоналізовані поради та керуйте важливими завданнями.',
  openGraph: {
    title: 'Лелека',
    description:
      'Лелека - додаток для майбутніх мам. Відстежуйте свою вагітність, отримуйте персоналізовані поради та керуйте важливими завданнями.',
    url: 'https://little-steps-kappa.vercel.app/',
    siteName: 'Лелека',
    images: [
      {
        url: '/images/meta-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Лелека - додаток для майбутніх мам',
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
    <html
      lang='uk'
      suppressHydrationWarning
      className={`${lato.variable} ${comfortaa.variable}`}
    >
      <body>
        {
          <TanStackProvider>
            <AuthProvider>
              {children} <Toaster />
            </AuthProvider>
          </TanStackProvider>
        }
        <div id='modal-root' />
      </body>
    </html>
  );
}
