"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import GalleryCube from "./GalleryCube";

export default function GalleryCubeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.7} />
            <pointLight position={[3, 3, 3]} intensity={0.6} />
            <Suspense fallback={null}>
                <GalleryCube />
            </Suspense>
            <EffectComposer>
                <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.8} />
            </EffectComposer>
        </Canvas>
    );
}