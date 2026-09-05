"use client";

import dynamic from "next/dynamic";

const HeroPhotoCubeScene = dynamic(() => import("./HeroPhotoCubeScene"), {
    ssr: false,
});

export default function HeroPhotoCubeLoader() {
    return <HeroPhotoCubeScene />;
}