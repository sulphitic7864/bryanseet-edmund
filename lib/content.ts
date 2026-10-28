import fs from "fs";
import path from "path";
import matter from "gray-matter";
export type Entry = { slug: string; data: any; content: string };
const base = path.join(process.cwd(), "content");
export function entries(
  type: "products" | "blog" | "insights",
  locale = "en",
): Entry[] {
  const dir = path.join(base, type, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const x = matter(raw);
      return {
        slug: f.replace(/\.mdx?$/, ""),
        data: x.data,
        content: x.content,
      };
    })
    .sort((a, b) => (a.data?.main?.id ?? 0) - (b.data?.main?.id ?? 0));
}
export function entry(
  type: "products" | "blog" | "insights",
  slug: string,
  locale = "en",
) {
  return entries(type, locale).find((x) => x.slug === slug);
}
export function imgPath(v?: string) {
  if (!v) return "/images/hero-image.avif";
  return v.replace("@/images/", "/images/");
}
