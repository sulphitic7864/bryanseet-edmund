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
        <div className="mb-3 text-xs font-black uppercase tracking-[.22em] text-[#b68949] dark:text-[#f0c979]">
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
          <div className="mb-5 inline-flex rounded-full bg-[#f5ebd0] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#8b6b2d] dark:bg-[#1f2b3d] dark:text-[#f0c979]">
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
              className="inline-flex items-center gap-2 rounded-xl bg-[#c9a86a] px-5 py-3 font-black text-[#091b2a] shadow-[0_10px_20px_rgba(201,168,106,0.28)] transition hover:bg-[#b98e4b]"
            >
              <MessageCircle size={18} /> WhatsApp Edmund
            </a>
            <Link
              href="/#credentials"
              className="rounded-xl border border-[#d5c7a2] bg-white/60 px-5 py-3 font-bold text-[#0d1b2a] transition hover:bg-[#fffaf0] dark:border-[#39536f] dark:bg-[#102235] dark:text-[#f8fafc] dark:hover:bg-[#142a3d]"
            >
              View credentials
            </Link>
          </div>
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {siteContent.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#e7dbc0] bg-white/70 p-4 shadow-sm dark:border-[#2a3b4f] dark:bg-[#0d1c2c]"
              >
                <div className="text-2xl font-black text-[#b78f4f] dark:text-[#f0c979]">
                  {item.value}
                </div>
                <div className="mt-1 text-xs leading-5 text-[#5d6d7f] dark:text-[#dfeaf6]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg order-first lg:order-last">
          <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-[#f2dca1]/60 blur-3xl dark:bg-[#13314d]/60" />
          <div className="overflow-hidden rounded-[2.2rem] bg-[#eef3f7] shadow-[0_20px_40px_rgba(9,27,42,0.12)] dark:bg-[#0f1d2d]">
            <img
              src={siteContent.portrait}
              alt="Edmund Chong"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-[#efe1bd] bg-[#fffdfb]/90 p-4 shadow-xl backdrop-blur dark:border-[#2d425b] dark:bg-[#0d1d2d]/90">
            <div className="font-black text-[#091b2a] dark:text-[#f8fafc]">{siteContent.name}</div>
            <div className="text-sm text-[#4b5d72] dark:text-[#dfe9f7]">
              {siteContent.role}
            </div>
            <div className="mt-1 text-xs text-[#6e7c8d] dark:text-[#dfeaf6]">
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
            <div className="text-xs font-black uppercase tracking-[.22em] text-[#b68949] dark:text-[#f3c86e]">
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
            <p key={`${index}-${paragraph}`} className="text-[#47586d] dark:text-[#dbe6f1]">{paragraph}</p>
          ))}

          {section.features.length > 0 && (
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {section.features.map((item, index) => {
                const Icon = aboutFeatureIcons[item.icon];

                return (
                  <div
                    key={`${item.title}-${index}`}
                    className="rounded-2xl border border-[#eadbb2] bg-[#faf7f1] p-5 shadow-sm dark:border-[#2c3b4e] dark:bg-[#0d1d2d]"
                  >
                    <Icon className="text-[#b48b4a] dark:text-[#f0c979]" />
                    <h3 className="mt-3 font-black text-[#0b1d2d] dark:text-[#f8fafc]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#576a7f] dark:text-[#dfeaf6]">{item.text}</p>
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
            className="rounded-2xl border border-[#e8dcc2] bg-white/75 p-6 shadow-sm dark:border-[#2a3d52] dark:bg-[#0f1d2d]"
          >
            <div className="mb-5 inline-flex rounded-xl bg-[#f5ebd0] p-3 text-[#8b6b2d] dark:bg-[#1e2d3f] dark:text-[#f0c979]">
              {index === 0 ? (
                <Award />
              ) : index === 4 ? (
                <Sparkles />
              ) : (
                <BadgeCheck />
              )}
            </div>
            <h3 className="font-extrabold leading-6 text-[#0d1b2a] dark:text-[#f8fafc]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#586d82] dark:text-[#dfe9f4]">{item.detail}</p>
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
            className="group overflow-hidden rounded-3xl border border-[#eadbb2] bg-white shadow-sm dark:border-[#2b3e4d] dark:bg-[#0d1d2d]"
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
              <h3 className="text-lg font-black text-[#0d1b2a] dark:text-[#f8fafc]">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#5a6b7f] dark:text-[#dfe9f4]">
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
              border border-[#eadbb2]
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              dark:border-[#2d4257]
              dark:bg-[#0d1d2d]
            "
          >
            <img
              src={item.image}
              alt={`${item.name} with Edmund Chong`}
              className="h-60 w-full object-cover md:h-full"
            />
            <div className="p-6">
              <div className="text-[#c7a665] dark:text-[#f1ca73]">★★★★★</div>
              <h3 className="mt-3 text-xl font-black text-[#0d1b2a] dark:text-[#f8fafc]">{item.title}</h3>
              <blockquote className="mt-3 text-sm leading-7 text-[#4d5c6f] dark:text-[#dfeaf5]">
                “{item.quote}”
              </blockquote>
              <div className="mt-5 text-sm font-black text-[#0d1b2a] dark:text-[#f8fafc]">{item.name}</div>
              <div className="text-xs text-[#5a6d82] dark:text-[#dfeaf6]">{item.role}</div>
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
      <div className="rounded-[2rem] bg-[#071827] p-7 text-white md:p-10 lg:p-12 shadow-[0_24px_50px_rgba(9,27,42,0.18)]">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="text-xs font-black uppercase tracking-[.22em] text-[#f0c979]">
              Connect with Edmund
            </div>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Start with a conversation.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-[#d7e2ee]">
              Whether you are reviewing existing coverage, planning for a new
              life stage, or simply want a clearer picture of your options, send
              a message and Edmund can continue the conversation directly with
              you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#d4ae68] px-5 py-3 font-black text-[#071827] transition hover:bg-[#e0ba7b]"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
              {contact.instagramUrl && (
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#34506b] bg-[#0d1d2d] px-5 py-3 font-bold text-white transition hover:border-[#d4ae68] hover:text-[#f0c979]"
                >
                  <Instagram size={18} /> Instagram
                </a>
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 text-neutral-900 md:p-8">
            <h3 className="text-xl font-black text-[#0d1b2a]">Send a WhatsApp enquiry</h3>
            <p className="mt-2 text-sm text-[#5d6c7f]">
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
