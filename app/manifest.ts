import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bryan Seet',
    short_name: 'Bryan Seet',
    description: 'Prudential Wealth Manager personal business website.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#eab308',
  };
}
