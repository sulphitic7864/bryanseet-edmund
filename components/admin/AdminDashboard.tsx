"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  Check,
  ExternalLink,
  Loader2,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import {
  defaultSiteContent,
  type AboutFeatureItem,
  type CredentialItem,
  type MediaItem,
  type SiteContent,
  type StatItem,
  type TestimonialItem,
} from "@/data/siteContent";
import { useSiteContent } from "@/components/SiteContentProvider";
import { auth } from "@/lib/firebase";
import { saveSiteContent } from "@/lib/siteRepository";
import { uploadSiteMedia } from "@/lib/uploadMedia";
import { useAdminSession } from "@/lib/useAdminSession";

const tabs = [
  ["general", "General"],
  ["about", "About"],
  ["stats", "Stats"],
  ["credentials", "Credentials"],
  ["media", "Media"],
  ["testimonials", "Testimonials"],
  ["contact", "Contact"],
] as const;

type TabId = (typeof tabs)[number][0];

function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

function Card({ title, text, children }: { title: string; text?: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-7">
      <div className="mb-6">
        <h2 className="text-xl font-black">{title}</h2>
        {text && <p className="mt-1 text-sm leading-6 text-neutral-500">{text}</p>}
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, placeholder = "", type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-neutral-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-yellow-500 dark:border-neutral-700 dark:bg-neutral-950"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4, placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; rows?: number; placeholder?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="resize-y rounded-xl border border-neutral-300 bg-white px-4 py-3 font-normal leading-6 outline-none transition focus:border-yellow-500 dark:border-neutral-700 dark:bg-neutral-950"
      />
    </label>
  );
}

function DeleteButton({ onClick, label = "Delete" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:border-red-950 dark:hover:bg-red-950/30"
    >
      <Trash2 size={16} /> {label}
    </button>
  );
}

function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
    >
      <Plus size={16} /> {children}
    </button>
  );
}

