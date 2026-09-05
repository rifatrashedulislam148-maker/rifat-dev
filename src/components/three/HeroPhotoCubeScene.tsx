"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import HeroPhotoCube from "./HeroPhotoCube";

export default function HeroPhotoCubeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 2.8], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.8} />
            <Suspense fallback={null}>
                <HeroPhotoCube />
            </Suspense>
        </Canvas>
    );
}