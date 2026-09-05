"use client";

import Image from "next/image";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import HeroPhotoCubeLoader from "@/components/three/HeroPhotoCubeLoader";

function useTilt() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
        stiffness: 150,
        damping: 15,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
        stiffness: 150,
        damping: 15,
    });

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

function RightPhoto() {
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt();

    return (
        <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="pointer-events-auto absolute right-6 top-1/2 hidden -translate-y-1/2 md:block lg:right-16"
        >
            <div className="relative">
                <div className="absolute -inset-2 rounded-2xl bg-linear-to-br from-purple-500/30 to-blue-400/30 blur-xl" />
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ rotateX, rotateY, transformPerspective: 700 }}
                    className="relative h-40 w-32 overflow-hidden rounded-2xl border border-white/10 opacity-80 sm:h-52 sm:w-40"
                >
                    <Image src="/profile.png" alt="" fill className="object-cover" />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function HeroSidePhotos() {
    return (
        <>
            <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute left-6 top-1/2 hidden h-40 w-32 -translate-y-1/2 md:block lg:left-16 sm:h-52 sm:w-40"
            >
                <HeroPhotoCubeLoader />
            </motion.div>

            <RightPhoto />
        </>
    );
}