function FileUpload({ onUploaded, accept = "image/*", label = "Upload file" }: { onUploaded: (url: string) => void; accept?: string; label?: string }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file?: File) {
    if (!file) return;
    setError("");
    try {
      setUploading(true);
      const url = await uploadSiteMedia(file);
      onUploaded(url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-bold hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {uploading ? "Uploading…" : label}
        <input
          type="file"
          accept={accept}
          disabled={uploading}
          className="hidden"
          onChange={(event) => upload(event.target.files?.[0])}
        />
      </label>
      {error && <p className="text-xs leading-5 text-red-600">{error}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAdminSession();
  const { content, loading: contentLoading, existsInFirestore, firebaseConfigured, source, error: contentError } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(content));
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/admin/login");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!dirty) setDraft(cloneContent(content));
  }, [content, dirty]);

  const busy = authLoading || contentLoading;
  const statusText = useMemo(() => {
    if (!firebaseConfigured) return "Firebase not configured — local fallback";
    if (source === "error") return "Firestore connection error";
    if (source === "firestore") return "Live data source: Firestore";
    if (source === "loading") return "Loading Firestore…";
    return "Firestore is empty — local seed fallback";
  }, [firebaseConfigured, source]);

  function patch<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
    setNotice("");
  }

  function patchAboutSection<K extends keyof SiteContent["aboutSection"]>(
    key: K,
    value: SiteContent["aboutSection"][K],
  ) {
    setDraft((current) => ({
      ...current,
      aboutSection: { ...current.aboutSection, [key]: value },
    }));
    setDirty(true);
    setNotice("");
  }

  function patchContact(key: keyof SiteContent["contact"], value: string) {
    setDraft((current) => ({
      ...current,
      contact: { ...current.contact, [key]: value },
    }));
    setDirty(true);
    setNotice("");
  }

  async function save() {
    setError("");
    setNotice("");
    try {
      setSaving(true);
      await saveSiteContent(draft);
      setDirty(false);
      setNotice("Changes saved. The public website is now using the updated Firestore content.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save content.");
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    setDraft(cloneContent(content));
    setDirty(false);
    setError("");
    setNotice("Unsaved changes were discarded.");
  }

  async function logout() {
    if (auth) await signOut(auth);
    router.replace("/admin/login");
  }

  if (busy || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-neutral-950 text-white">
        <div className="flex items-center gap-3 font-bold"><Loader2 className="animate-spin" /> Loading admin dashboard…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/90">
        <div className="mx-auto flex max-w-[95rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-yellow-500 text-sm font-black text-black">BS</div>
            <div className="min-w-0">
              <div className="truncate font-black">Bryan Seet Admin</div>
              <div className="truncate text-xs text-neutral-500">{statusText}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="hidden items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-bold hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900 sm:inline-flex">
              View site <ExternalLink size={15} />
            </a>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-bold hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">
              <LogOut size={16} /> <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[95rem] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[15rem_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible">
            {tabs.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm font-bold transition ${activeTab === id ? "bg-neutral-900 text-white dark:bg-white dark:text-black" : "hover:bg-neutral-200 dark:hover:bg-neutral-900"}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 space-y-5">
          {!firebaseConfigured && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
              Firebase is not configured yet. Add the values from your Firebase Web App to <code>.env.local</code>. The dashboard is showing the local seed content until then.
            </div>
          )}
          {contentError && <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"><strong>Firestore error:</strong> {contentError}. Local seed data is not being substituted for this error.</div>}
          {firebaseConfigured && source === "fallback" && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200">
              No data exists in <code>site/content</code> yet, so the dashboard is using <code>data/siteContent.ts</code> as the initial fallback. Edit anything or click <strong>Create Firestore content</strong> below to save this data to Firestore. After that, Firestore becomes the only live content source.
            </div>
          )}
          {firebaseConfigured && source === "firestore" && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
              This dashboard is currently loaded from <strong>Firestore: site/content</strong>. Local seed content is not merged into these values.
            </div>
          )}
          {notice && <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"><Check size={17} /> {notice}</div>}
          {error && <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

          {activeTab === "general" && (
            <Card title="General profile" text="Main identity, hero copy, MAS representative number, and profile image.">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name" value={draft.name} onChange={(value) => patch("name", value)} />
                <Field label="Role" value={draft.role} onChange={(value) => patch("role", value)} />
                <Field label="MAS Rep No." value={draft.masRep} onChange={(value) => patch("masRep", value)} />
                <Field label="Hero eyebrow" value={draft.eyebrow} onChange={(value) => patch("eyebrow", value)} />
                <div className="md:col-span-2"><Field label="Hero title" value={draft.heroTitle} onChange={(value) => patch("heroTitle", value)} /></div>
                <div className="md:col-span-2"><TextArea label="Hero description" value={draft.heroText} onChange={(value) => patch("heroText", value)} /></div>
                <div className="md:col-span-2 grid gap-3">
                  <Field label="Portrait URL" value={draft.portrait} onChange={(value) => patch("portrait", value)} placeholder="https://... or /images/profile.jpeg" />
                  <FileUpload onUploaded={(url) => patch("portrait", url)} label="Upload portrait" />
                  {draft.portrait && <img src={draft.portrait} alt="Portrait preview" className="h-44 w-36 rounded-2xl object-cover" />}
                </div>
              </div>
            </Card>
          )}

          {activeTab === "about" && (
            <>
              <Card
                title="About section heading"
                text="These fields control the eyebrow and large heading shown on the left side of the About section."
              >
                <div className="grid gap-5">
                  {!draft.aboutSection.eyebrow &&
                    !draft.aboutSection.title &&
                    draft.aboutSection.features.length === 0 && (
                      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200">
                        Your existing Firestore document predates these About-section fields. Click <strong>Load current design defaults</strong>, then save once to create them in Firestore.
                      </div>
                    )}
                  <Field
                    label="Eyebrow"
                    value={draft.aboutSection.eyebrow}
                    onChange={(value) => patchAboutSection("eyebrow", value)}
                    placeholder="About Bryan"
                  />
                  <TextArea
                    label="Main heading"
                    value={draft.aboutSection.title}
                    onChange={(value) => patchAboutSection("title", value)}
                    rows={3}
                    placeholder="Advice built around people, not pressure."
                  />
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        patch(
                          "aboutSection",
                          cloneContent(defaultSiteContent).aboutSection,
                        )
                      }
                      className="rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-bold hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                      Load current design defaults
                    </button>
                  </div>
                </div>
              </Card>

              <Card
                title="About feature cards"
                text="Add, edit, or delete the cards shown beside the About heading. Every change is saved into Firestore."
              >
                <div className="grid gap-4">
                  {draft.aboutSection.features.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="grid gap-2 text-sm font-bold">
                          Icon
                          <select
                            value={item.icon}
                            onChange={(event) => {
                              const next: AboutFeatureItem[] = [
                                ...draft.aboutSection.features,
                              ];
                              next[index] = {
                                ...item,
                                icon: event.target
                                  .value as AboutFeatureItem["icon"],
                              };
                              patchAboutSection("features", next);
                            }}
                            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-yellow-500 dark:border-neutral-700 dark:bg-neutral-950"
                          >
                            <option value="users">People / relationship</option>
                            <option value="shield">Shield / protection</option>
                            <option value="award">Award</option>
                            <option value="sparkles">Sparkles</option>
                            <option value="badge">Badge check</option>
                          </select>
                        </label>
                        <Field
                          label="Card title"
                          value={item.title}
                          onChange={(value) => {
                            const next: AboutFeatureItem[] = [
                              ...draft.aboutSection.features,
                            ];
                            next[index] = { ...item, title: value };
                            patchAboutSection("features", next);
                          }}
                        />
                        <div className="md:col-span-2">
                          <TextArea
                            label="Card description"
                            value={item.text}
                            onChange={(value) => {
                              const next: AboutFeatureItem[] = [
                                ...draft.aboutSection.features,
                              ];
                              next[index] = { ...item, text: value };
                              patchAboutSection("features", next);
                            }}
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <DeleteButton
                          label="Delete card"
                          onClick={() =>
                            patchAboutSection(
                              "features",
                              draft.aboutSection.features.filter(
                                (_, itemIndex) => itemIndex !== index,
                              ),
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}

                  <AddButton
                    onClick={() =>
                      patchAboutSection("features", [
                        ...draft.aboutSection.features,
                        { icon: "sparkles", title: "", text: "" },
                      ])
                    }
                  >
                    Add feature card
                  </AddButton>
                </div>
              </Card>

              <Card
                title="About paragraphs"
                text="Optional body copy shown above the feature cards. Delete all paragraphs if you want the compact layout from the reference screenshot."
              >
                <div className="grid gap-4">
                  {draft.about.map((paragraph, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
                    >
                      <TextArea
                        label={`Paragraph ${index + 1}`}
                        value={paragraph}
                        onChange={(value) => {
                          const next = [...draft.about];
                          next[index] = value;
                          patch("about", next);
                        }}
                      />
                      <div className="mt-3">
                        <DeleteButton
                          onClick={() =>
                            patch(
                              "about",
                              draft.about.filter(
                                (_, itemIndex) => itemIndex !== index,
                              ),
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <AddButton
                    onClick={() => patch("about", [...draft.about, ""])}
                  >
                    Add paragraph
                  </AddButton>
                </div>
              </Card>
            </>
          )}

          {activeTab === "stats" && (
            <Card title="Statistics" text="These values can be shown anywhere you choose on the public site.">
              <div className="grid gap-4">
                {draft.stats.map((item, index) => (
                  <div key={index} className="grid gap-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800 md:grid-cols-[1fr_2fr_auto] md:items-end">
                    <Field label="Value" value={item.value} onChange={(value) => { const next: StatItem[] = [...draft.stats]; next[index] = { ...item, value }; patch("stats", next); }} />
                    <Field label="Label" value={item.label} onChange={(value) => { const next: StatItem[] = [...draft.stats]; next[index] = { ...item, label: value }; patch("stats", next); }} />
                    <DeleteButton onClick={() => patch("stats", draft.stats.filter((_, itemIndex) => itemIndex !== index))} />
                  </div>
                ))}
                <AddButton onClick={() => patch("stats", [...draft.stats, { value: "", label: "" }])}>Add statistic</AddButton>
              </div>
            </Card>
          )}

          {activeTab === "credentials" && (
            <Card title="Credentials" text="Manage professional awards, clubs, and qualifications.">
              <div className="grid gap-4">
                {draft.credentials.map((item, index) => (
                  <div key={index} className="grid gap-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800 md:grid-cols-2">
                    <Field label="Title" value={item.title} onChange={(value) => { const next: CredentialItem[] = [...draft.credentials]; next[index] = { ...item, title: value }; patch("credentials", next); }} />
                    <Field label="Detail" value={item.detail} onChange={(value) => { const next: CredentialItem[] = [...draft.credentials]; next[index] = { ...item, detail: value }; patch("credentials", next); }} />
                    <div className="md:col-span-2"><DeleteButton onClick={() => patch("credentials", draft.credentials.filter((_, itemIndex) => itemIndex !== index))} /></div>
                  </div>
                ))}
                <AddButton onClick={() => patch("credentials", [...draft.credentials, { title: "", detail: "" }])}>Add credential</AddButton>
              </div>
            </Card>
          )}

          {activeTab === "media" && (
            <Card title="Photos & videos" text="Use a URL, YouTube/Vimeo embed URL, or upload an image/video to Firebase Storage.">
              <div className="grid gap-5">
                {draft.media.map((item, index) => (
                  <div key={index} className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2 text-sm font-bold">Type
                        <select value={item.type} onChange={(event) => { const next: MediaItem[] = [...draft.media]; next[index] = { ...item, type: event.target.value as MediaItem["type"] }; patch("media", next); }} className="rounded-xl border border-neutral-300 bg-white px-4 py-3 font-normal outline-none dark:border-neutral-700 dark:bg-neutral-950">
                          <option value="image">Image</option><option value="video">Video</option>
                        </select>
                      </label>
                      <Field label="Title" value={item.title} onChange={(value) => { const next: MediaItem[] = [...draft.media]; next[index] = { ...item, title: value }; patch("media", next); }} />
                      <div className="md:col-span-2"><TextArea label="Caption" value={item.caption} onChange={(value) => { const next: MediaItem[] = [...draft.media]; next[index] = { ...item, caption: value }; patch("media", next); }} rows={3} /></div>
                      <div className="md:col-span-2"><Field label={item.type === "video" ? "Video/embed URL" : "Image URL"} value={item.src} onChange={(value) => { const next: MediaItem[] = [...draft.media]; next[index] = { ...item, src: value }; patch("media", next); }} /></div>
                      {item.type === "video" && <div className="md:col-span-2"><Field label="Poster image URL (optional)" value={item.poster || ""} onChange={(value) => { const next: MediaItem[] = [...draft.media]; next[index] = { ...item, poster: value }; patch("media", next); }} /></div>}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <FileUpload accept={item.type === "video" ? "video/*" : "image/*"} label={item.type === "video" ? "Upload video" : "Upload image"} onUploaded={(url) => { const next: MediaItem[] = [...draft.media]; next[index] = { ...item, src: url }; patch("media", next); }} />
                      <DeleteButton onClick={() => patch("media", draft.media.filter((_, itemIndex) => itemIndex !== index))} />
                    </div>
                    {item.src && item.type === "image" && <img src={item.src} alt="Media preview" className="mt-4 h-44 w-full max-w-sm rounded-2xl object-cover" />}
                  </div>
                ))}
                <AddButton onClick={() => patch("media", [...draft.media, { type: "image", title: "", caption: "", src: "" }])}>Add media</AddButton>
              </div>
            </Card>
          )}

          {activeTab === "testimonials" && (
            <Card title="Testimonials" text="Add client testimonials, roles, quotes, and photos.">
              <div className="grid gap-5">
                {draft.testimonials.map((item, index) => (
                  <div key={index} className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Heading" value={item.title} onChange={(value) => { const next: TestimonialItem[] = [...draft.testimonials]; next[index] = { ...item, title: value }; patch("testimonials", next); }} />
                      <Field label="Client name" value={item.name} onChange={(value) => { const next: TestimonialItem[] = [...draft.testimonials]; next[index] = { ...item, name: value }; patch("testimonials", next); }} />
                      <Field label="Client role" value={item.role} onChange={(value) => { const next: TestimonialItem[] = [...draft.testimonials]; next[index] = { ...item, role: value }; patch("testimonials", next); }} />
                      <Field label="Image URL" value={item.image} onChange={(value) => { const next: TestimonialItem[] = [...draft.testimonials]; next[index] = { ...item, image: value }; patch("testimonials", next); }} />
                      <div className="md:col-span-2"><TextArea label="Testimonial" value={item.quote} onChange={(value) => { const next: TestimonialItem[] = [...draft.testimonials]; next[index] = { ...item, quote: value }; patch("testimonials", next); }} /></div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <FileUpload label="Upload client photo" onUploaded={(url) => { const next: TestimonialItem[] = [...draft.testimonials]; next[index] = { ...item, image: url }; patch("testimonials", next); }} />
                      <DeleteButton onClick={() => patch("testimonials", draft.testimonials.filter((_, itemIndex) => itemIndex !== index))} />
                    </div>
                  </div>
                ))}
                <AddButton onClick={() => patch("testimonials", [...draft.testimonials, { title: "", quote: "", name: "", role: "", image: "" }])}>Add testimonial</AddButton>
              </div>
            </Card>
          )}

          {activeTab === "contact" && (
            <Card title="Contact details" text="These values power the public WhatsApp, Instagram, and email calls to action.">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="WhatsApp number" value={draft.contact.whatsappNumber} onChange={(value) => patchContact("whatsappNumber", value)} placeholder="6597208319" />
                <Field label="Email" value={draft.contact.email} onChange={(value) => patchContact("email", value)} type="email" />
                <div className="md:col-span-2"><Field label="Instagram URL" value={draft.contact.instagramUrl} onChange={(value) => patchContact("instagramUrl", value)} placeholder="https://instagram.com/..." /></div>
              </div>
            </Card>
          )}

          <div className="sticky bottom-4 z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white/95 p-3 shadow-xl backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95">
            <div className="text-sm text-neutral-500">{dirty ? "You have unsaved changes." : "Everything is saved."}</div>
            <div className="flex gap-2">
              <button type="button" onClick={reset} disabled={!dirty || saving} className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-bold disabled:opacity-40 dark:border-neutral-700"><RotateCcw size={16} /> Reset</button>
              <button type="button" onClick={save} disabled={(existsInFirestore && !dirty) || saving || !firebaseConfigured || source === "error"} className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-black text-black hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {saving ? "Saving…" : existsInFirestore ? "Save changes" : "Create Firestore content"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
