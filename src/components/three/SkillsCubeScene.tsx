"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SkillsCube from "./SkillsCube";

export default function SkillsCubeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.6} />
            <pointLight position={[3, 3, 3]} intensity={0.8} />
            <SkillsCube />
            <EffectComposer>
                <Bloom intensity={0.9} luminanceThreshold={0.1} luminanceSmoothing={0.8} />
            </EffectComposer>
        </Canvas>
    );
}