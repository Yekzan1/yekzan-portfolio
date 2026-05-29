/** Shape shared by every locale dictionary. `fr` is the canonical reference. */
export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogAlt: string;
  };
  nav: {
    about: string;
    skills: string;
    work: string;
    recommendations: string;
    contact: string;
    cta: string;
    menu: string;
    theme: string;
    language: string;
  };
  hero: {
    badge: string;
    availability: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    roles: string[];
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    statsLabels: {
      recommendations: string;
      internships: string;
      shipped: string;
      violin: string;
    };
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    signature: string;
    signatureSource: string;
    education: { label: string; degree: string; school: string; period: string };
    languages: { label: string; items: { name: string; level: string }[] };
    violin: { label: string; detail: string };
    cards: { title: string; body: string }[];
  };
  skills: {
    eyebrow: string;
    title: string;
    lead: string;
    groups: {
      frontend: string;
      backend: string;
      data: string;
      cms: string;
      systems: string;
      network: string;
      seo: string;
      tools: string;
    };
  };
  work: {
    eyebrow: string;
    title: string;
    lead: string;
    present: string;
    stageLabel: string;
    items: Record<
      "unimage" | "rougevert" | "martingale" | "pharmagest" | "ikformation",
      { role: string; summary: string; bullets: string[] }
    >;
  };
  recommendations: {
    eyebrow: string;
    title: string;
    lead: string;
    verified: string;
    quotes: Record<"unimage" | "martingale" | "rougevert", string>;
  };
  assistant: {
    eyebrow: string;
    title: string;
    lead: string;
    open: string;
    launcherLabel: string;
    headerTitle: string;
    headerSubtitle: string;
    online: string;
    inputPlaceholder: string;
    send: string;
    greeting: string;
    suggestionsTitle: string;
    suggestions: string[];
    disclaimer: string;
    thinking: string;
    error: string;
    reset: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    cta: string;
    copy: string;
    copied: string;
    downloadCv: string;
    availability: string;
  };
  footer: {
    tagline: string;
    builtWith: string;
    rights: string;
    backToTop: string;
    madeIn: string;
  };
  common: {
    skipToContent: string;
    loading: string;
  };
}
