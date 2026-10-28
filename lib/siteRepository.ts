import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  defaultSiteContent,
  type AboutFeatureIcon,
  type SiteContent,
} from "@/data/siteContent";

const COLLECTION = "site";
const DOCUMENT = "content";

function cleanForFirestore<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isAboutFeatureIcon(value: unknown): value is AboutFeatureIcon {
  return ["users", "shield", "award", "sparkles", "badge"].includes(
    String(value),
  );
}

/**
 * Firestore is the source of truth whenever the site/content document exists.
 *
 * IMPORTANT: Do not merge with defaultSiteContent here. Doing that makes local
 * seed values leak back into the live website whenever a Firestore field is
 * intentionally empty or missing.
 */
export function siteContentFromFirestore(value: unknown): SiteContent {
  const raw = (value && typeof value === "object" ? value : {}) as Partial<SiteContent>;

  return {
    name: typeof raw.name === "string" ? raw.name : "",
    role: typeof raw.role === "string" ? raw.role : "",
    masRep: typeof raw.masRep === "string" ? raw.masRep : "",
    eyebrow: typeof raw.eyebrow === "string" ? raw.eyebrow : "",
    heroTitle: typeof raw.heroTitle === "string" ? raw.heroTitle : "",
    heroText: typeof raw.heroText === "string" ? raw.heroText : "",
    aboutSection: {
      eyebrow:
        typeof raw.aboutSection?.eyebrow === "string"
          ? raw.aboutSection.eyebrow
          : "",
      title:
        typeof raw.aboutSection?.title === "string"
          ? raw.aboutSection.title
          : "",
      features: Array.isArray(raw.aboutSection?.features)
        ? raw.aboutSection.features.map((item) => ({
            icon: isAboutFeatureIcon(item?.icon) ? item.icon : "sparkles",
            title: typeof item?.title === "string" ? item.title : "",
            text: typeof item?.text === "string" ? item.text : "",
          }))
        : [],
    },
    about: Array.isArray(raw.about) ? raw.about : [],
    stats: Array.isArray(raw.stats) ? raw.stats : [],
    credentials: Array.isArray(raw.credentials) ? raw.credentials : [],
    portrait: typeof raw.portrait === "string" ? raw.portrait : "",
    media: Array.isArray(raw.media) ? raw.media : [],
    testimonials: Array.isArray(raw.testimonials) ? raw.testimonials : [],
    contact: {
      whatsappNumber:
        typeof raw.contact?.whatsappNumber === "string"
          ? raw.contact.whatsappNumber
          : "",
      instagramUrl:
        typeof raw.contact?.instagramUrl === "string"
          ? raw.contact.instagramUrl
          : "",
      email:
        typeof raw.contact?.email === "string" ? raw.contact.email : "",
    },
  };
}

function documentHasData(value: unknown): boolean {
  return Boolean(
    value &&
      typeof value === "object" &&
      Object.keys(value as Record<string, unknown>).length > 0,
  );
}

export function subscribeToSiteContent(
  onData: (content: SiteContent, existsInFirestore: boolean) => void,
  onError?: (error: Error) => void,
) {
  // If Firebase itself is not configured, there is no Firestore source to read.
  // In that development-only case, use the local seed so the site remains usable.
  if (!db) {
    onData(defaultSiteContent, false);
    return () => undefined;
  }

  return onSnapshot(
    doc(db, COLLECTION, DOCUMENT),
    (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : undefined;

      // Local seed is used ONLY when the Firestore document does not exist or
      // the document literally contains no fields.
      if (!snapshot.exists() || !documentHasData(data)) {
        onData(defaultSiteContent, false);
        return;
      }

      // Existing Firestore data is authoritative. No local-data merge.
      onData(siteContentFromFirestore(data), true);
    },
    (error) => {
      // Do NOT hide Firestore/auth/rules/network errors by replacing the live
      // content with local seed data. Surface the actual error instead.
      onError?.(error);
    },
  );
}

export async function saveSiteContent(content: SiteContent) {
  if (!db) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values to .env.local.",
    );
  }

  // setDoc intentionally writes the complete content document. This means
  // deleted items/cleared fields in the admin UI are also persisted correctly.
  await setDoc(doc(db, COLLECTION, DOCUMENT), cleanForFirestore(content));
}
