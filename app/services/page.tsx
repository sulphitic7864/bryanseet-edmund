import Link from "next/link";
import {
  Container,
  SectionHeading,
  ServiceHighlights,
} from "@/components/Marketing";
const rows = [
  [
    "Delivering Expert Guidance",
    "Embarking on a construction project can be overwhelming. Our professional consultation services guide you through every stage, from product selection and scope to practical compliance considerations.",
    "/images/blueprints-image.avif",
  ],
  [
    "Transforming Designs into Reality",
    "Our skilled craftsmen bring precision and excellence to every construction project, from minor installations to substantial structural work.",
    "/images/before-after.avif",
  ],
  [
    "Navigating Projects with Professional Oversight",
    "We provide thorough planning and robust management services that keep your project on time and within budget.",
    "/images/construction-workers.avif",
  ],
  [
    "Ensuring Long-lasting Performance",
    "Our maintenance and support services help protect your construction long after completion.",
    "/images/using-tools.avif",
  ],
  [
    "Crafting Bespoke Strategies",
    "For larger enterprise clients, we develop tailored strategies around specific construction and operational challenges.",
    "/images/progress-building.avif",
  ],
];
export const metadata = { title: "Services" };
export default function Services() {
  return (
    <>
      <Container className="py-16">
        <SectionHeading
          eyebrow="Services"
          title="Uniting Expertise with Your Vision"
          text="Comprehensive solutions and exceptional service for hardware and construction projects from inception to completion."
        />
        <div className="mt-10">
          <ServiceHighlights />
        </div>
      </Container>
      <Container className="py-8">
        {rows.map(([title, text, img], i) => (
          <div
            key={title}
            className={`grid items-center gap-8 border-t border-neutral-200 py-12 dark:border-neutral-800 lg:grid-cols-2 ${i % 2 ? "" : "lg:[&>div:first-child]:order-2"}`}
          >
            <div>
              <img
                src={img}
                alt={title}
                className="h-80 w-full rounded-3xl object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-yellow-600">
                0{i + 1}
              </div>
              <h2 className="mt-3 text-3xl font-black">{title}</h2>
              <p className="mt-4 leading-7 text-neutral-600 dark:text-neutral-400">
                {text}
              </p>
              {i < 2 && (
                <Link
                  href="/contact"
                  className="mt-6 inline-block rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black"
                >
                  Learn more
                </Link>
              )}
            </div>
          </div>
        ))}
      </Container>
      <Container className="py-14">
        <div className="rounded-3xl bg-neutral-950 p-8 text-white">
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <div className="text-5xl font-black text-yellow-500">96%</div>
              <p className="mt-2 text-sm text-neutral-400">
                of clients rate their experience exceptional
              </p>
            </div>
            {[
              ["99.8%", "project completion rate"],
              ["5,000+", "successful installations"],
              ["85%", "client growth year-over-year"],
            ].map(([n, t]) => (
              <div key={n}>
                <div className="text-4xl font-black">{n}</div>
                <p className="mt-2 text-sm text-neutral-400">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
