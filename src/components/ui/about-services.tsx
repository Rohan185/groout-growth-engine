"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================================================
   EDITABLE CONTENT — change copy/numbers here, nothing is hard-coded twice.
   ============================================================================ */

// Stats cards. `variant` controls the asymmetric corner layout:
//   "a" = big number top-left, label bottom-right
//   "b" = label top-right,     big number bottom-left
const STATS: { number: string; label: string; variant: "a" | "b" }[] = [
  { number: "100%", label: "In-house crew", variant: "a" },
  { number: "48h", label: "Avg. turnaround", variant: "b" },
  { number: "10+", label: "Content formats", variant: "a" },
];

// Services list — add/remove freely; the "NN Services" counter updates itself.
// `items` = sub-services shown on hover. `gradient` = the work visual (swap for a real image URL later).
const SERVICES: { name: string; items: string[]; gradient: string; video?: string }[] = [
  {
    name: "Video Editing",
    items: ["Reels & shorts", "Long-form edits", "Colour & sound", "Subtitles & captions"],
    gradient: "linear-gradient(135deg, #0f2942, #0e7490)",
    video: "https://videos.pexels.com/video-files/7699548/7699548-sd_640_360_30fps.mp4",
  },
  {
    name: "Podcast Production",
    items: ["Multi-cam editing", "Audio cleanup", "Show notes", "Clips & promos"],
    gradient: "linear-gradient(135deg, #3b1764, #7c3aed)",
    video: "https://videos.pexels.com/video-files/7586494/7586494-sd_640_360_24fps.mp4",
  },
  {
    name: "Motion & Thumbnails",
    items: ["Logo animation", "Title cards", "Thumbnails", "Lower-thirds"],
    gradient: "linear-gradient(135deg, #7c2d12, #f59e0b)",
    video: "https://videos.pexels.com/video-files/9145177/9145177-sd_640_360_30fps.mp4",
  },
  {
    name: "Clipping & Repurposing",
    items: ["Podcast clips", "Reels from long-form", "Carousels", "Cross-posting"],
    gradient: "linear-gradient(135deg, #064e3b, #10b981)",
    video: "https://videos.pexels.com/video-files/10238038/10238038-sd_640_360_25fps.mp4",
  },
  {
    name: "Paid Ads",
    items: ["Ad creatives", "Hook variations", "UGC edits", "A/B testing"],
    gradient: "linear-gradient(135deg, #7f1d3a, #e11d48)",
    video: "https://videos.pexels.com/video-files/7947465/7947465-sd_640_360_30fps.mp4",
  },
];

// Headline — first part bright, second part muted/grey. Rendered word-by-word for the scroll reveal.
const ABOUT_HEADING_BRIGHT =
  "We’re one dedicated crew helping creators, founders and brands grow — through video, design, podcasts and paid distribution.";
const ABOUT_HEADING_MUTED = "The focus of our work is turning ideas into content that grows.";
const ABOUT_WORDS = [
  ...ABOUT_HEADING_BRIGHT.split(" ").map((w) => ({ w, muted: false })),
  ...ABOUT_HEADING_MUTED.split(" ").map((w) => ({ w, muted: true })),
];

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ============================================================================
   SECTION 1 — ABOUT + STATS
   ============================================================================ */
