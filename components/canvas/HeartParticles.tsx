'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import * as THREE from 'three';
import { Instance, Instances } from '@react-three/drei';

function Heart({ position, scale = 1, speed }: { position: [number, number, number], scale: number, speed: number }) {
    const ref = useRef<THREE.Group>(null);
    const randomOffset = useMemo(() => Math.random() * 100, []);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime + randomOffset;

        // Float up and wiggle
        ref.current.position.y += speed * 0.01;
        ref.current.position.x += Math.sin(t * 2) * 0.005;
        // Flip 180 degrees (Math.PI) so they point up + wiggle
        ref.current.rotation.z = Math.PI + Math.sin(t) * 0.1;

        // Reset if too high
        if (ref.current.position.y > 5) {
            ref.current.position.y = -2;
        }
    })

    return (
        <group ref={ref} position={position} scale={scale}>
            <Instance />
        </group>
    )
}

export default function HeartParticles() {
    const currentSection = useStore(state => state.currentSection);
    const visible = currentSection === 6; // PROPOSAL ONLY

    const heartShape = useMemo(() => {
        const x = 0, y = 0;
        const heartShape = new THREE.Shape();
        heartShape.moveTo(x + 0.25, y + 0.25);
        heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.20, y, x, y);
        heartShape.bezierCurveTo(x - 0.30, y, x - 0.30, y + 0.35, x - 0.30, y + 0.35);
        heartShape.bezierCurveTo(x - 0.30, y + 0.55, x - 0.10, y + 0.77, x + 0.25, y + 0.95);
        heartShape.bezierCurveTo(x + 0.60, y + 0.77, x + 0.80, y + 0.55, x + 0.80, y + 0.35);
        heartShape.bezierCurveTo(x + 0.80, y + 0.35, x + 0.80, y, x + 0.50, y);
        heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
        return heartShape;
    }, []);

    if (!visible) return null;

    return (
        <Instances range={50}>
            <extrudeGeometry args={[heartShape, { depth: 0.1, bevelEnabled: false }]} />
            <meshBasicMaterial color="#ff69b4" toneMapped={false} transparent opacity={0.8} />

            {Array.from({ length: 30 }).map((_, i) => (
                <Heart
                    key={i}
                    position={[
                        (Math.random() - 0.5) * 4,
                        (Math.random() - 0.5) * 2 - 1,
                        (Math.random() - 0.5) * 2
                    ]}
                    scale={0.1 + Math.random() * 0.1}
                    speed={0.5 + Math.random()}
                />
            ))}
        </Instances>
    );
}
