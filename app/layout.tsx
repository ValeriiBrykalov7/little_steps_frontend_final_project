import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import GoogleProvider from '@/components/GoogleProvider/GoogleProvider';
import { createPageMetadata, SITE_NAME } from '@/lib/helper/metadata';

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
const rootDescription =
  'Лелека - додаток для майбутніх мам. Відстежуйте вагітність, отримуйте персоналізовані поради, ведіть щоденник та керуйте важливими завданнями.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  ...createPageMetadata({
    title: SITE_NAME,
    description: rootDescription,
    path: '/',
    imageAlt: 'Лелека - додаток для майбутніх мам',
    absoluteTitle: true,
  }),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  icons: {
    icon: [{ url: '/stork.png', type: 'image/png' }],
    shortcut: '/stork.png',
    apple: '/stork.png',
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
          <GoogleProvider>
            <TanStackProvider>
              <AuthProvider>
                {children} <Toaster />
              </AuthProvider>
            </TanStackProvider>
          </GoogleProvider>
        }
        <div id='modal-root' />
      </body>
    </html>
  );
}
