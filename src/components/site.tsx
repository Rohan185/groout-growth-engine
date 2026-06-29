import { useEffect, useState, type ReactNode } from "react";
import { RepurposeFormatsZoom } from "@/components/ui/repurpose-formats";
import { Header } from "@/components/ui/header-2";
import { AboutStatsSection, ServicesSection } from "@/components/ui/about-services";
import { DraggableGallery } from "@/components/ui/draggable-gallery";
import { Star, Play } from "lucide-react";

const LOGO_WHITE = "/groout-logo-white.png"; // white wordmark + green arrow, for dark UI
const ARROW = "/groout-arrow.png"; // rising-arrow mark

// ⚠️ PLACEHOLDER contact details — replace with GroOut's real values.
const WA = "https://wa.me/910000000000";
const EMAIL = "hello@groout.studio";
const TEL = "+910000000000";

/* -------------------- helpers -------------------- */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]:not([data-in])"));
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useClock(tz: string) {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () => {
      try {
        return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz }).format(new Date());
      } catch {
        return "";
      }
    };
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, [tz]);
  return t;
}

function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div className={`eyebrow flex items-center gap-2.5 ${center ? "justify-center" : ""}`}>
      <span className="inline-block h-1 w-1 rounded-full bg-grow" />
      {children}
    </div>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function ImageSlot({ label }: { label: string }) {
  return <div className="gro-slot">{label}</div>;
}

/* -------------------- hero -------------------- */

function Hero() {
  return (
    <header id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] grow-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 texture opacity-50" aria-hidden />
      <div className="container-x relative grid items-center gap-12 pt-16 pb-16 md:pt-24 md:pb-24 lg:grid-cols-2 lg:gap-8">
        {/* left — copy */}
        <div className="text-center lg:text-left">
          <div data-reveal="" className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-surface px-3.5 py-1.5 text-[12.5px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="h-1.5 w-1.5 rounded-full bg-grow" />
              <span className="text-cream/70">Now onboarding for the 2026 content year</span>
            </span>
          </div>
          <h1 data-reveal="" className="font-display mt-7 text-balance text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.01em]">
            You create.<br />We <span className="italic text-grow">grow it out.</span>
          </h1>
          <p data-reveal="" className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-cream/65 md:text-lg lg:mx-0">
            Your entire content team in one place. Video editing, design, social media, podcasts, paid ads and
            repurposing, run by one dedicated crew for creators, founders and brands.
          </p>
          <div data-reveal="" className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-grow px-7 py-3.5 text-sm font-medium text-[oklch(0.02_0_0)] transition hover:brightness-110">
              Book a call <span className="arrow-rise inline-block">→</span>
            </a>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-3.5 text-sm font-medium text-cream transition hover:bg-black/5">
              See our work
            </a>
          </div>
        </div>

        {/* right — draggable "shots" gallery */}
        <div className="relative">
          <DraggableGallery />
        </div>
      </div>
    </header>
  );
}

/* -------------------- logo wall -------------------- */

const PLATFORMS = ["YouTube", "Instagram", "Meta Ads", "LinkedIn", "Google Ads", "Spotify", "Apple Podcasts", "Premiere"];

function Partners() {
  return (
    <section className="border-b border-black/8 py-8">
      <div className="container-x flex flex-col items-center justify-center gap-x-12 gap-y-5 sm:flex-row">
        <span className="eyebrow whitespace-nowrap text-cream/50">In partnership with</span>
        <div className="flex items-center gap-10 md:gap-14">
          <a href="https://labs.dyomacompany.com/" target="_blank" rel="noopener noreferrer" aria-label="DYOMA" className="opacity-60 transition-opacity hover:opacity-100">
            <img src="/partner-dyoma.png" alt="DYOMA" className="h-[15px] w-auto md:h-[17px]" />
          </a>
          <a href="https://www.founders-suite.com/" target="_blank" rel="noopener noreferrer" aria-label="FoundersSuite" className="opacity-60 transition-opacity hover:opacity-100">
            <img src="/partner-founderssuite.png" alt="FoundersSuite" className="h-6 w-auto md:h-7" />
          </a>
        </div>
      </div>
    </section>
  );
}

