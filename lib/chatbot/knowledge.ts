import type { Locale } from "../i18n/config";
import { profile } from "../profile";

/**
 * The assistant's knowledge is STRICTLY the facts below — drawn from Yekzan KUS's
 * CV and his three recommendation letters. Two ways to answer:
 *
 *  1. `answerLocally()` — a zero-cost, offline intent matcher (default). Works
 *     forever with no API key, no billing, no external dependency.
 *  2. `buildSystemPrompt()` — an optional system prompt for an LLM (Anthropic),
 *     used only when ANTHROPIC_API_KEY is set. It is told never to invent.
 */

const FACTS = {
  identity: {
    fr: `Yekzan KUS est un développeur web full-stack basé à Limas (69), dans le Beaujolais (France). Il se forme en BTS SIO option SLAM (Solutions Logicielles et Applications Métiers) à la Business School by CSND, campus du Beaujolais (2025–2027). Il a joué du violon pendant 10 ans au Conservatoire de Villefranche.`,
    en: `Yekzan KUS is a full-stack web developer based in Limas (69), in the Beaujolais region of France. He is training in a BTS SIO, SLAM track (Software Solutions & Business Applications) at Business School by CSND, Beaujolais campus (2025–2027). He played the violin for 10 years at the Villefranche Conservatory.`,
  },
  skills: {
    fr: `Front-end : Angular, JavaScript, HTML, CSS. Back-end : PHP, Java (Spring Boot), Python, C (débutant). Base de données : MySQL. CMS & e-commerce : WordPress (Divi, Elementor), PrestaShop. Systèmes & virtualisation : Linux, Debian, Windows Server, VMware, FTP/FileZilla. Réseaux & ITSM : Cisco Packet Tracer, configuration de routeurs/switches, ITIL v3. SEO & data : SEO/référencement, Google Analytics, web scraping. Outils : VS Code, Visual Studio, PyCharm, CLion.`,
    en: `Front-end: Angular, JavaScript, HTML, CSS. Back-end: PHP, Java (Spring Boot), Python, C (beginner). Database: MySQL. CMS & e-commerce: WordPress (Divi, Elementor), PrestaShop. Systems & virtualization: Linux, Debian, Windows Server, VMware, FTP/FileZilla. Networking & ITSM: Cisco Packet Tracer, router/switch configuration, ITIL v3. SEO & data: SEO, Google Analytics, web scraping. Tools: VS Code, Visual Studio, PyCharm, CLion.`,
  },
  unimage: {
    fr: `Unimage Communication (mai–juin 2025, Gleizé) — Stage de développeur web. Il a développé en autonomie 2 sites web modernes avec de multiples intégrations, mis en place un chat interactif pour guider les visiteurs, créé une boutique e-commerce complète sous PrestaShop, et restauré/géré un site via FTP (FileZilla). Sa PDG, Iryna Gibert, le recommande pour son sérieux, sa curiosité et sa passion du développement web.`,
    en: `Unimage Communication (May–June 2025, Gleizé) — Web developer internship. He autonomously built 2 modern websites with multiple integrations, set up an interactive chat to guide visitors, created a complete PrestaShop e-commerce store, and restored/managed a website over FTP (FileZilla). The CEO, Iryna Gibert, recommends him for his seriousness, curiosity and passion for web development.`,
  },
  rougevert: {
    fr: `Rougevert Communication (mars–avril 2024, Villefranche-sur-Saône) — Stage de développeur/intégrateur web. Il a réalisé un site pour l'UNSA en 3 jours, développé un moteur de recherche en PHP, fait du développement PHP/CSS/JS sous WordPress, et suivi l'audience avec Google Analytics. Sophie Lefebvre (responsable pôle web) souligne qu'il est ponctuel, sérieux et impliqué.`,
    en: `Rougevert Communication (March–April 2024, Villefranche-sur-Saône) — Developer/web-integrator internship. He built a website for the UNSA in 3 days, developed a search engine in PHP, did PHP/CSS/JS development on WordPress, and tracked audience with Google Analytics. Sophie Lefebvre (web team manager) notes he is punctual, serious and committed.`,
  },
  martingale: {
    fr: `Martingale & Céleste (novembre–décembre 2023) — Stage de développeur. Il a développé rapidement un logiciel de web scraping en Python (démonstrable sur demande), maîtrisé l'environnement WordPress et appris le SEO, et participé au développement d'un site. Le dirigeant Bertrand Piégay le décrit comme très motivé, sérieux, créatif et force de proposition.`,
    en: `Martingale & Céleste (November–December 2023) — Developer internship. He rapidly built a web-scraping tool in Python (demoable on request), mastered the WordPress environment and learned SEO, and contributed to building a website. The director Bertrand Piégay describes him as highly motivated, serious, creative and full of ideas.`,
  },
  pharmagest: {
    fr: `Pharmagest (janvier–février 2023) — Stage. Il a découvert l'environnement Linux et appris à préparer des serveurs.`,
    en: `Pharmagest (January–February 2023) — Internship. He discovered the Linux environment and learned to prepare servers.`,
  },
  recommendations: {
    fr: `Yekzan dispose de 3 lettres de recommandation : Iryna Gibert (PDG, Unimage Communication) ; Bertrand Piégay (dirigeant, Martingale & Céleste) ; Sophie Lefebvre (responsable pôle web, Rougevert Communication). Toutes saluent son sérieux, sa motivation, sa capacité d'apprentissage rapide et son professionnalisme.`,
    en: `Yekzan has 3 recommendation letters: Iryna Gibert (CEO, Unimage Communication); Bertrand Piégay (director, Martingale & Céleste); Sophie Lefebvre (web team manager, Rougevert Communication). All praise his seriousness, motivation, fast learning and professionalism.`,
  },
  languages: {
    fr: `Français : langue maternelle. Anglais : niveau A2.`,
    en: `French: native. English: A2 level.`,
  },
  violin: {
    fr: `Yekzan a étudié le violon pendant 10 ans au Conservatoire de Villefranche — une discipline qui nourrit sa rigueur et son souci du détail dans le code.`,
    en: `Yekzan studied the violin for 10 years at the Villefranche Conservatory — a discipline that feeds his rigour and attention to detail in code.`,
  },
  contact: {
    fr: `Email : ${profile.email} · Téléphone : ${profile.phoneDisplay} · Localisation : ${profile.locationShort}.`,
    en: `Email: ${profile.email} · Phone: ${profile.phoneDisplay} · Location: ${profile.locationShort}.`,
  },
};

