"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 1.05;
const photos = ["/gallery-1.png", "/gallery-2.png", "/gallery-4.png", "/profile.png"];

function CubeFace({ index, url }: { index: number; url: string }) {
    const texture = useTexture(url);
    const angle = (index / photos.length) * Math.PI * 2;
    const x = Math.sin(angle) * RADIUS;
    const z = Math.cos(angle) * RADIUS;

    return (
        <group position={[x, 0, z]} rotation={[0, angle, 0]}>
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[1.55, 1.55]} />
                <meshBasicMaterial color="#7f77dd" transparent opacity={0.35} />
            </mesh>
            <mesh>
                <planeGeometry args={[1.4, 1.4]} />
                <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
        </group>
    );
}

export default function HeroPhotoCube() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += 0.5 * delta;
    });

    return (
        <group ref={groupRef}>
            {photos.map((url, i) => (
                <CubeFace key={url} index={i} url={url} />
            ))}
        </group>
    );
}