import { BlogIndex } from "@/components/ContentPages";
import { entries } from "@/lib/content";
export const metadata = { title: "Blog" };
export default function Blog() {
  return <BlogIndex items={entries("blog")} />;
}