/* ------------------------------------------------------------------ */
/*  Optional LLM system prompt (used only when ANTHROPIC_API_KEY set)  */
/* ------------------------------------------------------------------ */

export function buildSystemPrompt(locale: Locale): string {
  const lang = locale === "fr" ? "français" : "English";
  const factSheet = (Object.keys(FACTS) as (keyof typeof FACTS)[])
    .map((k) => `- ${FACTS[k][locale]}`)
    .join("\n");

  return `You are the personal AI assistant embedded in the portfolio of Yekzan KUS, a full-stack web developer.

YOUR ONLY SOURCE OF TRUTH is the fact sheet below. It comes from his CV and three recommendation letters.

ABSOLUTE RULES:
- NEVER invent or assume any information that is not in the fact sheet. No fake projects, employers, dates, technologies, links or contact details.
- If asked something not covered, say honestly that the information isn't in his CV, and steer the visitor toward what you DO know (skills, experience, recommendations, contact).
- Always speak about Yekzan positively and professionally, like a sharp recruiter advocate — but stay strictly factual.
- Be concise (2–5 sentences). Warm, confident, human. Use light formatting only when helpful.
- Reply in ${lang} unless the visitor clearly writes in another language, then match their language.

FACT SHEET:
${factSheet}

Contact: ${FACTS.contact[locale]}`;
}

