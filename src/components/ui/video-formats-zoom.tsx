"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

// Labels for the surrounding "formats" that fan out as the main video zooms out.
const FORMATS = ["Reel", "Short", "Square", "Thumbnail", "Carousel", "16:9"];

// Per-card placement (same collage layout as the zoom-parallax, only the scale is reversed).
const POS = [
  "",
  "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]",
  "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]",
  "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]",
  "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]",
  "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]",
  "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]",
];

/**
 * Reverse of the zoom-parallax: one big video fills the screen, then ZOOMS OUT as you scroll,
 * revealing the same video repurposed into multiple formats around it.
 */
export function VideoFormatsZoom({ videoHd, videoSd }: { videoHd: string; videoSd: string }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // reversed transforms: start large (zoomed in), scroll → settle at scale 1 (collage)
  const s4 = useTransform(scrollYProgress, [0, 1], [4, 1]);
  const s5 = useTransform(scrollYProgress, [0, 1], [5, 1]);
  const s6 = useTransform(scrollYProgress, [0, 1], [6, 1]);
  const s8 = useTransform(scrollYProgress, [0, 1], [8, 1]);
  const s9 = useTransform(scrollYProgress, [0, 1], [9, 1]);
  const scales = [s4, s5, s6, s5, s6, s8, s9];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {Array.from({ length: 7 }).map((_, index) => {
          const scale = scales[index % scales.length];
          const isMain = index === 0;
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${POS[index]}`}
            >
              <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
                <video
                  src={isMain ? videoHd : videoSd}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                {!isMain ? (
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {FORMATS[(index - 1) % FORMATS.length]}
                  </span>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
