"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultSiteContent,
  type SiteContent,
} from "@/data/siteContent";
import { firebaseConfigured } from "@/lib/firebase";
import { subscribeToSiteContent } from "@/lib/siteRepository";

type ContentSource = "loading" | "firestore" | "fallback" | "error";

type SiteContentContextValue = {
  content: SiteContent;
  loading: boolean;
  existsInFirestore: boolean;
  firebaseConfigured: boolean;
  source: ContentSource;
  error: string;
};

// Neutral placeholder only. This is deliberately NOT defaultSiteContent so the
// local seed never flashes on screen before Firestore finishes loading.
const emptySiteContent: SiteContent = {
  name: "",
  role: "",
  masRep: "",
  eyebrow: "",
  heroTitle: "",
  heroText: "",
  aboutSection: {
    eyebrow: "",
    title: "",
    features: [],
  },
  about: [],
  stats: [],
  credentials: [],
  portrait: "",
  media: [],
  testimonials: [],
  contact: {
    whatsappNumber: "",
    instagramUrl: "",
    email: "",
  },
};

const SiteContentContext = createContext<SiteContentContextValue>({
  content: emptySiteContent,
  loading: true,
  existsInFirestore: false,
  firebaseConfigured,
  source: "loading",
  error: "",
});

export default function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(emptySiteContent);
  const [loading, setLoading] = useState(firebaseConfigured);
  const [existsInFirestore, setExistsInFirestore] = useState(false);
  const [source, setSource] = useState<ContentSource>(
    firebaseConfigured ? "loading" : "fallback",
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!firebaseConfigured) {
      setContent(defaultSiteContent);
      setExistsInFirestore(false);
      setSource("fallback");
      setLoading(false);
      return;
    }

    setLoading(true);
    setSource("loading");
    setError("");

    const unsubscribe = subscribeToSiteContent(
      (nextContent, exists) => {
        setContent(nextContent);
        setExistsInFirestore(exists);
        setSource(exists ? "firestore" : "fallback");
        setLoading(false);
        setError("");
      },
      (subscriptionError) => {
        setExistsInFirestore(false);
        setSource("error");
        setError(subscriptionError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      content,
      loading,
      existsInFirestore,
      firebaseConfigured,
      source,
      error,
    }),
    [content, loading, existsInFirestore, source, error],
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
