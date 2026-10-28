export type MediaItem = {
  type: "image" | "video";
  title: string;
  caption: string;
  src: string;
  poster?: string;
};

export type CredentialItem = {
  title: string;
  detail: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type AboutFeatureIcon =
  | "users"
  | "shield"
  | "award"
  | "sparkles"
  | "badge";

export type AboutFeatureItem = {
  icon: AboutFeatureIcon;
  title: string;
  text: string;
};

export type AboutSection = {
  eyebrow: string;
  title: string;
  features: AboutFeatureItem[];
};

export type TestimonialItem = {
  title: string;
  quote: string;
  name: string;
  role: string;
  image: string;
};

export type ContactInfo = {
  whatsappNumber: string;
  instagramUrl: string;
  email: string;
};

export type SiteContent = {
  name: string;
  role: string;
  masRep: string;
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  aboutSection: AboutSection;
  about: string[];
  stats: StatItem[];
  credentials: CredentialItem[];
  portrait: string;
  media: MediaItem[];
  testimonials: TestimonialItem[];
  contact: ContactInfo;
};

/**
 * This is the safe fallback/seed content only.
 * Admin credentials do NOT belong in this file. The admin user must be created
 * in Firebase Authentication (Email/Password provider).
 */
export const defaultSiteContent: SiteContent = {
  name: "Bryan Seet",
  role: "Prudential Wealth Manager",
  masRep: "SZY300733248",
  eyebrow: "Financial Planning • Protection • Long-Term Wealth",
  heroTitle: "Planning today for the life you want tomorrow.",
  heroText:
    "I help individuals and families make clearer financial decisions through thoughtful planning, protection strategies, and regular reviews built around real-life goals.",
  aboutSection: {
    eyebrow: "About Bryan",
    title: "Advice built around people, not pressure.",
    features: [
      {
        icon: "users",
        title: "Relationship-first",
        text: "Understand the person, goals, priorities and budget before discussing solutions.",
      },
      {
        icon: "shield",
        title: "Long-term reviews",
        text: "Planning is reviewed as circumstances change so recommendations remain relevant.",
      },
    ],
  },
  about: [
    "Financial planning should be a long-term, holistic process that evolves as life changes. My approach starts with understanding what matters to each client, then building practical recommendations around those priorities.",
    "Within my first full year in the industry, I qualified for Million Dollar Round Table (MDRT) recognition. Today, I support more than 100 clients and focus on building lasting relationships through clear explanations, responsive service, and consistent follow-up.",
  ],
  stats: [
    { value: "100+", label: "Clients supported" },
    { value: "2025", label: "MDRT qualifying year" },
    { value: "5", label: "Professional recognitions" },
  ],
  credentials: [
    {
      title: "Million Dollar Round Table (MDRT)",
      detail: "Qualifying Member • 2025",
    },
    { title: "Quality Club", detail: "2025 / 2026" },
    { title: "Quality Club Elite", detail: "2025 / 2026" },
    { title: "Star Club Qualifier", detail: "2025" },
    { title: "Top Rookie", detail: "Champion • 2025" },
  ],
  portrait: "/images/profile.jpeg",
  media: [
    {
      type: "image",
      title: "MDRT Recognition",
      caption: "Celebrating a meaningful professional milestone.",
      src: "https://static.wixstatic.com/media/49a1cd_abe1e6bad62348128bbbe191663ca0b4~mv2.jpeg/v1/fit/w_1237,h_432,q_90,enc_avif,quality_auto/49a1cd_abe1e6bad62348128bbbe191663ca0b4~mv2.jpeg",
    },
    {
      type: "image",
      title: "Star Club Gala",
      caption: "Professional recognition and industry event moments.",
      src: "https://static.wixstatic.com/media/49a1cd_55e967a5d1cd4b2ba57d8a6ceeed7231~mv2.jpeg/v1/fit/w_1237,h_432,q_90,enc_avif,quality_auto/49a1cd_55e967a5d1cd4b2ba57d8a6ceeed7231~mv2.jpeg",
    },
    {
      type: "image",
      title: "MDRT 2025",
      caption:
        "A milestone made possible by client trust and long-term relationships.",
      src: "https://static.wixstatic.com/media/49a1cd_2ea59900b27240ffabd640a7bd383689~mv2.jpeg/v1/fit/w_1237,h_432,q_90,enc_avif,quality_auto/49a1cd_2ea59900b27240ffabd640a7bd383689~mv2.jpeg",
    },
    {
      type: "image",
      title: "MDRT Global Conference",
      caption:
        "Learning, connecting, and bringing better perspectives back to clients.",
      src: "https://static.wixstatic.com/media/49a1cd_ccb3426f9596433c86e9c4dcfec787d6~mv2.jpeg/v1/fit/w_1237,h_432,q_90,enc_avif,quality_auto/49a1cd_ccb3426f9596433c86e9c4dcfec787d6~mv2.jpeg",
    },
  ],
  testimonials: [
    {
      title: "Informative and patient",
      quote:
        "Bryan took the time to explain how the plan worked and stayed patient throughout the process. I felt comfortable asking questions and would be happy to recommend him.",
      name: "Rifdi",
      role: "Visitor Management Agent",
      image:
        "https://static.wixstatic.com/media/49a1cd_cc0386ab46114e1f88eddd42d9c1a8e9~mv2.jpeg/v1/fill/w_447,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/49a1cd_cc0386ab46114e1f88eddd42d9c1a8e9~mv2.jpeg",
    },
    {
      title: "Approachable and responsive",
      quote:
        "What stood out was how clearly Bryan explained things and how responsive he was whenever I needed help. He made financial protection feel much easier to understand.",
      name: "Maricor & Maria",
      role: "IT Analysts",
      image:
        "https://static.wixstatic.com/media/49a1cd_836dfef6a0c9489990443b5f4f731c53~mv2.jpeg/v1/fill/w_447,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/49a1cd_836dfef6a0c9489990443b5f4f731c53~mv2.jpeg",
    },
    {
      title: "Customer-focused and genuine",
      quote:
        "Bryan listened carefully, explained the options without pressure, and followed up consistently. His professionalism and genuine concern gave us confidence in our decisions.",
      name: "Pauline & Anthony",
      role: "Business Owners",
      image:
        "https://static.wixstatic.com/media/49a1cd_bd59253a68f44ca09a2e4e1b26d6e3e7~mv2.jpeg/v1/fill/w_373,h_424,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/49a1cd_bd59253a68f44ca09a2e4e1b26d6e3e7~mv2.jpeg",
    },
    {
      title: "Dedicated and professional",
      quote:
        "Bryan focuses on understanding our needs rather than hard selling. He is sincere, reliable, thoughtful, and makes the effort to build a real relationship with his clients.",
      name: "Joo Li & Gordon",
      role: "Clients",
      image:
        "https://static.wixstatic.com/media/49a1cd_8a06da97f974419cb8dc154452e62af2~mv2.jpeg/v1/fill/w_373,h_424,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/49a1cd_8a06da97f974419cb8dc154452e62af2~mv2.jpeg",
    },
  ],
  contact: {
    whatsappNumber: "6597208319",
    instagramUrl: "",
    email: "",
  },
};

// Backwards-compatible export for any untouched utility code.
export const siteContent = defaultSiteContent;
