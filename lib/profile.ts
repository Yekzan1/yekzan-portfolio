/**
 * SINGLE SOURCE OF TRUTH — factual, language-neutral profile data.
 *
 * Every value below is taken directly from Yekzan KUS's CV and the three
 * recommendation letters (Unimage Communication, Rougevert Communication,
 * Martingale & Céleste). Nothing here is invented. If a fact is not present
 * in those documents, it is not present here.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://yekzan-portfolio.vercel.app";

export const profile = {
  name: "Yekzan KUS",
  firstName: "Yekzan",
  lastName: "KUS",
  initials: "YK",

  email: "yekzankus@icloud.com",
  phoneDisplay: "07 85 26 68 22",
  phoneIntl: "+33785266822",

  locationShort: "Limas (69) · France",
  region: "Beaujolais",

  // The CV PDF is shipped in /public so the "Download CV" CTA works out of the box.
  cvPath: "/cv-yekzan-kus.pdf",

  // Public GitHub profile (this portfolio is open source there).
  socials: [
    { label: "GitHub", href: "https://github.com/Yekzan1", icon: "github" },
  ] as { label: string; href: string; icon: "github" | "linkedin" | "x" | "dribbble" }[],

  // Source repository for this site (open source).
  repoUrl: "https://github.com/Yekzan1/yekzan-portfolio",
} as const;

/** Conservative, defensible headline figures (each is directly verifiable from the CV/letters). */
export const stats = [
  { value: "3", labelKey: "recommendations" },
  { value: "4", labelKey: "internships" },
  { value: "6+", labelKey: "shipped" },
  { value: "15+", labelKey: "technologies" },
] as const;

/** Technology stack, grouped. Every item appears on the CV or in a letter. */
export const skillGroups = [
  {
    id: "frontend",
    items: ["Angular", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "backend",
    items: ["PHP", "Java", "Spring Boot", "Python", "C"],
  },
  {
    id: "data",
    items: ["MySQL"],
  },
  {
    id: "cms",
    items: ["WordPress", "Divi", "Elementor", "PrestaShop"],
  },
  {
    id: "systems",
    items: ["Linux", "Debian", "Windows Server", "VMware", "FTP / FileZilla"],
  },
  {
    id: "network",
    items: ["Cisco Packet Tracer", "Routing & Switching", "ITIL v3"],
  },
  {
    id: "seo",
    items: ["SEO", "Google Analytics", "Web Scraping"],
  },
  {
    id: "tools",
    items: ["VS Code", "Visual Studio", "PyCharm", "CLion"],
  },
] as const;

/** Marquee of signature technologies for the hero/skills ribbon. */
export const techRibbon = [
  "Angular",
  "JavaScript",
  "PHP",
  "Python",
  "Java · Spring Boot",
  "MySQL",
  "WordPress",
  "PrestaShop",
  "Elementor",
  "SEO",
  "Linux",
  "Cisco",
  "VMware",
  "Web Scraping",
];

/** Experience timeline. Company, dates and tech are factual; prose lives in the dictionaries. */
export const experiences = [
  {
    id: "unimage",
    company: "Unimage Communication",
    period: { start: "2025-05", end: "2025-06" },
    location: "Gleizé (69)",
    tech: ["PrestaShop", "WordPress", "FTP / FileZilla", "JavaScript", "PHP"],
    featured: true,
  },
  {
    id: "rougevert",
    company: "Rougevert Communication",
    period: { start: "2024-03", end: "2024-04" },
    location: "Villefranche-sur-Saône (69)",
    tech: ["PHP", "CSS", "JavaScript", "WordPress", "Google Analytics"],
    featured: true,
  },
  {
    id: "martingale",
    company: "Martingale & Céleste",
    period: { start: "2023-11", end: "2023-12" },
    location: "France",
    tech: ["Python", "Web Scraping", "WordPress", "SEO"],
    featured: true,
  },
  {
    id: "pharmagest",
    company: "Pharmagest",
    period: { start: "2023-01", end: "2023-02" },
    location: "France",
    tech: ["Linux", "Serveurs"],
    featured: false,
  },
  {
    id: "ikformation",
    company: "IK Formation",
    period: { start: "2022-02", end: "2022-04" },
    location: "France",
    tech: ["Systèmes", "Bureautique"],
    featured: false,
  },
] as const;

/** Recommendation letters — real signatories. Quotes are stored (translated) in the dictionaries. */
export const recommenders = [
  {
    id: "unimage",
    name: "Iryna Gibert",
    role: "PDG · Unimage Communication",
    initials: "IG",
    date: "2025-06-27",
  },
  {
    id: "martingale",
    name: "Bertrand Piégay",
    role: "Dirigeant · Martingale & Céleste",
    initials: "BP",
    date: "2023-12-22",
  },
  {
    id: "rougevert",
    name: "Sophie Lefebvre",
    role: "Responsable pôle web · Rougevert Communication",
    initials: "SL",
    date: "2024-04-12",
  },
] as const;

export type ExperienceId = (typeof experiences)[number]["id"];
export type RecommenderId = (typeof recommenders)[number]["id"];
