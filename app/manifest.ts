import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Edmund Chong',
    short_name: 'Edmund Chong',
    description: 'Prudential Wealth Manager personal business website.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#d4b36d',
  };
}
