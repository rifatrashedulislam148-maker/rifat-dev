"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function generateSpherePoints(count: number, radius: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = radius * Math.cbrt(Math.random());
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
}

export default function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);
    const positions = useMemo(() => generateSpherePoints(2000, 1.8), []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const { pointer } = state;

        pointsRef.current.rotation.y += 0.0006 + pointer.x * 0.0015;
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(
            pointsRef.current.rotation.x,
            pointer.y * 0.15,
            0.03
        );
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                color="#7f77dd"
                size={0.012}
                sizeAttenuation
                depthWrite={false}
            />
        </Points>
    );
}