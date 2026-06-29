"use client";

import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";
import { Heart, MessageCircle, Send, Bookmark, Music2, Play, BadgeCheck, Repeat2, BarChart3, Quote } from "lucide-react";

const VIDEO_HD = "https://videos.pexels.com/video-files/8126733/8126733-hd_1920_1080_25fps.mp4";
const VIDEO_SD = "https://videos.pexels.com/video-files/8126733/8126733-sd_640_360_25fps.mp4";
const FRAME = "/repurpose-frame.jpg"; // a still pulled from the same clip, for the non-video formats

/* ============================== format mockups ============================== */

function Vid({ src, className = "" }: { src: string; className?: string }) {
  return <video src={src} autoPlay loop muted playsInline className={`h-full w-full object-cover ${className}`} />;
}

// Center — the one long video (16:9)
function MainVideo() {
  return <Vid src={VIDEO_HD} />;
}

// Instagram Reel — portrait video + IG interface
function ReelMock() {
  return (
    <div className="relative h-full w-full bg-black text-white">
      <Vid src={VIDEO_SD} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />
      {/* right action rail */}
      <div className="absolute bottom-[14%] right-[6%] flex flex-col items-center gap-[8%]">
        <Stat icon={<Heart className="size-[1.5cqw] min-h-3 min-w-3" fill="currentColor" />} v="12.4k" />
        <Stat icon={<MessageCircle className="size-[1.5cqw] min-h-3 min-w-3" />} v="318" />
        <Stat icon={<Send className="size-[1.5cqw] min-h-3 min-w-3" />} v="" />
        <Bookmark className="size-[1.5cqw] min-h-3 min-w-3" />
        <span className="mt-[6%] grid size-[2cqw] min-h-4 min-w-4 place-items-center rounded-md bg-white/20">
          <Music2 className="size-[1cqw] min-h-2 min-w-2" />
        </span>
      </div>
      {/* bottom info */}
      <div className="absolute inset-x-[6%] bottom-[6%]">
        <div className="flex items-center gap-[3%]">
          <span className="size-[2.2cqw] min-h-4 min-w-4 rounded-full border border-white/70 bg-grow" />
          <span className="text-[1.5cqw] min-text-[9px] font-semibold leading-none">groout.studio</span>
          <span className="rounded-[4px] border border-white/60 px-[3%] py-[1px] text-[1.2cqw] font-medium leading-none">Follow</span>
        </div>
        <p className="mt-[4%] line-clamp-2 text-[1.4cqw] leading-snug text-white/90">One shoot → a week of content ✂️</p>
        <p className="mt-[3%] flex items-center gap-1 text-[1.2cqw] text-white/80"><Music2 className="size-[1cqw] min-h-2 min-w-2" /> Original audio · GroOut</p>
      </div>
    </div>
  );
}
function Stat({ icon, v }: { icon: ReactNode; v: string }) {
  return (
    <span className="flex flex-col items-center gap-[3px] leading-none">
      {icon}
      {v ? <span className="text-[1.1cqw] min-text-[8px] font-medium">{v}</span> : null}
    </span>
  );
}

// YouTube thumbnail — frame (or live video for the hero) + bold edited overlay
function ThumbnailMock({ video = false }: { video?: boolean }) {
  return (
    <div className="relative h-full w-full bg-black">
      {video ? <Vid src={VIDEO_HD} /> : <img src={FRAME} alt="" className="h-full w-full object-cover" draggable={false} />}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent" />
      <div className="absolute left-[5%] top-[8%] max-w-[55%]">
        <p className="font-display text-[5cqw] font-bold uppercase leading-[0.92] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
          1 shoot <span className="text-grow">→</span> 30 posts
        </p>
      </div>
      <span className="absolute bottom-[6%] right-[4%] rounded bg-black/85 px-[2%] py-[1px] text-[2cqw] font-semibold text-white">12:04</span>
      <span className="absolute left-1/2 top-1/2 grid size-[10%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-red-600/90">
        <Play className="size-[40%] text-white" fill="currentColor" />
      </span>
    </div>
  );
}

// Instagram carousel — frame + dots + counter
function CarouselMock() {
  return (
    <div className="relative h-full w-full bg-black">
      <img src={FRAME} alt="" className="h-full w-full object-cover" draggable={false} />
      <span className="absolute right-[5%] top-[5%] rounded-full bg-black/60 px-[5%] py-[1px] text-[3cqw] font-semibold text-white">1/6</span>
      <div className="absolute inset-x-0 bottom-[6%] flex items-center justify-center gap-[3%]">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`size-[1.6cqw] min-h-1 min-w-1 rounded-full ${i === 0 ? "bg-white" : "bg-white/45"}`} />
        ))}
      </div>
    </div>
  );
}

// Quote card — designed graphic
function QuoteMock() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[oklch(0.2_0.02_152)] p-[8%] text-white">
      <Quote className="size-[12%] text-grow" fill="currentColor" />
      <p className="font-display text-[7cqw] font-medium leading-[1.05]">
        Record once. <span className="italic text-grow">Post everywhere.</span>
      </p>
      <div className="flex items-center gap-[3%]">
        <span className="size-[8%] rounded-full bg-grow" />
        <span className="text-[3cqw] font-semibold">GroOut</span>
      </div>
    </div>
  );
}

