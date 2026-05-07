import type { Metadata } from 'next';

export const SITE_NAME = 'Лелека';
export const DEFAULT_OG_IMAGE = '/images/og-home.jpg';
export const DEFAULT_OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
};

export const createPageMetadata = ({
  title,
  description,
  path,
  imageAlt = 'Лелека - додаток для майбутніх мам',
  absoluteTitle = false,
}: CreatePageMetadataOptions): Metadata => {
  const pageTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          ...DEFAULT_OG_IMAGE_SIZE,
          alt: imageAlt,
        },
      ],
      locale: 'uk_UA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
};
