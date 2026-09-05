"use client";

import { motion } from "framer-motion";
import GalleryCubeLoader from "@/components/three/GalleryCubeLoader";

export default function GallerySection() {
    return (
        <section
            id="gallery"
            className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-24"
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
                Gallery
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-linear-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            >
                Moments
            </motion.h2>

            <p className="mb-4 max-w-lg text-center text-sm text-muted-foreground">
                Move your mouse — explore the gallery.
            </p>

            <GalleryCubeLoader />
        </section>
    );
}