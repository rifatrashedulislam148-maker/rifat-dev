"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Scroll
            </span>
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-9 w-6 items-start justify-center rounded-full border border-muted-foreground/40 p-1.5"
            >
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            </motion.div>
        </motion.div>
    );
}