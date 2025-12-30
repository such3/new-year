'use client';

import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function ProposalEffect() {
    const currentSection = useStore(state => state.currentSection);
    /*
       User requested: "remove that first golden splash , keep the last one"
       So ONLY show on Section 8 (New Year).
    */
    const visible = currentSection === 8;

    const points = useRef<THREE.Points>(null);

    // Create golden dust particles
    const particleCount = 200;
    const [positions, opacity] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const op = new Float32Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
            const r = (Math.random() * 2 + 0.5); // Radius
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);

            op[i] = Math.random();
        }
        return [pos, op];
    }, []);

    useFrame((state, delta) => {
        if (!points.current) return;

        // Expand efficiently if active
        // Only active on Section 8 (New Year) as requested
        if (visible) {
            points.current.rotation.y += delta * 0.1;
            points.current.scale.lerp(new THREE.Vector3(2, 2, 2), delta);
            (points.current.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp(
                (points.current.material as THREE.PointsMaterial).opacity,
                0.8,
                delta
            );
        } else {
            points.current.scale.lerp(new THREE.Vector3(0.1, 0.1, 0.1), delta * 2);
            (points.current.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp(
                (points.current.material as THREE.PointsMaterial).opacity,
                0,
                delta * 5
            );
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#ffd700"
                transparent
                opacity={0}
                blending={THREE.AdditiveBlending}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
}