// X / Twitter thread post
function ThreadMock() {
  return (
    <div className="flex h-full w-full flex-col gap-[4%] bg-white p-[7%] text-[#0f1419]">
      <div className="flex items-center gap-[3%]">
        <span className="size-[12%] rounded-full bg-grow" />
        <div className="leading-tight">
          <span className="flex items-center gap-1 text-[3.2cqw] font-bold">GroOut <BadgeCheck className="size-[3cqw] text-grow" fill="currentColor" stroke="white" /></span>
          <span className="text-[2.6cqw] text-neutral-500">@groout · 2h</span>
        </div>
      </div>
      <p className="text-[3.2cqw] leading-snug">we turned ONE founder interview into 14 posts this week. the system 🧵👇</p>
      <div className="overflow-hidden rounded-xl border border-black/10">
        <img src={FRAME} alt="" className="aspect-video w-full object-cover" draggable={false} />
      </div>
      <div className="mt-auto flex items-center justify-between text-neutral-500">
        <span className="flex items-center gap-1 text-[2.6cqw]"><MessageCircle className="size-[3cqw]" /> 92</span>
        <span className="flex items-center gap-1 text-[2.6cqw]"><Repeat2 className="size-[3cqw]" /> 240</span>
        <span className="flex items-center gap-1 text-[2.6cqw]"><Heart className="size-[3cqw]" /> 1.8k</span>
        <span className="flex items-center gap-1 text-[2.6cqw]"><BarChart3 className="size-[3cqw]" /> 86k</span>
      </div>
    </div>
  );
}

/* ============================== the reverse-zoom layout ============================== */

type Card = { key: string; label?: string; labelPos?: "left" | "right"; scaleIdx: number; h: string; aspect: string; off: string; render: () => ReactNode };

// Cards sized & spaced in vh so the gaps stay identical on any screen.
// The Thumbnail (live video) is the big centre hero; Reel | Thread flank it; Carousel | Quote sit below.
const CARDS: Card[] = [
  { key: "thumb", label: "Thumbnail", labelPos: "right", scaleIdx: 0, h: "46vh", aspect: "16 / 9", off: "", render: () => <ThumbnailMock video /> },
  { key: "reel", label: "Reel", labelPos: "left", scaleIdx: 1, h: "50vh", aspect: "9 / 16", off: "[&>div]:!-left-[30vw]", render: ReelMock },
  { key: "thread", label: "Thread", labelPos: "right", scaleIdx: 1, h: "42vh", aspect: "4 / 5", off: "[&>div]:!left-[30vw] [&>div]:!-top-[2vh]", render: ThreadMock },
  { key: "carousel", label: "Carousel", labelPos: "left", scaleIdx: 2, h: "30vh", aspect: "1 / 1", off: "[&>div]:!-left-[16vw] [&>div]:!top-[30vh]", render: CarouselMock },
  { key: "quote", label: "Quote card", labelPos: "right", scaleIdx: 3, h: "27vh", aspect: "16 / 10", off: "[&>div]:!left-[18vw] [&>div]:!top-[30vh]", render: QuoteMock },
];

// Scroll-driven: the centre video starts FULL-zoomed and zooms out as you scroll;
// the formats then fade + settle in one by one around it. Re-runs on every scroll.
function FormatCard({ progress, idx, card }: { progress: MotionValue<number>; idx: number; card: Card }) {
  const isCenter = idx === 0;
  const start = 0.4 + (idx - 1) * 0.13; // formats begin coming in once the hero has shrunk a bit
  const opacity = useTransform(progress, isCenter ? [0, 1] : [start, start + 0.07, 1], isCenter ? [1, 1] : [0, 1, 1]);
  const scale = useTransform(progress, isCenter ? [0, 0.45, 1] : [start, start + 0.14, 1], isCenter ? [2.3, 1, 1] : [1.14, 1, 1]);
  const y = useTransform(progress, isCenter ? [0, 1] : [start, start + 0.14, 1], isCenter ? [0, 0] : [24, 0, 0]);
  return (
    <motion.div
      style={{ opacity, scale, y, willChange: "transform, opacity" }}
      className={`absolute flex h-full w-full items-center justify-center ${card.off}`}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_10px_28px_rgba(0,0,0,0.13)] [container-type:inline-size]"
        style={{ height: card.h, aspectRatio: card.aspect } as CSSProperties}
      >
        {card.render()}
        {card.label ? (
          <span className={`pointer-events-none absolute top-2 z-20 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white ${card.labelPos === "right" ? "right-2" : "left-2"}`}>
            {card.label}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}

export function RepurposeFormatsZoom() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <div ref={container} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {CARDS.map((c, i) => (
          <FormatCard key={c.key} progress={scrollYProgress} idx={i} card={c} />
        ))}
      </div>
    </div>
  );
}
