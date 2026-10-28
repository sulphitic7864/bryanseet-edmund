"use client";

import { FormEvent, useState } from "react";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function ContactForm() {
  const { content: siteContent } = useSiteContent();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const text =
      `Hi Bryan, I'm ${name || "visiting your website"}. ${message}`.trim();
    window.open(
      `https://wa.me/${siteContent.contact.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Your name"
        className="rounded-xl border border-neutral-300 bg-transparent px-4 py-3 outline-none focus:border-yellow-500 dark:border-neutral-700"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        placeholder="What would you like to discuss?"
        rows={5}
        className="rounded-xl border border-neutral-300 bg-transparent px-4 py-3 outline-none focus:border-yellow-500 dark:border-neutral-700"
      />
      <button className="rounded-xl bg-yellow-500 px-5 py-3 font-black text-black transition hover:bg-yellow-400">
        Continue on WhatsApp
      </button>
      <p className="text-xs leading-5 text-neutral-500">
        Submitting this form opens WhatsApp with your message pre-filled. No
        personal details are stored by this website.
      </p>
    </form>
  );
}