export function AboutStatsSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced()) return;

    const ctx = gsap.context(() => {
      // label fades in
      gsap.from(root.querySelectorAll("[data-about-label]"), {
        opacity: 0, y: 20, duration: 0.8, ease: "power3.out", clearProps: "all",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
      // headline reveals word-by-word (dim -> bright) as it scrolls through
      const head = root.querySelector("[data-about-head]");
      if (head) {
        gsap.fromTo(
          head.querySelectorAll("[data-word]"),
          { opacity: 0.28 },
          { opacity: 1, ease: "none", stagger: 0.3, scrollTrigger: { trigger: head, start: "top 85%", end: "top 38%", scrub: true } },
        );
      }
      // stat cards: each slides in WHILE STILL LIGHT, then visibly inverts light -> dark.
      // (Two-step per card so the white->dark flip is actually seen, not hidden behind the fade.)
      const stats = root.querySelector("[data-stats]");
      if (stats) {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stat-card]", stats);
        gsap.set(cards, { opacity: 0, xPercent: -24, backgroundColor: "#16181a", color: "#f4f3ee" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: stats, start: "top 88%", end: "top 32%", scrub: 1 },
        });
        cards.forEach((card, i) => {
          const at = i * 0.55;
          tl.to(card, { opacity: 1, xPercent: 0, ease: "power2.out", duration: 1 }, at)
            .to(card, { backgroundColor: "#ffffff", color: "#13180f", ease: "none", duration: 1.1 }, at + 0.55);
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="studio" className="w-full px-5 md:px-[70px]">
      {/* large rounded container (dark equivalent of Flowrix's light-grey card) */}
      <div className="rounded-[28px] border border-black/8 bg-[oklch(0.95_0.004_95)] px-5 py-9 md:rounded-[34px] md:px-[72px] md:pt-20 md:pb-[72px]">
        {/* top: label left, headline right */}
        <div className="grid gap-7 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <div data-about-label>
            <span className="inline-flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-grow opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-grow shadow-[0_0_12px_var(--grow)]" />
              </span>
              <span className="text-[16px] text-cream">About Us</span>
            </span>
          </div>
          <h2
            data-about-head
            className="font-display text-[clamp(1.45rem,2.3vw,2.1rem)] font-medium leading-[1.32] tracking-[-0.005em] text-cream"
          >
            {ABOUT_WORDS.map((x, i) => (
              <span key={i} data-word>
                {x.w}{" "}
              </span>
            ))}
          </h2>
        </div>

        {/* stats grid: 3 tall cards with asymmetric corner placement */}
        <div data-stats className="mt-[clamp(40px,6vw,72px)] grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              data-stat-card
              className="flex min-h-[240px] flex-col justify-between rounded-[18px] border border-black/8 bg-surface p-8 text-cream shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:min-h-[clamp(340px,30vw,400px)] md:p-[42px]"
            >
              {s.variant === "a" ? (
                <>
                  <div className="text-left text-[clamp(3.4rem,6vw,5.2rem)] font-extrabold leading-none tracking-[-0.04em]">
                    {s.number}
                  </div>
                  <div className="text-right text-[18px] opacity-80">{s.label}</div>
                </>
              ) : (
                <>
                  <div className="text-right text-[18px] opacity-80">{s.label}</div>
                  <div className="text-left text-[clamp(3.4rem,6vw,5.2rem)] font-extrabold leading-none tracking-[-0.04em]">
                    {s.number}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SECTION 2 — SERVICES (black panel that slides up underneath the About)
   ============================================================================ */
export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel || reduced()) return;

    const ctx = gsap.context(() => {
      // black panel slides up from below, scrub-linked to scroll
      gsap.fromTo(
        panel,
        { y: 80, opacity: 0.95 },
        {
          y: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: section, start: "top 85%", end: "top 55%", scrub: 0.6 },
        },
      );
      // header
      gsap.from(panel.querySelectorAll("[data-svc-title]"), {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out", clearProps: "all",
        scrollTrigger: { trigger: panel, start: "top 78%", once: true },
      });
      gsap.from(panel.querySelectorAll("[data-svc-count]"), {
        opacity: 0, x: 30, duration: 0.8, ease: "power3.out", clearProps: "all",
        scrollTrigger: { trigger: panel, start: "top 78%", once: true },
      });
      // rows + arrows
      const list = panel.querySelector("[data-svc-list]");
      gsap.from(panel.querySelectorAll("[data-svc-row]"), {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out", stagger: 0.08, clearProps: "all",
        scrollTrigger: { trigger: list, start: "top 85%", once: true },
      });
      gsap.from(panel.querySelectorAll("[data-svc-arrow]"), {
        scale: 0.8, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, clearProps: "all",
        scrollTrigger: { trigger: list, start: "top 85%", once: true },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="w-full px-5 pt-4 md:px-6 md:pt-6">
      <div
        ref={panelRef}
        className="overflow-hidden rounded-[28px] border border-black/8 bg-white px-[22px] py-10 shadow-[0_6px_40px_rgba(0,0,0,0.05)] md:rounded-[32px] md:px-14 md:pb-20 md:pt-[70px]"
      >
        {/* header: huge title left, dot + count right */}
        <div className="flex items-start justify-between gap-6">
          <h2
            data-svc-title
            className="font-display text-[clamp(3.2rem,8.5vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.01em] text-cream"
          >
            Services
          </h2>
          <span data-svc-count className="mt-1.5 inline-flex shrink-0 items-center gap-2.5 md:mt-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-grow opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-grow shadow-[0_0_12px_var(--grow)]" />
            </span>
            <span className="text-[16px] text-cream md:text-[18px]">
              {String(SERVICES.length).padStart(2, "0")} Services
            </span>
          </span>
        </div>

        {/* rows */}
        <div data-svc-list className="mt-[clamp(40px,6vw,72px)]">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.name} index={i + 1} name={s.name} items={s.items} gradient={s.gradient} video={s.video} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- single service row ----------------------------- */
function ServiceRow({ index, name, items, gradient, video }: { index: number; name: string; items: string[]; gradient: string; video?: string }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  return (
    <a
      href="#contact"
      data-svc-row
      onMouseEnter={() => vidRef.current?.play().catch(() => {})}
      onMouseLeave={() => vidRef.current?.pause()}
      className="group relative flex min-h-[88px] items-start gap-4 overflow-hidden border-b border-black/[0.12] py-7 transition-[min-height,border-color] duration-[450ms] ease-out hover:border-black/30 md:min-h-[124px] md:gap-6 md:py-9 md:hover:min-h-[268px]"
    >
      <span className="w-[60px] shrink-0 text-[16px] text-cream/45 md:mt-2 md:w-[140px]">({index})</span>

      {/* title with a roll-up swap on hover */}
      <span className="relative inline-block shrink-0 overflow-hidden font-display text-[clamp(1.6rem,2.9vw,2.6rem)] font-medium leading-[1.25] text-cream">
        <span className="block transition-transform duration-[500ms] ease-out group-hover:-translate-y-full">{name}</span>
        <span aria-hidden className="absolute inset-x-0 top-0 block translate-y-full transition-transform duration-[500ms] ease-out group-hover:translate-y-0">
          {name}
        </span>
      </span>

      {/* hover reveal (desktop): work video expands horizontally, top-aligned with the title; checklist fades in */}
      <div className="pointer-events-none absolute right-[96px] top-9 hidden items-center gap-6 md:flex">
        <div
          className="h-[clamp(150px,16vw,184px)] w-0 overflow-hidden rounded-xl transition-[width] duration-[550ms] ease-out group-hover:w-[clamp(230px,24vw,360px)]"
          style={{ background: gradient }}
        >
          {video ? (
            <video ref={vidRef} className="h-full w-full object-cover" muted loop playsInline preload="none">
              <source src={video} type="video/mp4" />
            </video>
          ) : null}
        </div>
        <ul className="shrink-0 space-y-2.5 opacity-0 transition-opacity duration-[400ms] ease-out group-hover:opacity-100">
          {items.map((it) => (
            <li key={it} className="flex items-center gap-2 whitespace-nowrap text-[14px] font-medium text-cream">
              <svg className="h-[17px] w-[17px] shrink-0 text-grow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="m8.5 12 2.4 2.4 4.6-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {it}
            </li>
          ))}
        </ul>
      </div>

      <span
        data-svc-arrow
        aria-hidden
        className="ml-auto grid size-[52px] shrink-0 place-items-center self-center rounded-full bg-[#16181a] text-white transition-colors duration-[350ms] ease-out group-hover:bg-grow group-hover:text-[#0a0a0a] md:size-[60px]"
      >
        <svg viewBox="0 0 24 24" className="size-6 md:size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </a>
  );
}
