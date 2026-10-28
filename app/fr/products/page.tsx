import { ProductIndex } from '@/components/ContentPages'; import { entries } from '@/lib/content';
export default function Products(){return <ProductIndex items={entries('products','fr')} locale="fr"/>}
