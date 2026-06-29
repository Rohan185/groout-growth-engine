"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

// Curated "shots" — each opens its video in a lightbox on click. Swap srcs/videos freely.
const SHOTS: { src: string; video: string; x: string; y: string; w: number; h: number; r: number }[] = [
  { src: "https://images.pexels.com/photos/6593773/pexels-photo-6593773.jpeg?auto=compress&cs=tinysrgb&w=600", video: "https://videos.pexels.com/video-files/7699548/7699548-sd_640_360_30fps.mp4", x: "1%", y: "3%", w: 196, h: 138, r: -5 },
  { src: "https://images.pexels.com/photos/31213674/pexels-photo-31213674.jpeg?auto=compress&cs=tinysrgb&w=600", video: "https://videos.pexels.com/video-files/7586494/7586494-sd_640_360_24fps.mp4", x: "47%", y: "0%", w: 188, h: 134, r: 4 },
  { src: "https://images.pexels.com/photos/15569284/pexels-photo-15569284.jpeg?auto=compress&cs=tinysrgb&w=600", video: "https://videos.pexels.com/video-files/9145177/9145177-sd_640_360_30fps.mp4", x: "16%", y: "36%", w: 168, h: 206, r: 3 },
  { src: "https://images.pexels.com/photos/4549411/pexels-photo-4549411.jpeg?auto=compress&cs=tinysrgb&w=600", video: "https://videos.pexels.com/video-files/10238038/10238038-sd_640_360_25fps.mp4", x: "50%", y: "40%", w: 196, h: 144, r: -3 },
  { src: "https://images.pexels.com/photos/4889200/pexels-photo-4889200.jpeg?auto=compress&cs=tinysrgb&w=600", video: "https://videos.pexels.com/video-files/7947465/7947465-sd_640_360_30fps.mp4", x: "4%", y: "66%", w: 178, h: 138, r: -6 },
];

export function DraggableGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div ref={containerRef} className="relative mx-auto h-[430px] w-full max-w-[540px] touch-pan-y md:h-[520px]">
      {/* branded GroOut card — opens the showreel */}
      <Card containerRef={containerRef} x="46%" y="64%" w={206} h={150} r={5} delay={0} baseZ={3} video="/groout-reel.mp4" onOpen={setLightbox}>
        <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-grow to-[oklch(0.5_0.16_158)] p-4 text-white">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/90">GroOut shots</span>
          <div className="font-display leading-none">
            <p className="text-[1.55rem]">You create.</p>
            <p className="text-[1.55rem] italic leading-tight">We grow it out. ↗</p>
          </div>
        </div>
      </Card>

      {SHOTS.map((s, i) => (
        <Card key={i} containerRef={containerRef} x={s.x} y={s.y} w={s.w} h={s.h} r={s.r} delay={(i + 1) * 0.07} baseZ={1} video={s.video} onOpen={setLightbox}>
          <img src={s.src} alt="" draggable={false} className="pointer-events-none h-full w-full select-none object-cover" />
        </Card>
      ))}

      <span className="pointer-events-none absolute -bottom-1 right-1 z-10 text-[11px] font-medium tracking-wide text-cream/40">
        drag · click to play ✦
      </span>

      <AnimatePresence>{lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}</AnimatePresence>
    </div>
  );
}

function Card({
  containerRef,
  x,
  y,
  w,
  h,
  r,
  delay,
  baseZ,
  video,
  onOpen,
  children,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  x: string;
  y: string;
  w: number;
  h: number;
  r: number;
  delay: number;
  baseZ: number;
  video?: string;
  onOpen: (src: string) => void;
  children: ReactNode;
}) {
  const down = useRef<{ x: number; y: number } | null>(null);

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.16}
      whileDrag={{ scale: 1.06, zIndex: 50, cursor: "grabbing", boxShadow: "0 22px 55px rgba(0,0,0,0.20)" }}
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, scale: 0.85, y: 18, rotate: r }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: r }}
      transition={{ delay, type: "spring", stiffness: 190, damping: 19 }}
      style={{ left: x, top: y, width: w, height: h, zIndex: baseZ }}
      // distinguish a click (open video) from a drag
      onPointerDown={(e) => {
        down.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const d = down.current;
        down.current = null;
        if (d && video && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 7) onOpen(video);
      }}
      className="group absolute cursor-pointer overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
    >
      {children}
      {video ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/15 group-hover:opacity-100">
          <span className="grid size-11 place-items-center rounded-full bg-white/90 text-[#0a0a0a] shadow-lg">
            <Play className="size-5 translate-x-[1px] fill-current" />
          </span>
        </div>
      ) : null}
    </motion.div>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white/90 text-black transition hover:bg-white"
        >
          <X className="size-5" />
        </button>
        <video key={src} src={src} autoPlay loop muted playsInline controls className="aspect-video w-full bg-black object-cover" />
      </motion.div>
    </motion.div>
  );
}
