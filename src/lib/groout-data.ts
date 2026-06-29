/* =====================================================================
   GroOut content model — NO PRICING (quote-on-a-call model).
   All numbers/prices intentionally omitted; scope is quoted per project.
   ===================================================================== */

export type Pillar = {
  number: string;
  category: string;
  description: string;
  items: string[];
};

export const PILLARS: Pillar[] = [
  {
    number: "01",
    category: "Full Production Management",
    description: "End-to-end channel ownership. Producers, schedules, scripts, shoots and shipping, handled.",
    items: [
      "Done-for-you channel management",
      "Dedicated producer / project manager",
      "Faceless channel management",
      "Pre-production: scripting, scheduling, shot lists",
      "Live event / on-site production",
    ],
  },
  {
    number: "02",
    category: "Brand, Business & Startup Services",
    description: "Positioning, presence and launch firepower for founders building real categories.",
    items: [
      "Full social presence build",
      "Launch campaign content packages",
      "Founder personal brand support",
      "Influencer sourcing & collab management",
      "Pitch deck / investor deck design",
    ],
  },
  {
    number: "03",
    category: "Social Media Management",
    description: "Operators on your accounts: calendars, copy, comments, DMs and consistent output.",
    items: [
      "Full account management",
      "LinkedIn content & ghostwriting",
      "Community management",
      "WhatsApp Business catalog & broadcasts",
    ],
  },
  {
    number: "04",
    category: "Design & Visual Content",
    description: "Identity systems, scroll-stopping covers and the visual language that makes you recognisable.",
    items: [
      "YouTube thumbnails",
      "Instagram posters / carousels",
      "LinkedIn post graphics",
      "Catalog design",
      "Brand identity kit",
      "Channel art / banner / logo",
    ],
  },
  {
    number: "05",
    category: "Video Editing & Production",
    description: "Editors who cut for pace, story and platform. Long, short and live.",
    items: [
      "Long-form YouTube editing",
      "Short-form / Reels / Shorts editing",
      "Multi-camera editing",
      "Colour grading & sound design",
      "Live stream editing & highlights",
    ],
  },
  {
    number: "06",
    category: "Full Podcast Management",
    description: "From raw audio to a distributed show: edited, mastered, packaged and published.",
    items: [
      "Full podcast editing",
      "Audio mastering & mixing",
      "Cover art & episode thumbnails",
      "Show notes & descriptions",
      "Distribution to Spotify, Apple & more",
    ],
  },
  {
    number: "07",
    category: "Paid Ads Management",
    description: "Spend that compounds: creative, targeting and testing, operated weekly.",
    items: [
      "Paid ads management",
      "Ad creative production",
      "Boosting top-performing organic content",
      "A/B testing & campaign optimisation",
    ],
  },
  {
    number: "08",
    category: "Clipping & Repurposing",
    description: "One piece of content, ten distribution moments, engineered for every platform.",
    items: [
      "Long-form to short clips",
      "Long-to-short repurposing",
      "Multi-platform clip formatting",
      "Event reel packages",
      "AI-assisted reel edits",
    ],
  },
];

export const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

/* =====================================================================
   SITE CONFIG — ⚠️ PLACEHOLDER values. Replace with GroOut's real details.
   Wired into every CTA, the contact section and the footer.
   ===================================================================== */
export const SITE = {
  whatsappNumber: "910000000000", // ⚠️ real number, country code, digits only
  whatsappMessage: "Hi GroOut! I'd like to talk about a project.",
  phone: "+910000000000", // ⚠️ real phone
  email: "hello@groout.com", // ⚠️ real inbox (.com to match the live domain)
  city: "Bengaluru & Mumbai, India",
  instagram: "https://instagram.com/", // ⚠️ real links (leave "" to hide)
  linkedin: "https://linkedin.com/company/",
  youtube: "",
};

