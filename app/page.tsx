"use client";

import { motion, Variants } from "framer-motion";
import HeroSceneLoader from "@/components/three/HeroSceneLoader";
import ScrollIndicator from "@/components/sections/ScrollIndicator";
import AboutMe from "@/components/sections/AboutMe";
import Typewriter from "@/components/sections/Typewriter";
import GallerySection from "@/components/sections/GallerySection";
import SkillsSection from "@/components/sections/SkillsSection";
import HeroSidePhotos from "@/components/sections/HeroSidePhotos";

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
    <>
      <main className="relative min-h-screen overflow-hidden">
        <HeroSceneLoader />

        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <HeroSidePhotos />

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
              data-text="Rashedul Islam Rifat"
              className="glitch-wrap text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(127,119,221,0.35)]"
            >
              Rashedul Islam Rifat
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg text-muted-foreground sm:text-xl"
            >
              <Typewriter
                text="CSE Student • Full-Stack Developer • AI & Research Enthusiast"
                startDelay={1400}
              />
            </motion.p>
          </motion.div>

          <ScrollIndicator />
        </section>
      </main>

      <AboutMe />
      <GallerySection />
      <SkillsSection />
    </>
  );
}