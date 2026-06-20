export type Service = {
  name: string;
  indiaPrice: string;
  intlPrice: string;
};

export type Pillar = {
  number: string;
  category: string;
  description: string;
  services: Service[];
};

export const PILLARS: Pillar[] = [
  {
    number: "01",
    category: "Full Production Management",
    description:
      "End-to-end channel ownership. Producers, schedules, scripts, shoots and shipping — handled.",
    services: [
      { name: "Done-for-you channel management", indiaPrice: "₹60K–1.5L / mo", intlPrice: "$1,500–5,000 / mo" },
      { name: "Dedicated producer / project manager", indiaPrice: "₹25K–50K / mo", intlPrice: "$1,200–3,000 / mo" },
      { name: "Faceless channel management", indiaPrice: "₹40K–1L / mo", intlPrice: "$1,200–4,000 / mo" },
      { name: "Pre-production: scripting, scheduling, shot lists", indiaPrice: "₹10K–25K / mo", intlPrice: "$600–2,000 / mo" },
      { name: "Live event / on-site production", indiaPrice: "₹15K–50K / event", intlPrice: "Local partner required" },
    ],
  },
  {
    number: "02",
    category: "Brand, Business & Startup Services",
    description:
      "Positioning, presence and launch firepower for founders building real categories.",
    services: [
      { name: "Full social presence build", indiaPrice: "₹25K–75K / mo", intlPrice: "$1,500–6,000 / mo" },
      { name: "Launch campaign content packages", indiaPrice: "₹30K–90K", intlPrice: "$2,000–8,000" },
      { name: "Founder personal brand support", indiaPrice: "₹20K–50K / mo", intlPrice: "$1,500–6,000 / mo" },
      { name: "Influencer sourcing & collab management", indiaPrice: "₹15K–35K / mo", intlPrice: "$1,000–4,000 / mo" },
      { name: "Pitch deck / investor deck design", indiaPrice: "₹10K–25K", intlPrice: "$500–2,000" },
    ],
  },
  {
    number: "03",
    category: "Social Media Management",
    description:
      "Operators on your accounts — calendars, copy, comments, DMs, and consistent output.",
    services: [
      { name: "Full account management", indiaPrice: "₹15K–40K / mo", intlPrice: "$1,000–5,000 / mo" },
      { name: "LinkedIn content & ghostwriting", indiaPrice: "₹20K–50K / mo", intlPrice: "$2,000–10,000 / mo" },
      { name: "Community management", indiaPrice: "₹8K–20K / mo", intlPrice: "$500–2,000 / mo" },
      { name: "WhatsApp Business catalog & broadcasts", indiaPrice: "₹5K–12K / mo", intlPrice: "$300–800 / mo" },
    ],
  },
  {
    number: "04",
    category: "Design & Visual Content",
    description:
      "Identity systems, scroll-stopping covers, and the visual language that makes you recognisable.",
    services: [
      { name: "YouTube thumbnails", indiaPrice: "₹500–2K each", intlPrice: "$25–100 each" },
      { name: "Instagram posters / carousels", indiaPrice: "₹500–1.5K each", intlPrice: "$20–80 each" },
      { name: "LinkedIn poster & post graphics", indiaPrice: "₹500–1.2K each", intlPrice: "$20–60 each" },
      { name: "Catalog design", indiaPrice: "₹5K–15K each", intlPrice: "$300–1,200 each" },
      { name: "Brand identity kit", indiaPrice: "₹15K–30K", intlPrice: "$1,500–5,000" },
      { name: "Channel art / banner / logo", indiaPrice: "₹5K–12K", intlPrice: "$300–1,000" },
      { name: "Email signature & stationery design", indiaPrice: "₹2K–5K", intlPrice: "$100–300" },
    ],
  },
  {
    number: "05",
    category: "Video Editing & Production",
    description:
      "Editors who cut for pace, story and platform — long, short and live.",
    services: [
      { name: "Long-form YouTube editing", indiaPrice: "₹15K–35K / mo", intlPrice: "$700–1,500 / mo" },
      { name: "Short-form / Reels / Shorts editing", indiaPrice: "₹8K–20K / mo", intlPrice: "$700–2,500 / mo" },
      { name: "Multi-camera editing", indiaPrice: "₹20K–40K / mo", intlPrice: "$1,000–3,500 / mo" },
      { name: "Colour grading & sound design", indiaPrice: "₹8K–18K / mo", intlPrice: "$400–1,500 / mo" },
      { name: "Live stream editing & highlights", indiaPrice: "₹10K–25K / mo", intlPrice: "$600–2,000 / mo" },
    ],
  },
  {
    number: "06",
    category: "Full Podcast Management",
    description:
      "From raw audio to a distributed show — edited, mastered, packaged and published.",
    services: [
      { name: "Full podcast editing", indiaPrice: "₹20K–40K / mo", intlPrice: "$1,000–3,500 / mo" },
      { name: "Audio mastering & mixing", indiaPrice: "₹5K–10K / ep", intlPrice: "$100–300 / ep" },
      { name: "Podcast cover art & episode thumbnails", indiaPrice: "₹3K–8K / mo", intlPrice: "$150–500 / mo" },
      { name: "Show notes & episode descriptions", indiaPrice: "₹3K–6K / mo", intlPrice: "$150–400 / mo" },
      { name: "Distribution to Spotify, Apple & platforms", indiaPrice: "₹3K–5K / mo", intlPrice: "$150–400 / mo" },
    ],
  },
  {
    number: "07",
    category: "Paid Ads Management for Creators",
    description:
      "Spend that compounds — creative, targeting and testing operated weekly.",
    services: [
      { name: "Paid ads management", indiaPrice: "₹20K–60K / mo", intlPrice: "$1,500–8,000 / mo" },
      { name: "Ad creative production", indiaPrice: "₹10K–25K / mo", intlPrice: "$600–2,500 / mo" },
      { name: "Boosting top-performing organic content", indiaPrice: "₹5K–15K / mo + spend", intlPrice: "$300–1,500 / mo + spend" },
      { name: "A/B testing & campaign optimisation", indiaPrice: "₹8K–15K / mo", intlPrice: "$500–1,500 / mo" },
    ],
  },
  {
    number: "08",
    category: "Clipping & Repurposing",
    description:
      "One piece of content, ten distribution moments — engineered for every platform.",
    services: [
      { name: "Podcast / long-form to short clips", indiaPrice: "₹10K–25K / mo", intlPrice: "$800–3,000 / mo" },
      { name: "Per-clip ad-hoc pricing", indiaPrice: "₹300–800 / clip", intlPrice: "$15–50 / clip" },
      { name: "Long-to-short repurposing", indiaPrice: "₹6K–15K / mo", intlPrice: "$400–1,200 / mo" },
      { name: "Multi-platform clip formatting", indiaPrice: "₹2K–5K / mo add-on", intlPrice: "$100–300 / mo add-on" },
      { name: "Event reel package", indiaPrice: "₹5K–15K / event", intlPrice: "$250–600 / event" },
      { name: "Local business monthly reel package", indiaPrice: "₹8K–20K / mo", intlPrice: "$400–1,200 / mo" },
      { name: "Single AI-assisted reel edit", indiaPrice: "₹800–2K / reel", intlPrice: "$40–100 / reel" },
    ],
  },
];

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Work Flow" },
  { href: "#pricing", label: "Pricing" },
  { href: "#quality", label: "Quality" },
  { href: "#contact", label: "Contact" },
];