export const waLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg ?? SITE.whatsappMessage)}`;

/* ---- 3 service buckets (the 8 pillars, regrouped). Numbers map to PILLARS. ---- */
export const BUCKETS: { key: string; title: string; line: string; pillarNumbers: string[] }[] = [
  {
    key: "create",
    title: "Create",
    line: "Content that earns attention, edited and designed for the platform.",
    pillarNumbers: ["05", "04", "06"],
  },
  {
    key: "distribute",
    title: "Distribute",
    line: "Show up everywhere, consistently, with managed accounts and full production.",
    pillarNumbers: ["03", "08", "01"],
  },
  {
    key: "grow",
    title: "Grow",
    line: "Turn attention into results with paid amplification and brand building.",
    pillarNumbers: ["07", "02"],
  },
];

/* ---- Work showcase — ⚠️ PLACEHOLDER tiles. Drop in real reels/thumbnails. ---- */
export const WORK: { format: string; platform: string; tag: string }[] = [
  { format: "Reel", platform: "Instagram", tag: "Local café" },
  { format: "Thumbnail", platform: "YouTube", tag: "Education" },
  { format: "Podcast clip", platform: "Shorts", tag: "Founder show" },
  { format: "Ad creative", platform: "Meta", tag: "D2C brand" },
  { format: "Long-form edit", platform: "YouTube", tag: "Creator" },
  { format: "Carousel", platform: "LinkedIn", tag: "B2B" },
];

/* ---- Repurposing fan-out: one input, many outputs ---- */
export const REPURPOSE_OUT = ["Reels", "Shorts", "TikTok", "Carousels", "Quote cards", "Threads", "Ad cuts", "Email GIFs"];

/* ---- Buyer-facing 3-step ---- */
export const HOW_STEPS: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Brief", d: "Tell us your goals, drop your footage and references. We set up a shared board and a style guide for your brand." },
  { n: "02", t: "Build", d: "Our team edits, designs and produces. Queue as many requests as you like; revisions are built in." },
  { n: "03", t: "Grow", d: "Platform-ready content goes out on schedule. We track what works and sharpen every month." },
];

/* ---- The pipeline under the hood ---- */
export const PIPELINE: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Discover", d: "Brief, goals, platform, audience and current content." },
  { n: "02", t: "Plan", d: "Strategy, scripts, calendar, shot lists and design direction." },
  { n: "03", t: "Produce", d: "Editing, design, clipping, captions, thumbnails and reels." },
  { n: "04", t: "Distribute", d: "Posting, scheduling, formatting, community and ad launch." },
  { n: "05", t: "Grow", d: "Reporting, optimisation, renewals and scaling." },
];

/* ---- Ways to work together (no pricing) ---- */
export const WAYS: { name: string; tagline: string; audience: string; points: string[]; highlight?: boolean }[] = [
  {
    name: "Single project",
    tagline: "One outcome, done right",
    audience: "A launch video, a brand kit, an event reel.",
    points: ["Scoped to one clear outcome", "Defined timeline and deliverables", "Two free revisions"],
  },
  {
    name: "Monthly partner",
    tagline: "Your content engine",
    audience: "Creators and brands who need steady output.",
    points: ["Ongoing reels, edits and design", "Social management and repurposing", "Monthly planning and reporting"],
    highlight: true,
  },
  {
    name: "Full management",
    tagline: "Hand over the channel",
    audience: "When you want the whole thing run for you.",
    points: ["Dedicated producer and team", "Strategy, production and ads", "Priority turnaround"],
  },
];

/* ---- Two markets ---- */
export const MARKET_INDIA = [
  "Referral, direct DM and local network",
  "Fast, trust-led closing",
  "Month-to-month friendly",
  "Built on trust, speed and responsiveness",
];
export const MARKET_INTL = [
  "LinkedIn, content and case studies",
  "Proof-led closing",
  "Three to six month engagements",
  "Built on results, professionalism and time-zone coverage",
];

/* ---- Why GroOut / quality ---- */
export const QUALITY: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Two-stage QC", d: "Junior edit, senior review, then you." },
  { n: "02", t: "Your style guide", d: "Cut pace, captions, music mood, brand colours and references." },
  { n: "03", t: "Timelines you can plan around", d: "Clear turnaround for every engagement." },
  { n: "04", t: "Two free revisions", d: "Included on every deliverable." },
  { n: "05", t: "A trained team", d: "Editors learn your house style before live work." },
  { n: "06", t: "Monthly improvement loop", d: "Reports, feedback and optimisation, every month." },
];

/* ---- Testimonials — ⚠️ PLACEHOLDER. Replace with real quotes (name + @handle + business). ---- */
export const TESTIMONIALS: { quote: string; name: string; handle: string; business: string }[] = [
  {
    quote: "PLACEHOLDER. Add a real client quote here once you have one. Keep it specific and results-led.",
    name: "Client Name",
    handle: "@handle",
    business: "Business, Mumbai",
  },
  {
    quote: "PLACEHOLDER. A second real testimonial. Mention turnaround, consistency or a concrete result.",
    name: "Client Name",
    handle: "@handle",
    business: "Brand, Bengaluru",
  },
  {
    quote: "PLACEHOLDER. A third testimonial, ideally from an international client to show range.",
    name: "Client Name",
    handle: "@handle",
    business: "Creator, Global",
  },
];

/* ---- Tools & platforms we work across (honest trust strip, not endorsements) ---- */
export const PLATFORMS = [
  "YouTube",
  "Instagram",
  "Meta Ads",
  "LinkedIn",
  "Google Ads",
  "Spotify",
  "Apple Podcasts",
  "Premiere",
];

/* ---- Who we work with (marquee) ---- */
export const AUDIENCES = [
  "Creators", "Founders", "Startups", "D2C Brands", "Restaurants", "Cafés",
  "Clothing", "Salons", "Gyms", "Real Estate", "Events", "Local Business",
];

/* ---- FAQ ---- */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How does pricing work?",
    a: "Every project is scoped and quoted on a quick call, based on what you actually need. No rigid templates and no surprises.",
  },
  {
    q: "How fast is the turnaround?",
    a: "Most edits and designs ship within a couple of days. Larger productions get a clear timeline upfront, never a guess.",
  },
  {
    q: "Can I change or pause scope?",
    a: "Yes. Engagements are flexible and month-to-month. Scale up when you are busy and ease off when you are not.",
  },
  {
    q: "What if I do not like the first draft?",
    a: "Every deliverable includes two free revisions, and we build a style guide for your brand so the output gets sharper every month.",
  },
  {
    q: "Do you work with Indian and international clients?",
    a: "Yes, across India and worldwide. We adapt to your platform, audience and time zone.",
  },
  {
    q: "How do we get started?",
    a: "Book a call or send your brief. We set up a shared board, you drop your footage and requests, and the first draft follows quickly.",
  },
];
