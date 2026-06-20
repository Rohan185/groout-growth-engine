import { useEffect, useRef, useState, type ReactNode } from "react";
import logoBlackAsset from "@/assets/groout-black.png.asset.json";
import logoWhiteAsset from "@/assets/groout-white.png.asset.json";

export const LOGO_BLACK = logoBlackAsset.url;
export const LOGO_WHITE = logoWhiteAsset.url;

/* -------------------- Primitives -------------------- */

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function ArrowUp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${dark ? "text-fog" : "text-foreground/60"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-grow" />
      {children}
    </div>
  );
}

/* -------------------- Nav -------------------- */

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#process", label: "Work Flow" },
    { href: "#pricing", label: "Pricing" },
    { href: "#quality", label: "Quality" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line-dark bg-ink-deep/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#top" className="flex items-center gap-2">
          <img src={LOGO_WHITE} alt="GroOut" className="h-7 w-auto md:h-8" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-paper/75 transition-colors hover:text-paper">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full bg-grow px-5 py-2.5 text-sm font-medium text-paper transition-all hover:brightness-110 md:inline-flex"
          >
            Book a Free Strategy Call
            <ArrowUp className="arrow-rise h-3.5 w-3.5" />
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-dark text-paper lg:hidden"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 17h16" /></>}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-line-dark bg-ink-deep lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-sm text-paper/80 hover:bg-white/5">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-grow px-5 py-3 text-sm font-medium text-paper">
              Book a Free Strategy Call <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------- Hero -------------------- */

export function Hero() {
  const pills = [
    "8 Service Pillars",
    "India & International Clients",
    "Content + Design + Ads",
    "Built for Growth",
  ];
  return (
    <section id="top" className="relative overflow-hidden bg-ink-deep text-paper">
      <div className="absolute inset-0 grid-noise opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--grow), transparent 70%)" }}
        aria-hidden
      />
      {/* Giant arrow watermark */}
      <ArrowUp className="pointer-events-none absolute -right-10 bottom-10 h-[280px] w-[280px] text-grow/10 md:right-10 md:h-[420px] md:w-[420px]" />

      <div className="container-x relative pt-32 pb-20 md:pt-44 md:pb-32">
        <Reveal>
          <SectionLabel dark>Creative Growth Agency · Est. Mumbai</SectionLabel>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display mt-6 text-balance text-[44px] font-bold leading-[1.02] tracking-[-0.025em] md:text-[88px]">
            Content, Design &amp; Growth Systems for{" "}
            <span className="relative inline-block">
              <span className="text-grow">Brands Ready</span>
            </span>{" "}
            to Scale.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-pretty text-base text-paper/70 md:text-lg">
            GroOut helps creators, founders, startups and businesses turn ideas into consistent
            content, stronger branding, better distribution and measurable growth.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-grow px-6 py-3.5 text-sm font-medium text-paper transition-all hover:brightness-110"
            >
              Book a Free Strategy Call
              <ArrowUp className="arrow-rise h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-line-dark bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-white/[0.07]"
            >
              Explore Services
            </a>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-10 flex flex-wrap gap-2">
            {pills.map((p) => (
              <span
                key={p}
                className="rounded-full border border-line-dark bg-white/[0.03] px-3.5 py-1.5 text-xs text-paper/70"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Content dashboard mock */}
        <Reveal delay={360} className="mt-16 md:mt-24">
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  );
}

