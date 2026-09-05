"use client";

import dynamic from "next/dynamic";

const GalleryCubeScene = dynamic(() => import("./GalleryCubeScene"), {
    ssr: false,
});

export default function GalleryCubeLoader() {
    return (
        <div className="h-105 w-full sm:h-120">
            <GalleryCubeScene />
        </div>
    );
}