function LogoWall() {
  const fade = {
    maskImage: "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
  } as React.CSSProperties;
  const group = (k: string, hidden = false) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-x-8 pr-8 md:gap-x-12 md:pr-12">
      {PLATFORMS.map((p) => (
        <span key={`${k}-${p}`} className="flex shrink-0 items-center gap-x-8 md:gap-x-12">
          <span className="font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-none text-cream/55 md:text-3xl">{p}</span>
          <span className="text-base text-grow">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <section className="overflow-hidden border-y border-black/8 py-10">
      <div className="container-x">
        <p data-reveal="" className="eyebrow text-center">Built across the platforms that matter</p>
      </div>
      <div className="relative mt-7" style={fade}>
        <div className="marquee flex w-max">
          {group("a")}
          {group("b", true)}
        </div>
      </div>
    </section>
  );
}

/* -------------------- marquee -------------------- */

function Marquee() {
  const stroke = { color: "transparent", WebkitTextStroke: "1.3px oklch(0.22 0.012 152 / 0.55)" } as React.CSSProperties;
  const group = (hidden = false) => (
    <div aria-hidden={hidden || undefined} className="flex items-center gap-10 pr-10">
      <span className="font-display text-[clamp(34px,6vw,72px)] italic leading-none" style={stroke}>It&rsquo;s time to grow it out</span>
      <span className="text-grow text-[clamp(20px,3vw,34px)]">✦</span>
      <span className="font-display text-[clamp(34px,6vw,72px)] italic leading-none" style={stroke}>You create, we grow</span>
      <span className="text-grow text-[clamp(20px,3vw,34px)]">✦</span>
    </div>
  );
  return (
    <section className="overflow-hidden border-b border-black/8 py-6">
      <div className="marquee flex w-max">
        {group()}
        {group(true)}
      </div>
    </section>
  );
}


/* -------------------- work -------------------- */

function Work() {
  const tiles = [
    { title: "Founder UGC", tag: "UGC · Reel", video: "/work-ugc.mp4" },
    { title: "Date-night styling", tag: "Reel · Fashion", video: "/work-fashion.mp4" },
    { title: "Real estate reel", tag: "Reel · Property", video: "/work-dessert.mp4" },
  ];
  return (
    <section id="work" className="border-t border-black/8 py-24 md:py-32">
      <div className="container-x">
        <div data-reveal="" className="grid gap-px overflow-hidden rounded-3xl border border-black/8 bg-black/8 lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 bg-surface p-[clamp(28px,4vw,56px)]">
            <div>
              <Eyebrow>Featured reel</Eyebrow>
              <h2 className="font-display mt-5 text-[clamp(2.2rem,4.4vw,4rem)] font-medium leading-[1.0]">The work does <span className="italic text-grow">the talking.</span></h2>
              <p className="mt-5 max-w-[42ch] text-cream/55">From brand intros to founder UGC, fashion and real estate reels — a taste of the styles we cut. Swap any slot for your own campaign.</p>
            </div>
            <a href="#contact" className="group inline-flex w-fit items-center gap-2 rounded-full bg-grow px-6 py-3 text-sm font-medium text-[oklch(0.02_0_0)] transition hover:brightness-110">
              Start a project <span className="arrow-rise inline-block">→</span>
            </a>
          </div>
          <div className="relative min-h-[320px] bg-surface p-[clamp(20px,2.5vw,32px)]">
            <div className="absolute inset-[clamp(20px,2.5vw,32px)] overflow-hidden rounded-2xl bg-black">
              <video src="/work-main.mp4" autoPlay loop muted playsInline className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">Brand intro</span>
            </div>
          </div>
        </div>

        <div data-reveal="" className="mt-12 flex items-end justify-between gap-6">
          <p className="eyebrow">Selected formats · sample edits</p>
          <a href="#contact" className="gro-ul text-sm font-medium text-cream">See more work <span className="text-grow">↗</span></a>
        </div>
        <div data-reveal="" className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((t) => (
            <div key={t.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/8 bg-black">
                <video src={t.video} autoPlay loop muted playsInline className="h-full w-full object-cover" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-display text-xl text-cream transition-colors group-hover:text-grow">{t.title}</span>
                <span className="rounded-full border border-black/12 px-2.5 py-1 text-[11px] text-cream/50">{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- repurpose -------------------- */

function Repurpose() {
  const chips = ["Reels", "Shorts", "TikTok", "Carousels", "Quote cards", "Threads", "Ad cuts", "Email GIFs"];
  return (
    <section className="relative border-t border-black/8">
      <div className="relative overflow-hidden pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 grow-glow-soft" aria-hidden />
        <div className="container-narrow relative text-center">
          <Eyebrow center>Clip &amp; repurpose</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[0.98]">
            One video in.<br /><span className="italic text-grow">Everywhere out.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-cream/60 md:text-lg">Record once. We turn it into a full week of formats, each cut for where it lands.</p>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2.5">
            {chips.map((c) => (
              <span key={c} className="rounded-full border border-black/12 px-4 py-2 text-sm text-cream/80">{c}</span>
            ))}
          </div>
        </div>
      </div>
      {/* one video → every format: the big clip zooms out into realistic format mockups */}
      <RepurposeFormatsZoom />
    </section>
  );
}

/* -------------------- process -------------------- */

function Process() {
  const steps = [
    ["01", "Brief", "A quick call to map your goals, formats and voice. We scope and quote, then build a plan."],
    ["02", "Build", "Your dedicated team produces, edits and schedules. Two free revisions on every deliverable."],
    ["03", "Grow", "We publish, repurpose and review the numbers, then improve the system every month."],
  ];
  const flow = ["Plan", "Produce", "Review", "Publish", "Optimise"];
  return (
    <section id="process" className="border-t border-black/8 py-24 md:py-32">
      <div className="container-x">
        <Eyebrow>How it works</Eyebrow>
        <h2 data-reveal="" className="font-display mt-5 max-w-[16ch] text-[clamp(2.6rem,5.4vw,5rem)] font-medium leading-[0.98]">
          Simple to start. <span className="italic text-grow">Built to scale.</span>
        </h2>
        <div data-reveal="" className="gro-grid-3 mt-14 grid grid-cols-3 gap-[clamp(16px,2vw,28px)]">
          {steps.map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-black/8 bg-surface p-[clamp(28px,3vw,40px)]">
              <div className="font-display text-[clamp(3.5rem,7vw,5.5rem)] font-medium leading-none text-grow">{n}</div>
              <h3 className="font-display mt-5 text-3xl">{t}</h3>
              <p className="mt-3 text-cream/55">{d}</p>
            </div>
          ))}
        </div>
        <div data-reveal="" className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-black/8 pt-7">
          <span className="eyebrow mr-2">Under the hood</span>
          {flow.map((f, i) => (
            <span key={f} className="inline-flex items-center gap-2.5">
              <span className="text-sm text-cream/85">{f}</span>
              {i < flow.length - 1 && <span className="text-grow">→</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- ways to work -------------------- */

function Ways() {
  const cards = [
    { kicker: "Single project", title: "For a one off push", points: ["A launch, an event or a campaign", "Defined scope and deadline", "Two free revisions included"], highlight: false },
    { kicker: "Monthly partner", title: "Your retained team", points: ["A steady publishing rhythm", "Mixed formats across platforms", "Monthly improvement loop"], highlight: true },
    { kicker: "Full management", title: "We run it all", points: ["End to end content and growth", "Strategy, production and paid", "One team, full accountability"], highlight: false },
  ];
  return (
    <section className="border-t border-black/8 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Ways to work</Eyebrow>
            <h2 data-reveal="" className="font-display mt-5 text-[clamp(2.6rem,5.4vw,5rem)] font-medium leading-[0.98]">Pick the <span className="italic text-grow">partnership.</span></h2>
          </div>
          <p data-reveal="" className="max-w-[32ch] text-cream/55">Every engagement is scoped and quoted on a call. No public price list, no templates.</p>
        </div>
        <div data-reveal="" className="gro-grid-3 mt-14 grid grid-cols-3 gap-[clamp(16px,2vw,24px)]">
          {cards.map((c) => (
            <div key={c.kicker} className={`flex flex-col rounded-2xl p-[clamp(28px,3vw,40px)] ${c.highlight ? "bg-surface ring-1 ring-grow/50" : "border border-black/8 bg-surface/60"}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow text-grow">{c.kicker}</span>
                {c.highlight && <span className="rounded-full bg-grow px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.02_0_0)]">Popular</span>}
              </div>
              <h3 className="font-display mt-4 text-3xl">{c.title}</h3>
              <ul className="mt-6 space-y-3">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-cream/75"><span className="text-grow">↗</span>{p}</li>
                ))}
              </ul>
              <div className="mt-8 flex-1" />
              <a href="#contact" className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-cream gro-ul">Book a call <Arrow className="arrow-rise h-4 w-4 text-grow" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- two markets + clocks -------------------- */

function Markets() {
  const blr = useClock("Asia/Kolkata");
  const lon = useClock("Europe/London");
  const nyc = useClock("America/New_York");
  const chip = (label: string, time: string, on: boolean) => (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-black/12 px-4 py-2.5 text-[13.5px] text-cream/80">
      <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-grow" : "bg-black/40"}`} />
      {label} <b className="font-display text-lg text-cream">{time}</b>
    </span>
  );
  return (
    <section className="border-t border-black/8 py-24 md:py-32">
      <div className="container-x">
        <Eyebrow>Two markets</Eyebrow>
        <h2 data-reveal="" className="font-display mt-5 text-[clamp(2.6rem,5.4vw,5rem)] font-medium leading-[0.98]">Rooted local. <span className="italic text-grow">Built global.</span></h2>
        <div data-reveal="" className="gro-grid-2 mt-14 grid grid-cols-2 gap-[clamp(16px,2vw,24px)]">
          {[
            ["India", "Bengaluru & Mumbai", "On the ground for creators, founders and local businesses, from cafés and salons to D2C brands. We know the platforms, the languages and the pace."],
            ["International", "Worldwide, remote first", "Async, time zone friendly delivery for creators and brands anywhere. Same dedicated team, same standards, wherever your audience is."],
          ].map(([k, h, d]) => (
            <div key={k} className="rounded-2xl border border-black/8 bg-surface p-[clamp(28px,3vw,44px)]">
              <span className="eyebrow text-grow">{k}</span>
              <h3 className="font-display mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight">{h}</h3>
              <p className="mt-4 max-w-[46ch] text-cream/60">{d}</p>
            </div>
          ))}
        </div>
        <div data-reveal="" className="mt-7 flex flex-wrap gap-3">
          {chip("Bengaluru & Mumbai", blr, true)}
          {chip("London", lon, false)}
          {chip("New York", nyc, false)}
        </div>
      </div>
    </section>
  );
}

/* -------------------- why groout -------------------- */

function Why() {
  const items = [
    ["01", "Two stage quality control", "Every deliverable is checked by an editor and a lead before it reaches you."],
    ["02", "A style guide per client", "Your fonts, colours, pacing and tone, documented so output stays consistent."],
    ["03", "Timelines you can trust", "Clear turnaround on every brief, agreed upfront and tracked."],
    ["04", "Two free revisions", "Built into every deliverable, so we get it right without nickel and diming."],
    ["05", "A trained, dedicated team", "The same people learn your brand, so you are never starting over."],
    ["06", "Monthly improvement loop", "We review what worked and refine the system every single month."],
  ];
  return (
    <section className="border-t border-black/8 py-24 md:py-32">
      <div className="container-x grid gap-[clamp(36px,5vw,64px)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Why GroOut</Eyebrow>
            <h2 data-reveal="" className="font-display mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)] font-medium leading-[1.02]">Premium output, held to a <span className="italic text-grow">standard.</span></h2>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="border-t border-black/8">
            {items.map(([n, t, d], i) => (
              <div key={n} data-reveal="" style={{ transitionDelay: `${i * 40}ms` }} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-black/8 py-7">
                <span className="font-display text-2xl text-cream/40">{n}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{t}</h3>
                  <p className="mt-2 text-cream/55">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- testimonials -------------------- */

function TestiStars() {
  return (
    <div className="flex gap-1 text-grow">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-[15px]" fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function TestiCard({ q, name, role, avatar }: { q: string; name: string; role: string; avatar: string }) {
  return (
    <figure className="flex flex-col rounded-2xl border border-black/8 bg-surface p-[clamp(24px,2.6vw,34px)] shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <TestiStars />
      <blockquote className="font-display mt-5 flex-1 text-[clamp(1.2rem,1.6vw,1.6rem)] leading-snug text-cream">&ldquo;{q}&rdquo;</blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <img src={avatar} alt={name} loading="lazy" className="size-10 rounded-full object-cover" />
        <div className="leading-tight">
          <div className="text-sm font-semibold text-cream">{name}</div>
          <div className="text-xs text-cream/55">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

function Testimonials() {
  const A = [
    "https://images.pexels.com/photos/26872232/pexels-photo-26872232.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    "https://images.pexels.com/photos/31869537/pexels-photo-31869537.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    "https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    "https://images.pexels.com/photos/4797690/pexels-photo-4797690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
  ];
  const t = [
    { q: "GroOut feels like having an in-house content team — the results spoke for themselves.", name: "Aarav Mehta", role: "Founder, D2C brand", avatar: A[0] },
    { q: "Working with GroOut completely transformed our online presence. From the very first call, they understood our brand.", name: "Olivia Johnson", role: "Product Manager", avatar: A[1] },
    { q: "They got our audience and long-term goals from day one. Content that actually grows.", name: "Arjun Nair", role: "Marketing Lead", avatar: A[2] },
    { q: "Fast, reliable and genuinely creative. Two free revisions meant we always landed it.", name: "Noah Jensen", role: "Head of Operations", avatar: A[3] },
  ];
  return (
    <section className="relative overflow-hidden border-t border-black/8 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 grow-glow-soft" aria-hidden />
      <div className="container-x relative">
        <div className="text-center">
          <Eyebrow center>In their words</Eyebrow>
          <h2 data-reveal="" className="font-display mt-5 text-[clamp(2.6rem,5.4vw,5rem)] font-medium leading-[0.98]">Don&rsquo;t take our <span className="italic text-grow">word for it.</span></h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-start gap-5 md:grid-cols-2">
          {/* left column: text + video testimonial */}
          <div className="flex flex-col gap-5">
            <TestiCard {...t[0]} />
            <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/8 bg-black shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
              <video
                src="https://videos.pexels.com/video-files/3156778/3156778-sd_640_360_30fps.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                <Play className="size-4 translate-x-px" fill="currentColor" />
              </span>
              <figcaption className="absolute inset-x-5 bottom-5">
                <div className="mb-2"><TestiStars /></div>
                <div className="text-base font-semibold text-white">James Carter</div>
                <div className="text-sm text-white/70">YouTube Creator</div>
              </figcaption>
            </figure>
          </div>
          {/* right column: three text testimonials */}
          <div className="flex flex-col gap-5">
            <TestiCard {...t[1]} />
            <TestiCard {...t[2]} />
            <TestiCard {...t[3]} />
          </div>
        </div>
        <p className="eyebrow mt-8 text-center text-cream/55">Sample testimonials &middot; swap for real client quotes</p>
      </div>
    </section>
  );
}

/* -------------------- faq -------------------- */

function FAQ() {
  const data = [
    ["How does pricing work?", "Every engagement is scoped and quoted on a quick call. No templates, no surprises. We look at your formats, volume and goals, then send a clear proposal."],
    ["What does the dedicated team include?", "Editors, designers and a lead who learn your brand and stay with your account. The same people handle your work, so you are never re-explaining the basics."],
    ["How fast are turnarounds?", "We agree timelines per brief upfront and track them. Short form clips move quickly, larger productions get a clear schedule before we start."],
    ["Do you work with clients outside India?", "Yes. We are remote first and time zone friendly, serving creators and brands worldwide while staying rooted in Bengaluru & Mumbai."],
    ["Can you start with a single project?", "Absolutely. Many clients begin with a one off launch or campaign, then move to a monthly partnership once they see how we work."],
    ["How many revisions are included?", "Two free revisions on every deliverable, built into the process so we get it right together."],
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="border-t border-black/8 py-24 md:py-32">
      <div className="container-narrow">
        <div className="text-center">
          <Eyebrow center>FAQ</Eyebrow>
          <h2 data-reveal="" className="font-display mt-5 text-[clamp(2.6rem,5.4vw,4.5rem)] font-medium leading-[0.98]">Good to <span className="italic text-grow">know.</span></h2>
        </div>
        <div data-reveal="" className="mt-12">
          {data.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="border-t border-black/8 last:border-b">
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="font-display text-2xl md:text-3xl">{q}</span>
                  <span className="font-display shrink-0 text-2xl text-grow">{isOpen ? "−" : "+"}</span>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden"><p className="max-w-2xl text-cream/60">{a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- contact -------------------- */

function Contact() {
  const [form, setForm] = useState({ name: "", brand: "", phone: "", email: "", service: "Not sure yet", message: "" });
  const set = (k: string) => (e: { target: { value: string } }) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New project enquiry, ${form.brand || form.name || "GroOut"}`;
    const lines = [`Name: ${form.name || "-"}`, `Brand: ${form.brand || "-"}`, `Phone: ${form.phone || "-"}`, `Email: ${form.email || "-"}`, `Service: ${form.service || "-"}`, "", "Message:", form.message || "-"];
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };
  const rail = (kicker: string, label: string, href: string, last = false) => (
    <a href={href} className="group flex flex-col gap-1 py-[18px]" style={last ? undefined : { borderBottom: "1px solid var(--line)" }}>
      <span className="eyebrow">{kicker}</span>
      <span className="font-display text-xl text-cream">{label} <span className="arrow-rise inline-block text-grow">↗</span></span>
    </a>
  );
  return (
    <section id="contact" className="relative overflow-hidden border-t border-black/8 pt-24 md:pt-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] grow-glow rotate-180" aria-hidden />
      <div className="container-x relative">
        <div data-reveal="" className="mx-auto max-w-2xl text-center">
          <Eyebrow center>Work with us</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.94]">Ready to <span className="italic text-grow">grow out?</span></h2>
          <p className="mx-auto mt-6 max-w-lg text-cream/60">Tell us what you are making. A strategist replies within one business day.</p>
        </div>
        <div data-reveal="" className="gro-split mt-14 grid grid-cols-[0.8fr_1.2fr] gap-[clamp(16px,2vw,24px)]">
          <div className="flex flex-col rounded-2xl border border-black/8 bg-surface/60 p-[clamp(28px,3vw,40px)]">
            {rail("WhatsApp", "Message us", WA)}
            {rail("Email", EMAIL, `mailto:${EMAIL}`)}
            {rail("Call", "Book a call", `tel:${TEL}`, true)}
            <div className="eyebrow mt-auto pt-7">Bengaluru &amp; Mumbai · Worldwide</div>
          </div>
          <form onSubmit={submit} className="gro-grid-2 grid grid-cols-2 gap-5 rounded-2xl border border-black/8 bg-surface p-[clamp(28px,3vw,40px)]">
            <label className="flex flex-col gap-2"><span className="eyebrow">Name</span><input type="text" value={form.name} onChange={set("name")} required className="gro-input" placeholder="Your name" /></label>
            <label className="flex flex-col gap-2"><span className="eyebrow">Brand</span><input type="text" value={form.brand} onChange={set("brand")} className="gro-input" placeholder="Brand or handle" /></label>
            <label className="flex flex-col gap-2"><span className="eyebrow">Phone</span><input type="tel" value={form.phone} onChange={set("phone")} className="gro-input" placeholder="+91" /></label>
            <label className="flex flex-col gap-2"><span className="eyebrow">Email</span><input type="email" value={form.email} onChange={set("email")} required className="gro-input" placeholder="you@email.com" /></label>
            <label className="col-span-2 flex flex-col gap-2"><span className="eyebrow">Service</span>
              <select value={form.service} onChange={set("service")} className="gro-input">
                {["Not sure yet", "Video Editing", "Graphic Design", "Social Media Management", "Podcast Production", "Paid Ads", "Clipping & Repurposing", "Content Strategy", "Full management"].map((o) => <option key={o} value={o} className="bg-surface text-cream">{o}</option>)}
              </select>
            </label>
            <label className="col-span-2 flex flex-col gap-2"><span className="eyebrow">Message</span><textarea value={form.message} onChange={set("message")} rows={4} className="gro-input resize-y" placeholder="What are you making, and what do you want to grow?" /></label>
            <button type="submit" className="group col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-grow px-6 py-4 text-base font-medium text-[oklch(0.02_0_0)] transition hover:brightness-110">
              Send and book a call <span className="arrow-rise inline-block">→</span>
            </button>
          </form>
        </div>

        {/* minimal close-out, integrated under the form */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-black/8 pt-6 md:flex-row">
          <span className="eyebrow">© 2026 GroOut</span>
          <span className="eyebrow">Bengaluru · Mumbai · Worldwide</span>
        </div>
      </div>

      {/* shaded brand wordmark with the footer effect — the site ends here */}
      <div className="giant-wordmark mt-[clamp(40px,7vw,90px)]" aria-hidden="true">GroOut</div>
    </section>
  );
}

/* -------------------- page -------------------- */

export function Landing() {
  useReveal();
  return (
    <div className="w-full bg-base text-cream">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-grow focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[oklch(0.02_0_0)]">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Partners />
        <LogoWall />
        <section className="relative overflow-hidden py-20 text-center md:py-28">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 grow-glow-soft" aria-hidden />
          <div className="container-narrow relative">
            <h2 data-reveal="" className="font-display text-[clamp(2.2rem,5.5vw,4.6rem)] font-medium leading-[1.0]">
              Everything we make points <span className="italic text-grow">up and to the right.</span>
            </h2>
          </div>
        </section>
        <AboutStatsSection />
        <ServicesSection />
        <Work />
        <Repurpose />
        <Process />
        <Ways />
        <Why />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
}
