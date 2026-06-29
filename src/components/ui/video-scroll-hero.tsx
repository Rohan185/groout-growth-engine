"use client";

import React, { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface VideoScrollHeroProps {
  videoSrc?: string;
  headline?: ReactNode;
  subtext?: string;
  enableAnimations?: boolean;
  className?: string;
  startScale?: number;
  /** Total height of the scroll stage, in vh. Larger = longer scroll to reach full size. */
  stageHeightVh?: number;
}

export function VideoScrollHero({
  // ⚠️ PLACEHOLDER reel — swap for GroOut's real showreel (.mp4).
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  headline = (
    <>
      Everything we make points <span className="italic text-grow">up and to the right.</span>
    </>
  ),
  subtext = "A taste of the work. Scroll to watch it grow.",
  enableAnimations = true,
  className = "",
  startScale = 0.25,
  stageHeightVh = 200,
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollScale, setScrollScale] = useState(startScale);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Scroll progress based on the container's position in the viewport
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const progress = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0;

      // Scale from startScale up to 1
      const newScale = startScale + progress * (1 - startScale);
      setScrollScale(newScale);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableAnimations, shouldReduceMotion, startScale]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  return (
    <div className={`relative ${className}`}>
      {/* Scroll-scale stage */}
      <div ref={containerRef} className="relative bg-background" style={{ height: `${stageHeightVh}vh` }}>
        {/* Fixed video container */}
        <div className="sticky top-0 z-10 flex h-screen w-full items-center justify-center overflow-hidden">
          <div
            className="relative flex items-center justify-center will-change-transform"
            style={{
              transform: shouldAnimate ? `scale(${scrollScale})` : "scale(1)",
              transformOrigin: "center center",
            }}
          >
            <video
              autoPlay={!shouldReduceMotion}
              loop
              muted
              playsInline
              aria-label="GroOut showreel"
              className="h-[60vh] w-[80vw] max-w-5xl rounded-2xl object-cover shadow-2xl"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay content */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="px-6 text-center text-white">
                <motion.h2
                  className="font-display text-2xl font-medium leading-[1.05] tracking-[-0.01em] md:text-4xl lg:text-6xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 200, damping: 25 }}
                >
                  {headline}
                </motion.h2>
                <motion.p
                  className="mx-auto mt-4 max-w-2xl text-sm text-white/80 md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8, type: "spring", stiffness: 200, damping: 25 }}
                >
                  {subtext}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
