import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MiniGlobe from "./MiniGlobe";

export default function Hero() {
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 300], [0, -6]); // tiny drift

  return (
    <section className="relative min-h-[88vh] overflow-hidden border-b border-white/5">
      {/* BG layers */}
      <div className="hero-bg">
        <motion.div className="hero-dna" style={{ y: parallax }} aria-hidden />
        <div className="hero-vignette" aria-hidden />
      </div>

      {/* Content */}
      <div className="container-wrap relative z-10 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center py-24">
        <div>
          <motion.h1
            className="text-[clamp(40px,6vw,80px)] font-semibold tracking-tight"
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}
          >
            AI + Human… <span className="text-gold">with soul.</span>
          </motion.h1>

          <motion.p
            className="mt-3 text-muted max-w-[52ch]"
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:.08 }}
          >
            Sovereign AI agents that respect your data, privacy, and humanity.
          </motion.p>

          <motion.div
            className="mt-6 flex gap-3"
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:.16 }}
          >
            <a href="#chat" className="btn btn-gold">Start a Demo</a>
            <a href="/globe" className="btn btn-ghost">Explore the Globe</a>
          </motion.div>
        </div>

        {/* Mini globe teaser */}
        <div className="relative">
          <div className="rounded-2xl border border-edge/60 bg-panel/60 p-3">
            <MiniGlobe height={320} />
          </div>
          <div className="mt-2 text-xs text-[#8fb3ff]">
            Real-time sovereignty visualizer · ravens in orbit
          </div>
        </div>
      </div>
    </section>
  );
}
