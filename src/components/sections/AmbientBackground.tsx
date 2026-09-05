"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
            <motion.div
                animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-40 top-0 h-128 w-lg rounded-full bg-purple-600/10 blur-[140px]"
            />
            <motion.div
                animate={{ x: [0, -60, 0], y: [0, -50, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-1/3 h-112 w-md rounded-full bg-blue-500/10 blur-[140px]"
            />
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, 60, 0] }}
                transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-1/3 h-104 w-104 rounded-full bg-purple-500/10 blur-[140px]"
            />
        </div>
    );
}