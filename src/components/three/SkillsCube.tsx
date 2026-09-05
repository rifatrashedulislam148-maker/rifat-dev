"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { SiReact, SiNodedotjs, SiJavascript, SiGit } from "react-icons/si";

const RADIUS = 1.9;

const faces = [
    { title: "Frontend", Icon: SiReact, color: "#a78bfa" },
    { title: "Backend & DB", Icon: SiNodedotjs, color: "#7dd3fc" },
    { title: "Languages", Icon: SiJavascript, color: "#a78bfa" },
    { title: "Tools", Icon: SiGit, color: "#7dd3fc" },
];

function CubeFace({
    index,
    title,
    Icon,
    color,
}: {
    index: number;
    title: string;
    Icon: React.ComponentType<{ size?: number; color?: string }>;
    color: string;
}) {
    const angle = (index / faces.length) * Math.PI * 2;
    const x = Math.sin(angle) * RADIUS;
    const z = Math.cos(angle) * RADIUS;

    return (
        <group position={[x, 0, z]} rotation={[0, angle, 0]}>
            <mesh>
                <planeGeometry args={[2.2, 2.6]} />
                <meshStandardMaterial
                    color="#120e24"
                    transparent
                    opacity={0.55}
                    side={THREE.DoubleSide}
                    emissive={color}
                    emissiveIntensity={0.15}
                />
            </mesh>
            <Html center position={[0, 0, 0.05]} style={{ pointerEvents: "none" }}>
                <div className="flex w-28 flex-col items-center gap-2">
                    <Icon size={40} color={color} />
                    <span className="text-xs font-medium text-white/90">{title}</span>
                </div>
            </Html>
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
            const scale = 0.5 + progress * 2.5;
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

export default function SkillsCube() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += 0.004 + state.pointer.x * 0.002;
    });

    return (
        <group ref={groupRef}>
            {faces.map((face, i) => (
                <CubeFace key={face.title} index={i} {...face} />
            ))}
            <EnergyPulse />
        </group>
    );
}