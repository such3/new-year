'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Trail } from '@react-three/drei';

function ShootingStar() {
    const mesh = useRef<THREE.Mesh>(null);
    const speed = useRef(Math.random() * 0.5 + 0.2);
    const offset = useRef(Math.random() * 100);

    // Random start position
    const startPos = useMemo(() => new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        -10 - Math.random() * 20
    ), []);

    useFrame((state) => {
        if (!mesh.current) return;

        // Move across screen
        const t = (state.clock.elapsedTime + offset.current) * speed.current;
        const loopT = t % 10; // Loop every 10 arbitrary units

        // Active phase: shoot across
        if (loopT < 2) {
            const progress = loopT / 2;
            // Move from right to left, slightly down
            mesh.current.position.x = startPos.x - progress * 40;
            mesh.current.position.y = startPos.y - progress * 10;
            mesh.current.position.z = startPos.z;
            (mesh.current.material as THREE.MeshBasicMaterial).opacity = 1;
        } else {
            // Reset/Hide
            (mesh.current.material as THREE.MeshBasicMaterial).opacity = 0;
            mesh.current.position.copy(startPos);
        }
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="white" transparent />
            {/* Trail is tricky with individual star loop reset, 
                let's just use a long thin mesh for the tail instead of Trail component for performance */}
            <mesh position={[2, 0.5, 0]} rotation={[0, 0, -0.2]}>
                <boxGeometry args={[4, 0.02, 0.02]} />
                <meshBasicMaterial color="white" transparent opacity={0.5} />
            </mesh>
        </mesh>
    );
}

export default function Meteors() {
    // Create 5 meteors
    return (
        <group>
            {Array.from({ length: 5 }).map((_, i) => (
                <ShootingStar key={i} />
            ))}
        </group>
    );
}
