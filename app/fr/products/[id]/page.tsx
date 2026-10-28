import { ProductDetail } from '@/components/ContentPages'; import { entries, entry } from '@/lib/content'; import { notFound } from 'next/navigation';
export function generateStaticParams(){return entries('products','fr').map(x=>({id:x.slug}))}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const item=entry('products',id,'fr');if(!item)notFound();return <ProductDetail item={item} locale="fr"/>}
