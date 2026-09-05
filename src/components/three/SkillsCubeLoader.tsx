"use client";

import dynamic from "next/dynamic";

const SkillsCubeScene = dynamic(() => import("./SkillsCubeScene"), {
    ssr: false,
});

export default function SkillsCubeLoader() {
    return (
        <div className="h-105 w-full sm:h-120">
            <SkillsCubeScene />
        </div>
    );
}