function HeroDashboard() {
  const cards: { tag: string; title: string; metric: string; trend: string }[] = [
    { tag: "Reels", title: "Daily Cuts · IG + Shorts", metric: "12 / wk", trend: "+38%" },
    { tag: "Podcast Clips", title: "Founder Show · S2", metric: "48 clips", trend: "+22%" },
    { tag: "Social Posts", title: "LinkedIn + X calendar", metric: "20 / wk", trend: "+14%" },
    { tag: "Ad Creatives", title: "Meta · Performance set", metric: "9 variants", trend: "+61%" },
    { tag: "Brand Design", title: "Identity refresh kit", metric: "v2.1", trend: "shipped" },
    { tag: "Growth Reports", title: "Monthly review", metric: "Jun '26", trend: "on track" },
  ];
  return (
    <div className="relative rounded-3xl border border-line-dark bg-white/[0.025] p-3 shadow-soft backdrop-blur md:p-5">
      <div className="mb-4 flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
          groout / pipeline · live
        </span>
        <span className="font-mono text-[10px] text-grow">● active</span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.tag}
            className="group rounded-2xl border border-line-dark bg-ink p-5 transition-colors hover:border-grow/50"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-grow/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-grow">
                {c.tag}
              </span>
              <ArrowUp className="arrow-rise h-3.5 w-3.5 text-paper/40 group-hover:text-grow" />
            </div>
            <div className="mt-6 text-sm text-paper/80">{c.title}</div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className="font-display text-2xl font-semibold text-paper">{c.metric}</div>
              <div className="font-mono text-[11px] text-grow">{c.trend}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Logo marquee -------------------- */

export function Marquee() {
  const items = [
    "Creators", "Founders", "Startups", "D2C Brands", "Restaurants", "Cafés",
    "Clothing", "Salons", "Gyms", "Real Estate", "Events", "Local Business",
  ];
  return (
    <div className="border-y border-line-dark bg-ink-deep py-5 text-paper">
      <div className="relative overflow-hidden">
        <div className="marquee flex w-max gap-12 whitespace-nowrap">
          {[...items, ...items].map((it, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="font-display text-lg text-paper/60">{it}</span>
              <ArrowUp className="h-4 w-4 text-grow" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------- About -------------------- */

export function About() {
  const cards = [
    { tag: "01", title: "Create", body: "Video editing, design, podcasts, reels and brand assets." },
    { tag: "02", title: "Distribute", body: "Social media management, scheduling, posting, community and platform formatting." },
    { tag: "03", title: "Grow", body: "Paid ads, optimisation, reporting and monthly growth systems." },
  ];
  return (
    <section id="about" className="bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><SectionLabel>About GroOut</SectionLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
                Rooted in Mumbai. Built to <span className="text-grow">Grow Out</span> Worldwide.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <p className="text-pretty text-lg leading-relaxed text-foreground/70">
                GroOut is built for businesses that need more than just editing. We bring together
                content planning, production, design, social media, paid ads, podcast management and
                repurposing under one growth-focused system — operated by a team, reviewed for
                quality and reported every month.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="group h-full rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-grow/50 hover:shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground/50">{c.tag}</span>
                  <ArrowUp className="arrow-rise h-4 w-4 text-foreground/30 group-hover:text-grow" />
                </div>
                <h3 className="font-display mt-8 text-3xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-foreground/65">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Process -------------------- */

export function Process() {
  const steps = [
    { n: "01", t: "Discover", d: "Brief, goals, platform, audience and current content." },
    { n: "02", t: "Plan", d: "Strategy, scripts, content calendar, shot lists and design direction." },
    { n: "03", t: "Produce", d: "Editing, design, clipping, captions, thumbnails, podcasts and reels." },
    { n: "04", t: "Distribute", d: "Posting, scheduling, formatting, community management and ad launch." },
    { n: "05", t: "Grow", d: "Reporting, optimisation, campaign improvement, renewals and scaling." },
  ];
  return (
    <section id="process" className="relative overflow-hidden bg-ink text-paper py-24 md:py-32">
      <div className="absolute inset-0 grid-noise opacity-50" aria-hidden />
      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal><SectionLabel dark>Work Flow</SectionLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
                One Clear Pipeline. <span className="text-grow">Every Project.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-sm text-paper/65">
              Every project moves through a repeatable system — so quality does not depend on
              guesswork.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line-dark bg-line-dark md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} className="bg-ink">
              <div className="group h-full p-7 transition-colors hover:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-grow">STEP {s.n}</span>
                  <ArrowUp className="arrow-rise h-4 w-4 text-paper/30 group-hover:text-grow" />
                </div>
                <h3 className="font-display mt-10 text-2xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-paper/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Services -------------------- */

import { PILLARS } from "@/lib/groout-data";

export function Services() {
  const [open, setOpen] = useState<string | null>(PILLARS[0].number);
  return (
    <section id="services" className="bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal><SectionLabel>Services</SectionLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
                Full-Service Creative <span className="text-grow">Growth Stack</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="lg:col-span-5">
            <p className="text-pretty text-lg text-foreground/65">
              From one reel to complete channel management, GroOut gives brands the creative engine
              they need to stay consistent.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-3">
          {PILLARS.map((p, i) => {
            const isOpen = open === p.number;
            return (
              <Reveal key={p.number} delay={i * 40}>
                <div
                  className={`overflow-hidden rounded-3xl border bg-card transition-all ${
                    isOpen ? "border-grow/40 shadow-soft" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : p.number)}
                    className="flex w-full items-center gap-5 px-6 py-6 text-left md:px-8 md:py-7"
                  >
                    <span className="font-mono text-xs text-foreground/50 md:w-10">{p.number}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display truncate text-lg font-semibold tracking-tight md:text-2xl">
                        {p.category}
                      </h3>
                      <p className="mt-1 hidden text-sm text-foreground/60 md:block">{p.description}</p>
                    </div>
                    <span className={`shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all ${isOpen ? "bg-grow text-paper border-grow rotate-45" : "text-foreground"}`}>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-border px-6 pb-8 pt-2 md:px-8">
                      <p className="mb-6 text-foreground/65 md:hidden">{p.description}</p>
                      <div className="overflow-hidden rounded-2xl border border-border">
                        <div className="hidden grid-cols-12 gap-4 bg-secondary px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-foreground/55 md:grid">
                          <div className="col-span-6">Service</div>
                          <div className="col-span-3">India</div>
                          <div className="col-span-3">International</div>
                        </div>
                        <ul className="divide-y divide-border">
                          {p.services.map((s) => (
                            <li key={s.name} className="grid grid-cols-1 gap-2 px-5 py-4 md:grid-cols-12 md:items-center md:gap-4">
                              <div className="font-medium md:col-span-6">{s.name}</div>
                              <div className="md:col-span-3">
                                <div className="md:hidden font-mono text-[10px] uppercase tracking-widest text-foreground/50">India</div>
                                <div className="font-mono text-sm">{s.indiaPrice}</div>
                              </div>
                              <div className="md:col-span-3">
                                <div className="md:hidden font-mono text-[10px] uppercase tracking-widest text-foreground/50">International</div>
                                <div className="font-mono text-sm text-grow">{s.intlPrice}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <a
                          href="#contact"
                          className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
                        >
                          Enquire Now
                          <ArrowUp className="arrow-rise h-3.5 w-3.5 text-grow" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Featured Offer -------------------- */

export function Featured() {
  const ideal = ["Restaurants", "Cafés", "Clothing stores", "Salons", "Gyms", "Real estate", "Events", "Creators", "Local businesses"];
  return (
    <section className="bg-paper pb-24 md:pb-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-deep p-8 text-paper md:p-14">
            <div className="absolute inset-0 grid-noise opacity-40" aria-hidden />
            <ArrowUp className="pointer-events-none absolute -right-6 -top-6 h-56 w-56 text-grow/15 md:h-80 md:w-80" />
            <div className="relative grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <SectionLabel dark>Featured · AI-Assisted Reel Editing</SectionLabel>
                <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">
                  Your Raw Footage. Our Creative System. <span className="text-grow">Ready-to-Post Reels.</span>
                </h2>
                <p className="mt-5 max-w-xl text-paper/70">
                  Send us clips from your phone, event, shop, product, podcast or business. GroOut
                  turns raw content into polished reels with AI-assisted cuts, captions, music sync
                  and platform-ready formatting.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {ideal.map((i) => (
                    <span key={i} className="rounded-full border border-line-dark bg-white/[0.04] px-3 py-1.5 text-xs text-paper/70">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-line-dark bg-white/[0.03] p-6">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-grow">Single Reel</div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-paper/50">India</div>
                        <div className="font-display mt-1 text-xl font-semibold">₹800–2K <span className="text-sm font-normal text-paper/50">/ reel</span></div>
                      </div>
                      <div>
                        <div className="text-xs text-paper/50">International</div>
                        <div className="font-display mt-1 text-xl font-semibold">$40–100 <span className="text-sm font-normal text-paper/50">/ reel</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-line-dark bg-white/[0.03] p-6">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-grow">Local Business · Monthly</div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-paper/50">India</div>
                        <div className="font-display mt-1 text-xl font-semibold">₹8K–20K <span className="text-sm font-normal text-paper/50">/ mo</span></div>
                      </div>
                      <div>
                        <div className="text-xs text-paper/50">International</div>
                        <div className="font-display mt-1 text-xl font-semibold">$400–1,200 <span className="text-sm font-normal text-paper/50">/ mo</span></div>
                      </div>
                    </div>
                  </div>
                  <a href="#contact" className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-grow px-5 py-3 text-sm font-medium text-paper transition hover:brightness-110">
                    Start with a Reel Pack
                    <ArrowUp className="arrow-rise h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- Markets (India vs International) -------------------- */

export function Markets() {
  const india = [
    "Referral, direct DM, local network",
    "Fast trust-led closing",
    "Pricing in ₹",
    "Month-to-month common",
    "Wins through trust, speed and responsiveness",
  ];
  const intl = [
    "LinkedIn outreach, content, case studies",
    "Proof-led closing",
    "Pricing in $",
    "3–6 month commitment preferred",
    "Wins through case studies, professionalism and time-zone coverage",
  ];
  return (
    <section className="bg-paper pb-24 md:pb-32">
      <div className="container-x">
        <Reveal><SectionLabel>Two Markets</SectionLabel></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            One Team. Two Markets. <span className="text-grow">Same Quality Standard.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal delay={120}>
            <MarketCard label="India" subtitle="₹ · Mumbai-led" items={india} />
          </Reveal>
          <Reveal delay={180}>
            <MarketCard label="International" subtitle="$ · Global" items={intl} dark />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MarketCard({ label, subtitle, items, dark = false }: { label: string; subtitle: string; items: string[]; dark?: boolean }) {
  return (
    <div className={`h-full rounded-3xl p-8 md:p-10 ${dark ? "bg-ink text-paper" : "border border-border bg-card text-foreground"}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className={`font-mono text-xs uppercase tracking-widest ${dark ? "text-grow" : "text-foreground/50"}`}>{subtitle}</div>
          <h3 className="font-display mt-2 text-3xl font-semibold md:text-4xl">{label}</h3>
        </div>
        <ArrowUp className={`h-6 w-6 ${dark ? "text-grow" : "text-foreground/30"}`} />
      </div>
      <ul className="mt-8 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-grow" : "bg-grow"}`} />
            <span className={dark ? "text-paper/80" : "text-foreground/75"}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------- Pricing -------------------- */

export function Pricing() {
  const principles = [
    "Anchor high — quote the top third first.",
    "Discounts only for commitment.",
    "Start with one pillar, expand within 90 days.",
    "Custom quote after understanding scope.",
  ];
  return (
    <section id="pricing" className="bg-paper pb-24 md:pb-32">
      <div className="container-x">
        <Reveal><SectionLabel>Pricing Floor</SectionLabel></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            Clear Pricing. <span className="text-grow">No Guesswork.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal delay={120} className="lg:col-span-4">
            <div className="h-full rounded-3xl border border-border bg-card p-8">
              <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">India · Absolute Floor</div>
              <div className="font-display mt-6 text-6xl font-semibold tracking-tight">
                ₹8,000<span className="text-2xl font-normal text-foreground/50">/mo</span>
              </div>
              <p className="mt-4 text-foreground/65">Never below this for any monthly engagement.</p>
            </div>
          </Reveal>
          <Reveal delay={180} className="lg:col-span-4">
            <div className="h-full rounded-3xl bg-ink p-8 text-paper">
              <div className="font-mono text-xs uppercase tracking-widest text-grow">International · Absolute Floor</div>
              <div className="font-display mt-6 text-6xl font-semibold tracking-tight">
                $500<span className="text-2xl font-normal text-paper/50">/mo</span>
              </div>
              <p className="mt-4 text-paper/70">Minimum engagement for international clients.</p>
            </div>
          </Reveal>
          <Reveal delay={240} className="lg:col-span-4">
            <div className="h-full rounded-3xl border border-border bg-card p-8">
              <div className="font-mono text-xs uppercase tracking-widest text-foreground/50">Principles</div>
              <ul className="mt-6 space-y-3">
                {principles.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-foreground/75">
                    <ArrowUp className="mt-1 h-3.5 w-3.5 shrink-0 text-grow" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-dashed border-foreground/20 p-6 md:flex-row md:items-center md:p-8">
            <div>
              <h3 className="font-display text-xl font-semibold md:text-2xl">Need a custom package?</h3>
              <p className="mt-1 text-foreground/65">We'll scope, quote and start within a week.</p>
            </div>
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90">
              Talk to GroOut <ArrowUp className="arrow-rise h-4 w-4 text-grow" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- Quality -------------------- */

export function Quality() {
  const items = [
    { n: "01", t: "Two-stage QC", d: "Junior edit → senior review → client." },
    { n: "02", t: "Client style guide", d: "Cut pace, captions, music mood, brand colours, references." },
    { n: "03", t: "Turnaround SLAs", d: "Clear timelines depending on package." },
    { n: "04", t: "Two free revisions", d: "Included in every package." },
    { n: "05", t: "House-style training", d: "Editors trained before live client work." },
    { n: "06", t: "Monthly improvement loop", d: "Reports, feedback, optimisation — better output every month." },
  ];
  return (
    <section id="quality" className="bg-paper pb-24 md:pb-32">
      <div className="container-x">
        <Reveal><SectionLabel>Quality</SectionLabel></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            Built for Consistency. <span className="text-grow">Reviewed for Quality.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 50} className="bg-card">
              <div className="group h-full p-8 transition-colors hover:bg-secondary">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground/50">{it.n}</span>
                  <ArrowUp className="arrow-rise h-4 w-4 text-foreground/30 group-hover:text-grow" />
                </div>
                <h3 className="font-display mt-10 text-2xl font-semibold tracking-tight">{it.t}</h3>
                <p className="mt-2 text-foreground/65">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Contact -------------------- */

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-deep text-paper py-24 md:py-32">
      <div className="absolute inset-0 grid-noise opacity-50" aria-hidden />
      <ArrowUp className="pointer-events-none absolute -left-10 -top-10 h-72 w-72 text-grow/10 md:h-[28rem] md:w-[28rem]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img src={LOGO_WHITE} alt="GroOut" className="h-9 w-auto" />
          <h2 className="font-display mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">
            Ready to <span className="text-grow">Grow Out?</span>
          </h2>
          <p className="mt-5 max-w-md text-paper/70">
            Tell us what you want to build — content system, reels, podcast clips, social media,
            design, ads or complete channel management. We'll help you choose the right starting
            point.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://wa.me/910000000000" className="inline-flex items-center gap-2 rounded-full bg-grow px-5 py-3 text-sm font-medium text-paper hover:brightness-110">
              Chat on WhatsApp <ArrowUp className="h-4 w-4" />
            </a>
            <a href="mailto:hello@groout.in" className="inline-flex items-center gap-2 rounded-full border border-line-dark bg-white/[0.03] px-5 py-3 text-sm font-medium text-paper hover:bg-white/[0.07]">
              Send Enquiry
            </a>
            <a href="tel:+910000000000" className="inline-flex items-center gap-2 rounded-full border border-line-dark bg-white/[0.03] px-5 py-3 text-sm font-medium text-paper hover:bg-white/[0.07]">
              Book Strategy Call
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-3xl border border-line-dark bg-white/[0.025] p-6 backdrop-blur md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your full name" />
              <Field label="Brand / Business" name="brand" placeholder="Company or handle" />
              <Field label="Phone / WhatsApp" name="phone" placeholder="+91 ·····" />
              <Field label="Email" name="email" type="email" placeholder="you@brand.com" />
              <Field label="Service Interested In" name="service" placeholder="Reels, Podcast, Ads…" />
              <Field label="Budget Range" name="budget" placeholder="₹ / $ per month" />
              <div className="md:col-span-2">
                <label className="font-mono text-[11px] uppercase tracking-widest text-paper/50">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project, timeline and goals."
                  className="mt-2 w-full rounded-2xl border border-line-dark bg-ink-deep px-4 py-3 text-sm text-paper outline-none placeholder:text-paper/30 focus:border-grow"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-xs text-paper/50">We reply within one business day.</p>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-grow px-6 py-3 text-sm font-medium text-paper transition hover:brightness-110"
              >
                {sent ? "Sent — talk soon" : "Send Enquiry"}
                <ArrowUp className="arrow-rise h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-full border border-line-dark bg-ink-deep px-4 py-3 text-sm text-paper outline-none placeholder:text-paper/30 focus:border-grow"
      />
    </div>
  );
}

/* -------------------- Footer -------------------- */

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink-deep py-14 text-paper">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <img src={LOGO_WHITE} alt="GroOut" className="h-8 w-auto" />
            <p className="font-display mt-5 max-w-md text-xl italic text-paper/70">
              Rooted in Mumbai. Built to grow out worldwide.
            </p>
          </div>
          <div className="md:col-span-6">
            <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
              <a href="#services" className="text-sm text-paper/70 hover:text-paper">Services</a>
              <a href="#pricing" className="text-sm text-paper/70 hover:text-paper">Pricing</a>
              <a href="#contact" className="text-sm text-paper/70 hover:text-paper">Contact</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-line-dark pt-6 text-xs text-paper/45 md:flex-row md:items-center">
          <p>© 2026 GroOut. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">Mumbai · Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
