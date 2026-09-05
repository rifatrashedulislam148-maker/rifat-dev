"use client";

import { motion, Variants } from "framer-motion";
import HeroSceneLoader from "@/components/three/HeroSceneLoader";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeroSceneLoader />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Build → Learn → Research → Share
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(127,119,221,0.35)]"
          >
            Rashedul Islam Rifat
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg text-muted-foreground sm:text-xl"
          >
            CSE Student • Full-Stack Developer • AI & Research Enthusiast
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}