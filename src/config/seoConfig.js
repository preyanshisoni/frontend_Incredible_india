const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://www.yourwebsite.com'
    : 'http://localhost:3001';

console.log('Current Environment:', process.env.NODE_ENV);

const defaultSEOConfig = {
  title: 'Incredible India - Explore Beautiful Destinations',
  description: 'Discover the most beautiful historical, cultural, and spiritual places in India.',
  canonical: `${baseUrl}/`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/`,
    siteName: 'Incredible India',
    images: [
      {
        url: `${baseUrl}/Location.png`,
        width: 1200,
        height: 630,
        alt: 'Incredible India',
      },
    ],
  },
//   twitter: {
//     handle: '@IncredibleIndia',
//     site: '@IncredibleIndia',
//     cardType: 'summary_large_image',
//   },
};

export default defaultSEOConfig;
