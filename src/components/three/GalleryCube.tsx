"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 2.1;
const photos = ["/gallery-1.png", "/gallery-2.png", "/gallery-3.png", "/gallery-4.png"];

function GalleryFace({ index, url }: { index: number; url: string }) {
    const texture = useTexture(url);
    const angle = (index / photos.length) * Math.PI * 2;
    const x = Math.sin(angle) * RADIUS;
    const z = Math.cos(angle) * RADIUS;

    return (
        <group position={[x, 0, z]} rotation={[0, angle, 0]}>
            <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[2.5, 2.5]} />
                <meshBasicMaterial color="#7f77dd" transparent opacity={0.35} />
            </mesh>
            <mesh>
                <planeGeometry args={[2.3, 2.3]} />
                <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
        </group>
    );
}

function EnergyPulse() {
    const ringRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() % 3;
        const progress = t / 3;
        if (ringRef.current) {
            const scale = 0.6 + progress * 2.8;
            ringRef.current.scale.set(scale, scale, scale);
        }
        if (materialRef.current) {
            materialRef.current.opacity = 0.5 * (1 - progress);
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1, 1.05, 64]} />
            <meshBasicMaterial
                ref={materialRef}
                color="#7f77dd"
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export default function GalleryCube() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += 0.003 + state.pointer.x * 0.0015;
    });

    return (
        <group ref={groupRef}>
            {photos.map((url, i) => (
                <GalleryFace key={url} index={i} url={url} />
            ))}
            <EnergyPulse />
        </group>
    );
}