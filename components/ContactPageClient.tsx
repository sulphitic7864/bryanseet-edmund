"use client";

import ContactForm from "@/components/ContactForm";
import { useSiteContent } from "@/components/SiteContentProvider";
import { Instagram, Mail, MessageCircle } from "lucide-react";

export default function ContactPageClient() {
  const { content } = useSiteContent();
  const { contact } = content;

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="text-xs font-black uppercase tracking-[.22em] text-yellow-600">Contact</div>
          <h1 className="mt-3 text-5xl font-black tracking-tight">Start a conversation with Bryan.</h1>
          <p className="mt-5 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Send a short message through WhatsApp or use Bryan&apos;s other contact channels below.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-black text-black">
              <MessageCircle size={18} /> WhatsApp
            </a>
            {contact.instagramUrl && (
              <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-bold dark:border-neutral-700">
                <Instagram size={18} /> Instagram
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-bold dark:border-neutral-700">
                <Mail size={18} /> Email
              </a>
            )}
          </div>
        </div>
        <div className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-800 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
