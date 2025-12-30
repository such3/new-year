'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import * as THREE from 'three';

export default function WarpParticles() {
    const count = 1000;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const lastScroll = useRef(0);

    // Initial random positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 50;
            const size = Math.random() * 0.1 + 0.02;
            temp.push({ x, y, z, size });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!mesh.current) return;
        const scroll = useStore.getState().scrollProgress;

        // Calculate velocity based on scroll delta
        // We can approximate it by comparing scroll to last frame?
        // Actually simpler: just use delta if we can access speed, but scrollProgress is absolute.
        // Let's use difference.
        const scrollDelta = Math.abs(scroll - lastScroll.current);
        lastScroll.current = scroll;

        // Apply visual stretch based on velocity
        // High delta -> High stretch
        const stretch = Math.min(1 + scrollDelta * 200, 20); // Cap stretch

        particles.forEach((p, i) => {
            dummy.position.set(p.x, p.y, p.z);

            // Warp Effect: Scale Z based on speed
            dummy.scale.set(1, 1, stretch);
            dummy.rotation.set(0, 0, 0); // Reset rotation to align stretch withZ

            // Move them slightly to feel alive
            dummy.position.z += delta * 0.5;
            if (dummy.position.z > 20) dummy.position.z = -30;

            dummy.updateMatrix();
            mesh.current?.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </instancedMesh>
    );
}
