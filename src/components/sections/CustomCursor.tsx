"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [visible, setVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const ringX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
    const ringY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsTouch(true);
            return;
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!visible) setVisible(true);

            const target = e.target as HTMLElement;
            setIsPointer(!!target.closest("a, button, [data-cursor-hover]"));
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY, visible]);

    if (isTouch || !visible) return null;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-100 h-2 w-2 rounded-full bg-white mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-100 rounded-full border border-white mix-blend-difference"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isPointer ? 56 : 32,
                    height: isPointer ? 56 : 32,
                    opacity: isPointer ? 0.9 : 0.5,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            />
        </>
    );
}