/* ------------------------------------------------------------------ */
/*  Zero-cost offline responder (default — no API key required)        */
/* ------------------------------------------------------------------ */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type Intent = { id: string; keywords: string[]; answer: Record<Locale, string> };

const intents: Intent[] = [
  {
    id: "greeting",
    keywords: ["bonjour", "salut", "hello", "hi", "hey", "coucou", "bonsoir", "yo"],
    answer: {
      fr: `Bonjour 👋 Je suis l'assistant de Yekzan. Je peux vous parler de ses compétences, de ses expériences (Unimage, Rougevert, Martingale & Céleste…), de ses recommandations ou de comment le contacter. Que souhaitez-vous savoir ?`,
      en: `Hi 👋 I'm Yekzan's assistant. I can tell you about his skills, his experience (Unimage, Rougevert, Martingale & Céleste…), his recommendations, or how to reach him. What would you like to know?`,
    },
  },
  {
    id: "skills",
    keywords: [
      "competence", "competences", "skill", "skills", "techno", "technologie", "technologies",
      "stack", "langage", "langages", "language", "languages", "code", "programmation",
      "framework", "outils", "tools", "savoir faire", "maitrise", "angular", "php", "python",
      "java", "javascript", "mysql", "wordpress", "prestashop", "linux", "cisco",
    ],
    answer: {
      fr: `Voici sa stack : ${FACTS.skills.fr}`,
      en: `Here's his stack: ${FACTS.skills.en}`,
    },
  },
  {
    id: "unimage",
    keywords: ["unimage", "prestashop", "ecommerce", "e commerce", "boutique", "chat interactif", "filezilla", "ftp"],
    answer: { fr: FACTS.unimage.fr, en: FACTS.unimage.en },
  },
  {
    id: "rougevert",
    keywords: ["rougevert", "rouge vert", "unsa", "moteur de recherche", "search engine", "google analytics", "analytics"],
    answer: { fr: FACTS.rougevert.fr, en: FACTS.rougevert.en },
  },
  {
    id: "martingale",
    keywords: ["martingale", "celeste", "céleste", "scraping", "scraper", "web scraping", "automatisation", "automation", "bertrand", "piegay"],
    answer: { fr: FACTS.martingale.fr, en: FACTS.martingale.en },
  },
  {
    id: "pharmagest",
    keywords: ["pharmagest", "serveur", "serveurs", "server", "servers", "systeme", "systemes", "linux debian"],
    answer: { fr: FACTS.pharmagest.fr, en: FACTS.pharmagest.en },
  },
  {
    id: "experience",
    keywords: [
      "experience", "experiences", "parcours", "stage", "stages", "internship", "work", "job",
      "emploi", "carriere", "background", "entreprise", "entreprises", "agence", "projets", "projet", "projects", "realisations",
    ],
    answer: {
      fr: `Yekzan a réalisé 4 stages : ${FACTS.unimage.fr}\n\n${FACTS.rougevert.fr}\n\n${FACTS.martingale.fr}\n\n${FACTS.pharmagest.fr}`,
      en: `Yekzan completed 4 internships: ${FACTS.unimage.en}\n\n${FACTS.rougevert.en}\n\n${FACTS.martingale.en}\n\n${FACTS.pharmagest.en}`,
    },
  },
  {
    id: "recommendations",
    keywords: [
      "recommandation", "recommandations", "recommendation", "recommendations", "reference", "references",
      "lettre", "lettres", "letter", "letters", "avis", "temoignage", "feedback", "gibert", "lefebvre",
    ],
    answer: { fr: FACTS.recommendations.fr, en: FACTS.recommendations.en },
  },
  {
    id: "education",
    keywords: [
      "formation", "etude", "etudes", "education", "study", "studies", "diplome", "bts", "sio", "slam",
      "ecole", "school", "csnd", "scolarite",
    ],
    answer: {
      fr: `Yekzan se forme en BTS SIO option SLAM (Solutions Logicielles et Applications Métiers) à la Business School by CSND, campus du Beaujolais, sur 2025–2027.`,
      en: `Yekzan is training in a BTS SIO, SLAM track (Software Solutions & Business Applications) at Business School by CSND, Beaujolais campus, over 2025–2027.`,
    },
  },
  {
    id: "languages",
    keywords: ["langue", "langues", "spoken", "anglais", "english", "francais", "french", "parle", "parler"],
    answer: { fr: FACTS.languages.fr, en: FACTS.languages.en },
  },
  {
    id: "violin",
    keywords: ["violon", "violin", "musique", "music", "conservatoire", "conservatory", "hobby", "loisir", "loisirs", "passion", "passions"],
    answer: { fr: FACTS.violin.fr, en: FACTS.violin.en },
  },
  {
    id: "contact",
    keywords: [
      "contact", "contacter", "reach", "email", "mail", "e mail", "telephone", "phone", "numero",
      "joindre", "ecrire", "appeler", "coordonnees", "localisation", "location", "ou habite", "where",
    ],
    answer: {
      fr: `Avec plaisir ! ${FACTS.contact.fr} Le bouton « Me contacter » en haut de page ouvre directement un email.`,
      en: `Happy to help! ${FACTS.contact.en} The "Get in touch" button at the top opens an email directly.`,
    },
  },
  {
    id: "availability",
    keywords: ["disponible", "disponibilite", "available", "availability", "recruter", "embaucher", "hire", "freelance", "mission", "collaboration", "travailler"],
    answer: {
      fr: `Yekzan est ouvert aux nouveaux projets et collaborations. Le plus simple est de le contacter par email à ${profile.email} ou au ${profile.phoneDisplay}.`,
      en: `Yekzan is open to new projects and collaborations. The easiest way is to reach him by email at ${profile.email} or at ${profile.phoneDisplay}.`,
    },
  },
  {
    id: "who",
    keywords: ["qui", "who", "presente", "presentation", "about", "propos", "yekzan", "kus", "profil", "profile", "parle moi de", "tell me about"],
    answer: { fr: FACTS.identity.fr, en: FACTS.identity.en },
  },
  {
    id: "thanks",
    keywords: ["merci", "thanks", "thank you", "thx", "super", "parfait", "great", "cool"],
    answer: {
      fr: `Avec plaisir ! N'hésitez pas si vous avez d'autres questions sur le profil de Yekzan. 🙂`,
      en: `You're welcome! Feel free to ask anything else about Yekzan's profile. 🙂`,
    },
  },
];

const DEFAULT_ANSWER: Record<Locale, string> = {
  fr: `Bonne question ! Je réponds uniquement à partir du CV et des recommandations de Yekzan. Je peux détailler : ses compétences techniques, ses expériences (Unimage, Rougevert, Martingale & Céleste, Pharmagest), ses recommandations, sa formation, ou ses coordonnées. Sur quoi puis-je préciser ?`,
  en: `Good question! I only answer from Yekzan's CV and recommendations. I can detail: his technical skills, his experience (Unimage, Rougevert, Martingale & Céleste, Pharmagest), his references, his education, or his contact details. What would you like me to expand on?`,
};

export function answerLocally(message: string, locale: Locale): string {
  const text = normalize(message);
  if (!text) return DEFAULT_ANSWER[locale];

  let best: { intent: Intent; score: number } | null = null;
  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      const k = normalize(kw);
      if (!k) continue;
      // word-boundary-ish match on the normalized text
      if (text === k || text.includes(` ${k} `) || text.startsWith(`${k} `) || text.endsWith(` ${k}`) || text.includes(k)) {
        score += k.includes(" ") ? 2 : 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }

  return best ? best.intent.answer[locale] : DEFAULT_ANSWER[locale];
}
