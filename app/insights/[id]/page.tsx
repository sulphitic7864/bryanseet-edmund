import { InsightDetail } from "@/components/ContentPages";
import { entries, entry } from "@/lib/content";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return entries("insights").map((x) => ({ id: x.slug }));
}
export default async function Insight({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = entry("insights", id);
  if (!item) notFound();
  return <InsightDetail item={item} />;
}
