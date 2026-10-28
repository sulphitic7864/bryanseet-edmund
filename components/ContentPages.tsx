import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowRight, CalendarDays, Clock, Tag } from "lucide-react";
import { Container, SectionHeading } from "./Marketing";
import { Entry, imgPath } from "@/lib/content";

export function ProductIndex({
  items,
  locale = "en",
}: {
  items: Entry[];
  locale?: string;
}) {
  const prefix = locale === "fr" ? "/fr" : "";
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow={locale === "fr" ? "Produits" : "Products"}
        title={
          locale === "fr"
            ? "Outils fiables pour chaque projet"
            : "Reliable tools for every project"
        }
        text={
          locale === "fr"
            ? "Découvrez une sélection de produits conçus pour le travail réel."
            : "Explore hardware built for demanding DIY, professional, and construction work."
        }
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`${prefix}/products/${item.slug}`}
            className="group overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800"
          >
            <img
              src={imgPath(item.data?.main?.imgCard)}
              alt={item.data?.main?.imgAlt || item.data.title}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="p-6">
              <div className="text-xs font-black uppercase tracking-widest text-yellow-600">
                {item.data.description}
              </div>
              <h2 className="mt-2 text-2xl font-black">{item.data.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {item.data?.main?.content}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-bold">
                {locale === "fr" ? "Voir le produit" : "View product"}{" "}
                <ArrowRight size={17} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export function ProductDetail({
  item,
  locale = "en",
}: {
  item: Entry;
  locale?: string;
}) {
  const d = item.data;
  const prefix = locale === "fr" ? "/fr" : "";
  const specs = [
    ...(d.specificationsLeft || []),
    ...(d.specificationsRight || []),
  ];
  return (
    <>
      <Container className="py-12">
        <Link
          href={`${prefix}/products`}
          className="text-sm font-bold text-yellow-600"
        >
          ← {locale === "fr" ? "Retour aux produits" : "Back to products"}
        </Link>
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="text-sm font-black uppercase tracking-widest text-yellow-600">
              {d.description}
            </div>
            <h1 className="mt-3 text-5xl font-black tracking-tight">
              {d.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              {d?.main?.content}
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex rounded-xl bg-yellow-500 px-5 py-3 font-black text-black"
            >
              {d?.longDescription?.btnTitle || "Contact sales"}
            </Link>
          </div>
          <img
            src={imgPath(d?.main?.imgMain)}
            alt={d?.main?.imgAlt || d.title}
            className="w-full rounded-[2rem] object-cover shadow-xl"
          />
        </div>
      </Container>
      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">
              {d?.longDescription?.title || "Product details"}
            </h2>
            <p className="mt-4 leading-7 text-neutral-600 dark:text-neutral-400">
              {d?.longDescription?.subTitle}
            </p>
            <div className="mt-8 grid gap-4">
              {(d.descriptionList || []).map((x: any) => (
                <div
                  key={x.title}
                  className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
                >
                  <h3 className="font-black">{x.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                    {x.subTitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-neutral-100 p-6 dark:bg-neutral-900">
            <h2 className="text-2xl font-black">Specifications</h2>
            <div className="mt-5 grid gap-4">
              {specs.map((x: any) => (
                <div
                  key={x.title}
                  className="border-b border-neutral-200 pb-4 dark:border-neutral-800"
                >
                  <div className="font-bold">{x.title}</div>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {x.subTitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {d.blueprints && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <img
              src={imgPath(d.blueprints.first)}
              alt="Product blueprint"
              className="rounded-3xl"
            />
            <img
              src={imgPath(d.blueprints.second)}
              alt="Product blueprint"
              className="rounded-3xl"
            />
          </div>
        )}
      </Container>
    </>
  );
}

export function BlogIndex({
  items,
  locale = "en",
}: {
  items: Entry[];
  locale?: string;
}) {
  const prefix = locale === "fr" ? "/fr" : "";
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Blog"
        title={
          locale === "fr"
            ? "Idées, outils et conseils"
            : "Ideas, tools, and field notes"
        }
        text={
          locale === "fr"
            ? "Conseils pratiques pour la construction et les outils."
            : "Practical thinking about construction, safety, procurement, tools, and better workflows."
        }
      />
      <div className="mt-12 grid gap-7 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            href={`${prefix}/blog/${item.slug}`}
            key={item.slug}
            className="group overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800"
          >
            <img
              src={imgPath(item.data.cardImage)}
              alt={item.data.cardImageAlt || item.data.title}
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <span className="inline-flex gap-1">
                  <Clock size={14} />
                  {item.data.readTime || 4} min
                </span>
                <span>{String(item.data.pubDate || "").slice(0, 10)}</span>
              </div>
              <h2 className="mt-3 text-xl font-black leading-tight">
                {item.data.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {item.data.description}
              </p>
              <div className="mt-5 font-bold text-yellow-600">
                Read article →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export function BlogDetail({
  item,
  locale = "en",
}: {
  item: Entry;
  locale?: string;
}) {
  const d = item.data;
  const prefix = locale === "fr" ? "/fr" : "";
  const paragraphs = d.contents || [];
  return (
    <Container className="py-14">
      <Link
        href={`${prefix}/blog`}
        className="text-sm font-bold text-yellow-600"
      >
        ← Back to blog
      </Link>
      <article className="mx-auto mt-8 max-w-4xl">
        <div className="text-center">
          <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
            <span className="inline-flex gap-1">
              <CalendarDays size={14} />
              {String(d.pubDate || "").slice(0, 10)}
            </span>
            <span className="inline-flex gap-1">
              <Clock size={14} />
              {d.readTime || 4} min read
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            {d.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            {d.description}
          </p>
          {d.author && (
            <div className="mt-7 flex items-center justify-center gap-3">
              <img
                src={imgPath(d.authorImage)}
                alt={d.authorImageAlt || d.author}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="text-sm font-bold">{d.author}</div>
                {d.role && (
                  <div className="text-xs text-neutral-500">{d.role}</div>
                )}
              </div>
            </div>
          )}
        </div>
        <img
          src={imgPath(d.cardImage)}
          alt={d.cardImageAlt || d.title}
          className="mt-10 h-[28rem] w-full rounded-[2rem] object-cover"
        />
        <div className="prose-custom mx-auto mt-10 max-w-3xl">
          {paragraphs.length ? (
            paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)
          ) : (
            <ReactMarkdown>{item.content}</ReactMarkdown>
          )}
        </div>
        {Array.isArray(d.tags) && (
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-2">
            {d.tags.map((t: string) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs dark:bg-neutral-900"
              >
                <Tag size={12} />
                {t}
              </span>
            ))}
          </div>
        )}
      </article>
    </Container>
  );
}

export function InsightDetail({ item }: { item: Entry }) {
  const d = item.data;
  return (
    <Container className="py-14">
      <Link href="/blog" className="text-sm font-bold text-yellow-600">
        ← More insights
      </Link>
      <article className="mx-auto mt-8 max-w-4xl">
        <div className="text-center">
          <div className="text-xs font-black uppercase tracking-widest text-yellow-600">
            Insight
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            {d.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            {d.description}
          </p>
        </div>
        <img
          src={imgPath(d.cardImage)}
          alt={d.cardImageAlt || d.title}
          className="mt-10 h-[28rem] w-full rounded-[2rem] object-cover"
        />
        <div className="prose-custom mx-auto mt-10 max-w-3xl">
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>
      </article>
    </Container>
  );
}
