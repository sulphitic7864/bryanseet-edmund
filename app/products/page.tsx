import { ProductIndex } from "@/components/ContentPages";
import { entries } from "@/lib/content";
export const metadata = { title: "Products" };
export default function Products() {
  return <ProductIndex items={entries("products")} />;
}
