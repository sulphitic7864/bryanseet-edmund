import { BlogDetail } from "@/components/ContentPages";
import { entries, entry } from "@/lib/content";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return entries("blog").map((x) => ({ id: x.slug }));
}
export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = entry("blog", id);
  if (!item) notFound();
  return <BlogDetail item={item} />;
}
