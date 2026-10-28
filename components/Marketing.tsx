import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Hammer,
  BookOpen,
  Users,
  BadgeCheck,
  Star,
  Wrench,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export const features = [
  {
    title: "Dedicated Teams",
    text: "Benefit from our committed teams who ensure your success is personal. Count on expert guidance and exceptional results throughout your project journey.",
    icon: Users,
  },
  {
    title: "Simplicity and Affordability",
    text: "Find easy-to-use, affordable solutions with ScrewFast's line of tools and equipment. Our products make procurement simple and keep projects within budget.",
    icon: BadgeCheck,
  },
  {
    title: "Comprehensive Documentation",
    text: "Integrate with ease using ScrewFast's exhaustive guides and libraries. Achieve seamless product adoption with our full suite of documentation designed for your success.",
    icon: BookOpen,
  },
  {
    title: "User-Centric Design",
    text: "Experience the difference with ScrewFast's user-focused design, where functionality meets practicality for an enhanced work experience.",
    icon: Hammer,
  },
];
export const faqs = [
  [
    "What types of tools are included in the Starter Kit?",
    "The Starter Kit features essential hand and power tools for diverse DIY projects, including hammers, drills, screwdrivers, and a variety of fasteners.",
  ],
  [
    "Can I upgrade from the Starter Kit to the Professional Toolbox?",
    "Absolutely. You can upgrade at any time to access a wider range of high-quality tools, priority support, and exclusive content.",
  ],
  [
    "What discounts are available for bulk orders?",
    "Professional Toolbox members are entitled to exclusive bulk-order discounts depending on order volume.",
  ],
  [
    "What kind of customer support can I expect?",
    "All customers receive email support. Professional Toolbox customers receive priority support and faster response times.",
  ],
  [
    "How current are the online resources and tutorials?",
    "We regularly update our resources to reflect new tools, techniques, and construction trends.",
  ],
  [
    "Does ScrewFast offer services for large-scale construction projects?",
    "Yes. Enterprise Solutions include consultation, planning, sourcing, and tailored support for larger construction needs.",
  ],
];
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`mx-auto max-w-[85rem] px-5 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <div className="mb-3 text-xs font-black uppercase tracking-[.22em] text-yellow-600">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-black tracking-tight md:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400 md:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}
export function HomeHero() {
  return (
    <Container className="py-14 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300">
            Hardware + construction expertise
          </div>
          <h1 className="text-5xl font-black leading-[.95] tracking-tight sm:text-6xl lg:text-7xl">
            Equip Your Projects with{" "}
            <span className="text-yellow-500">ScrewFast</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Top-quality hardware tools and expert construction services for
            every project need.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black hover:bg-yellow-400"
            >
              Start Exploring <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-neutral-300 px-5 py-3 font-bold hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Contact Sales Team
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm">
            <div className="flex text-yellow-500">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={17} fill="currentColor" />
              ))}
            </div>
            <span>
              <b>4.8</b> / 5 from over <b>12.8k</b> reviews
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-yellow-200/40 blur-3xl dark:bg-yellow-600/10" />
          <img
            src="/images/hero-image.avif"
            alt="ScrewFast product boxes"
            className="h-auto w-full rounded-[2rem] object-cover shadow-2xl"
          />
        </div>
      </div>
    </Container>
  );
}
export function FeatureGrid() {
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Built for real work"
        title="Meeting Industry Demands"
        text="From cutting-edge tools to expert services, we help you overcome project obstacles and deliver stronger results."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ title, text, icon: Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"
          >
            <div className="mb-5 inline-flex rounded-xl bg-yellow-100 p-3 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300">
              <Icon />
            </div>
            <h3 className="text-lg font-extrabold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              {text}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
export function ToolsShowcase() {
  const rows = [
    [
      "Cutting-Edge Tools",
      "Empower projects with sophisticated, practical tools designed to improve efficiency.",
      "/images/automated-tools.avif",
    ],
    [
      "Intuitive Dashboards",
      "Navigate projects with user-friendly interfaces built for quick and effective workflow management.",
      "/images/dashboard-image.avif",
    ],
    [
      "Robust Features",
      "Minimize complexity and maximize productivity with construction workflows engineered for results.",
      "/images/construction-image.avif",
    ],
  ];
  return (
    <Container className="py-14">
      <div className="rounded-[2rem] bg-neutral-950 p-6 text-white md:p-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {rows.map(([title, text, img]) => (
            <div
              key={title}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900"
            >
              <img src={img} alt={title} className="h-52 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
export function Stats() {
  const s = [
    ["70k+", "customers equipped"],
    ["35%", "uptick in project efficiency"],
    ["15.3%", "reduction in maintenance costs"],
    ["2x", "quicker assembly workflows"],
  ];
  return (
    <Container className="py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="text-xs font-black uppercase tracking-[.22em] text-yellow-600">
            Trusted at scale
          </div>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Fast-Track Your Projects
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-neutral-600 dark:text-neutral-400">
            Instant setup, responsive support, and tools designed to keep
            construction moving.
          </p>
          <blockquote className="mt-8 rounded-2xl border-l-4 border-yellow-500 bg-neutral-100 p-6 text-lg font-medium italic dark:bg-neutral-900">
            “ScrewFast dramatically boosted our project efficiency. Setup was
            instant, and their rapid response times are phenomenal.”
            <footer className="mt-4 text-sm not-italic text-neutral-500">
              Samantha Ruiz, COO, ConstructIt Inc.
            </footer>
          </blockquote>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {s.map(([n, t]) => (
            <div
              key={n}
              className="rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-900"
            >
              <div className="text-3xl font-black text-yellow-600">{n}</div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {t}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
export function Pricing() {
  const plans = [
    {
      name: "Starter Kit",
      price: "49",
      desc: "Best option for DIY projects",
      features: [
        "Key hardware tools",
        "Access to guides & tutorials",
        "Standard support",
      ],
      hot: false,
    },
    {
      name: "Professional Toolbox",
      price: "89",
      desc: "Best for large scale uses",
      features: [
        "Premium tool selection",
        "Priority support",
        "Exclusive content & deals",
        "Bulk order discounts",
      ],
      hot: true,
    },
  ];
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple, Transparent Pricing"
        text="Boost efficiency with clear, value-driven plans."
      />
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-3xl p-7 ${p.hot ? "bg-gradient-to-br from-orange-500 to-yellow-500 text-white" : "bg-neutral-900 text-white"}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-black">{p.name}</h3>
                <p className="mt-1 text-sm opacity-75">{p.desc}</p>
              </div>
              {p.hot && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase">
                  Best value
                </span>
              )}
            </div>
            <div className="mt-7">
              <span className="text-6xl font-black">${p.price}</span>
              <span className="opacity-70"> / month</span>
            </div>
            <ul className="mt-7 grid gap-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <CheckCircle2 size={18} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-7 block rounded-xl bg-white/15 px-5 py-3 text-center font-black hover:bg-white/25"
            >
              Get started
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
export function FAQ() {
  return (
    <Container className="py-16">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <h2 className="text-4xl font-black">Frequently asked questions</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            Ask us anything about our brand and products.
          </p>
        </div>
        <div className="md:col-span-3">
          {faqs.map(([q, a]) => (
            <details
              key={q}
              className="group border-b border-neutral-200 py-5 dark:border-neutral-800"
              open={q === faqs[0][0]}
            >
              <summary className="cursor-pointer list-none font-bold">
                {q}
              </summary>
              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Container>
  );
}
export function CTA() {
  return (
    <Container className="py-16">
      <div className="rounded-[2rem] bg-yellow-500 p-8 text-black md:p-12">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-4xl font-black">Let&apos;s Build Together</h2>
            <p className="mt-3 max-w-2xl text-black/70">
              Bring together reliable tools, practical services, and a team that
              understands the work behind the build.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 font-bold text-white"
          >
            Contact us <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </Container>
  );
}
export function ServiceHighlights() {
  const cards = [
    {
      icon: Wrench,
      title: "Expert guidance",
      text: "Professional consultation and tailored product recommendations.",
    },
    {
      icon: ShieldCheck,
      title: "Quality workmanship",
      text: "Reliable construction services with safety and durability at the center.",
    },
    {
      icon: Clock3,
      title: "Project oversight",
      text: "Planning and management that keeps projects on time and within budget.",
    },
  ];
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {cards.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"
        >
          <Icon className="text-yellow-600" />
          <h3 className="mt-4 text-xl font-black">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}
