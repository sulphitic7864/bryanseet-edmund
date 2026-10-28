import { BlogIndex } from '@/components/ContentPages'; import { entries } from '@/lib/content';
export default function Blog(){return <BlogIndex items={entries('blog','fr')} locale="fr"/>}
