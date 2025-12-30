'use client';

import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Planet() {
    const mesh = useRef<THREE.Group>(null);
    const currentSection = useStore(state => state.currentSection);

    // Visible from Section 4 ("Shared Gravity") onwards
    // id: 3 is Shared Gravity? Let's check story.ts.
    // id: 3 -> "Shared Gravity"
    // id: 4 -> "Constellations"
    // So visible if currentSection >= 3

    const isVisible = currentSection >= 3;

    useFrame((state, delta) => {
        if (!mesh.current) return;

        // Rotate the planet
        mesh.current.rotation.y += delta * 0.2;

        // Smooth fade in/out
        const targetScale = isVisible ? 1 : 0;
        mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2);
    });

    return (
        <group ref={mesh} visible={isVisible} scale={[0, 0, 0]}>
            {/* Core Planet */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#4b0082" // Indigo/Deep Purple
                    roughness={0.8}
                    emissive="#1a0b2e"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Atmosphere Glow */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial
                    color="#9932cc"
                    transparent
                    opacity={0.3}
                    side={THREE.BackSide} /* Fake atmosphere */
                />
            </mesh>

            {/* Ring */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[0.8, 0.02, 16, 100]} />
                <meshBasicMaterial color="#ffd700" transparent opacity={0.6} />
            </mesh>
        </group>
    );
}
