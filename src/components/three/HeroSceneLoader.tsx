"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
    ssr: false,
});

export default function HeroSceneLoader() {
    return (
        <div className="absolute inset-0 -z-10">
            <HeroScene />
        </div>
    );
}