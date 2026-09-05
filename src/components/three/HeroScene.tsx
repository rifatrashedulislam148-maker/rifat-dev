"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ParticleField from "./ParticleField";
import CameraRig from "./CameraRig";

export default function HeroScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.5} />
            <ParticleField />
            <CameraRig />
            <EffectComposer>
                <Bloom
                    intensity={0.6}
                    luminanceThreshold={0.15}
                    luminanceSmoothing={0.9}
                />
            </EffectComposer>
        </Canvas>
    );
}