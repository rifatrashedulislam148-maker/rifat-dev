"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
    text,
    speed = 35,
    startDelay = 0,
    className,
}: {
    text: string;
    speed?: number;
    startDelay?: number;
    className?: string;
}) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        let interval: ReturnType<typeof setInterval>;
        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                i++;
                setDisplayed(text.slice(0, i));
                if (i >= text.length) clearInterval(interval);
            }, speed);
        }, startDelay);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [text, speed, startDelay]);

    return (
        <span className={className}>
            {displayed}
            <span className="animate-pulse">▍</span>
        </span>
    );
}