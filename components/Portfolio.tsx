"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  Award,
  BadgeCheck,
  Instagram,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import ContactForm from "./ContactForm";

function Container({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-[85rem] scroll-mt-28 px-5 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeading({
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

const aboutFeatureIcons = {
  users: Users,
  shield: ShieldCheck,
  award: Award,
  sparkles: Sparkles,
  badge: BadgeCheck,
} as const;

export function Hero() {
  const { content: siteContent } = useSiteContent();
  const wa = `https://wa.me/${siteContent.contact.whatsappNumber}`;
  return (
    <Container className="py-14 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div className="order-last lg:order-first">
          <div className="mb-5 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300">
            {siteContent.eyebrow}
          </div>
          <h1 className="text-5xl font-black leading-[.96] tracking-tight sm:text-6xl lg:text-7xl">
            {siteContent.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            {siteContent.heroText}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-black text-black hover:bg-yellow-400"
            >
              <MessageCircle size={18} /> WhatsApp Bryan
            </a>
            <Link
              href="/#credentials"
              className="rounded-xl border border-neutral-300 px-5 py-3 font-bold hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              View credentials
            </Link>
          </div>
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {siteContent.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
              >
                <div className="text-2xl font-black text-yellow-600">
                  {item.value}
                </div>
                <div className="mt-1 text-xs leading-5 text-neutral-500">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg order-first lg:order-last">
          <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-yellow-200/40 blur-3xl dark:bg-yellow-600/10" />
          <div className="overflow-hidden rounded-[2.2rem] bg-neutral-100 shadow-2xl dark:bg-neutral-900">
            <img
              src={siteContent.portrait}
              alt="Bryan Seet"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/90">
            <div className="font-black">{siteContent.name}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {siteContent.role}
            </div>
            <div className="mt-1 text-xs text-neutral-500">
              MAS Rep No. {siteContent.masRep}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export function About() {
  const { content: siteContent } = useSiteContent();
  const section = siteContent.aboutSection;

  return (
    <Container id="about" className="py-16">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          {section.eyebrow && (
            <div className="text-xs font-black uppercase tracking-[.22em] text-yellow-600">
              {section.eyebrow}
            </div>
          )}
          {section.title && (
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              {section.title}
            </h2>
          )}
        </div>

        <div className="space-y-5 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          {siteContent.about.map((paragraph, index) => (
            <p key={`${index}-${paragraph}`}>{paragraph}</p>
          ))}

          {section.features.length > 0 && (
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {section.features.map((item, index) => {
                const Icon = aboutFeatureIcons[item.icon];

                return (
                  <div
                    key={`${item.title}-${index}`}
                    className="rounded-2xl bg-neutral-100 p-5 dark:bg-neutral-900"
                  >
                    <Icon className="text-yellow-600" />
                    <h3 className="mt-3 font-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6">{item.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export function Credentials() {
  const { content: siteContent } = useSiteContent();
  return (
    <Container id="credentials" className="py-16">
      <SectionHeading
        eyebrow="Credentials"
        title="Professional milestones"
        text="Recognition reflects consistent service, professional development, and the trust clients place in the relationship."
      />
      <div className="mt-10 grid gap-4 grid-cols-2  md:grid-cols-2 lg:grid-cols-5">
        {siteContent.credentials.map((item, index) => (
          <div
            key={item.title}
            className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"
          >
            <div className="mb-5 inline-flex rounded-xl bg-yellow-100 p-3 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300">
              {index === 0 ? (
                <Award />
              ) : index === 4 ? (
                <Sparkles />
              ) : (
                <BadgeCheck />
              )}
            </div>
            <h3 className="font-extrabold leading-6">{item.title}</h3>
            <p className="mt-2 text-sm text-neutral-500">{item.detail}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export function MediaGallery() {
  const { content: siteContent } = useSiteContent();
  return (
    <Container id="events" className="py-16">
      <SectionHeading
        eyebrow="Events & Moments"
        title="Beyond the meeting room"
        text="Professional milestones, industry events, and moments that reflect the relationships behind the work. The gallery is ready for both photos and embedded videos."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {siteContent.media.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
          >
            {item.type === "video" ? (
              <div className="relative aspect-video bg-black">
                {item.src.includes("youtube.com/embed") ||
                item.src.includes("player.vimeo.com") ? (
                  <iframe
                    src={item.src}
                    title={item.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={item.src}
                    poster={item.poster}
                    controls
                    preload="metadata"
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            ) : (
              <div className="relative overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-lg font-black">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-neutral-500">
                {item.caption}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}

export function Testimonials() {
  const { content: siteContent } = useSiteContent();
  return (
    <Container id="testimonials" className="py-16">
      <SectionHeading
        eyebrow="Client Testimonials"
        title="What clients say"
        text="A few reflections from clients who value clear communication, responsiveness, and a relationship-first approach."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {siteContent.testimonials.map((item) => (
          <article
            key={item.name}
className="
  group
  flex
  h-full
  flex-col
  overflow-hidden
  rounded-3xl
  border border-neutral-200
  bg-white
  shadow-sm
  transition-all
  duration-300
  hover:-translate-y-1
  hover:shadow-xl
  dark:border-neutral-800
  dark:bg-neutral-950
"          >
            <img
              src={item.image}
              alt={`${item.name} with Bryan Seet`}
              className="h-60 w-full object-cover md:h-full"
            />
            <div className="p-6">
              <div className="text-yellow-500">★★★★★</div>
              <h3 className="mt-3 text-xl font-black">{item.title}</h3>
              <blockquote className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                “{item.quote}”
              </blockquote>
              <div className="mt-5 text-sm font-black">{item.name}</div>
              <div className="text-xs text-neutral-500">{item.role}</div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}

export function Contact() {
  const { content: siteContent } = useSiteContent();
  const { contact } = siteContent;
  return (
    <Container id="contact" className="py-16">
      <div className="rounded-[2rem] bg-neutral-950 p-7 text-white md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="text-xs font-black uppercase tracking-[.22em] text-yellow-400">
              Connect with Bryan
            </div>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Start with a conversation.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-neutral-400">
              Whether you are reviewing existing coverage, planning for a new
              life stage, or simply want a clearer picture of your options, send
              a message and Bryan can continue the conversation directly with
              you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-black text-black"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
              {contact.instagramUrl && (
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-5 py-3 font-bold"
                >
                  <Instagram size={18} /> Instagram
                </a>
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 text-neutral-900 md:p-8">
            <h3 className="text-xl font-black">Send a WhatsApp enquiry</h3>
            <p className="mt-2 text-sm text-neutral-500">
              Your message will open in WhatsApp, ready for you to review and
              send.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function Portfolio() {
  return (
    <>
      <Hero />
      <About />
      <Credentials />
      <MediaGallery />
      <Testimonials />
      <Contact />
    </>
  );
}
