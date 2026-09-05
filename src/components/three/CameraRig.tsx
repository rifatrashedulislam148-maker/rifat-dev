"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraRig() {
    useFrame((state) => {
        const { camera, pointer } = state;

        camera.position.x = THREE.MathUtils.lerp(
            camera.position.x,
            pointer.x * 0.5,
            0.04
        );
        camera.position.y = THREE.MathUtils.lerp(
            camera.position.y,
            pointer.y * 0.3,
            0.04
        );
        camera.lookAt(0, 0, 0);
    });

    return null;
}