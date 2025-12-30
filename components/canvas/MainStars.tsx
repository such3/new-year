'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import * as THREE from 'three';
import { Trail, Html } from '@react-three/drei';

interface StarProps {
    position?: [number, number, number];
    color: string;
    size?: number;
    label?: string;
}

function Star({ position, color, size = 1, label }: StarProps) {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    return (
        <group
            position={position}
            onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
        >
            <mesh ref={mesh}>
                <sphereGeometry args={[0.2 * size, 32, 32]} />
                <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            {/* Glow Halo - pulses on hover */}
            <mesh scale={hovered ? [3, 3, 3] : [2, 2, 2]}>
                <sphereGeometry args={[0.2 * size, 32, 32]} />
                <meshBasicMaterial color={color} transparent opacity={hovered ? 0.6 : 0.3} toneMapped={false} />
            </mesh>
            {/* Point Light */}
            <pointLight color={color} intensity={hovered ? 4 : 2} distance={5} decay={2} />

            {/* Label - Only on Hover */}
            <Html
                position={[0, -0.6 * size, 0]}
                center
                distanceFactor={6}
                zIndexRange={[100, 0]}
                style={{
                    pointerEvents: 'none',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.2s',
                    transform: `scale(${hovered ? 1 : 0.8})`
                }}
            >
                <div style={{
                    color: color,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    textShadow: '0 0 10px rgba(0,0,0,1)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '1px',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: `1px solid ${color}`
                }}>
                    {label}
                </div>
            </Html>
        </group>
    );
}

function Pulse({ active, color }: { active: boolean, color: string }) {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (!mesh.current) return;
        if (active) {
            const speed = 3;
            const scale = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.2;
            mesh.current.scale.set(scale, scale, scale);
            (mesh.current.material as THREE.MeshBasicMaterial).opacity = 0.5;
        } else {
            mesh.current.scale.set(0, 0, 0);
        }
    });

    return (
        <mesh ref={mesh} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.65, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
    )
}

export default function MainStars() {
    const group = useRef<THREE.Group>(null);
    const starA = useRef<THREE.Group>(null); // Him
    const starB = useRef<THREE.Group>(null); // Her
    const currentSection = useStore(state => state.currentSection);
    const { viewport } = useThree();

    const autoRotation = useRef(0);

    // Random positions (Phase 0)
    const randomStartA = useMemo(() => new THREE.Vector3(
        (Math.random() - 0.5) * Math.min(viewport.width - 2, 4),
        (Math.random() - 0.5) * Math.min(viewport.height - 2, 2),
        0
    ), [viewport]);

    const randomStartB = useMemo(() => new THREE.Vector3(
        (Math.random() - 0.5) * Math.min(viewport.width - 2, 4),
        (Math.random() - 0.5) * Math.min(viewport.height - 2, 2),
        0
    ), [viewport]);

    useFrame((state, delta) => {
        const t = useStore.getState().scrollProgress;

        // ORBIT LOGIC
        const maxDist = 4.0;
        const lockDist = 0.9;
        let currentOrbitDist = maxDist;
        if (t < 0.75) {
            currentOrbitDist = THREE.MathUtils.lerp(maxDist, lockDist, t / 0.75);
        } else {
            currentOrbitDist = lockDist;
        }

        // ROTATION
        if (t > 0.8) {
            autoRotation.current += delta * 2;
        }
        const scrollRotation = t < 0.75 ? t * Math.PI * 4 : t * Math.PI * 8;
        const totalRotation = scrollRotation + autoRotation.current;

        // Position Calcs
        const orbitPosA = new THREE.Vector3(-currentOrbitDist, 0, 0);
        const orbitPosB = new THREE.Vector3(currentOrbitDist, 0, 0);

        const transitionP = THREE.MathUtils.clamp((t - 0.05) * 10, 0, 1);

        if (group.current) {
            group.current.rotation.z = totalRotation * 0.5 * transitionP;
            group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 * transitionP;
        }

        if (starA.current && starB.current) {
            starA.current.position.lerpVectors(randomStartA, orbitPosA, transitionP);
            starB.current.position.lerpVectors(randomStartB, orbitPosB, transitionP);
        }
    });

    const pulseActive = currentSection === 1 || currentSection === 2 || currentSection === 6;
    const isEnd = currentSection >= 6;

    return (
        <group ref={group}>
            <group ref={starA}>
                {/* HIM (Blue) -> Chuchi */}
                <Trail width={isEnd ? 0.6 : 0.2} length={isEnd ? 16 : 5} color={'#aabfff'} attenuation={(t) => t * t}>
                    <Star color="#aabfff" size={1.5} label="Chuchi" />
                </Trail>
                <Pulse active={pulseActive} color="#aabfff" />
            </group>
            <group ref={starB}>
                {/* HER (Pink) -> Giddu */}
                <Trail width={isEnd ? 0.6 : 0.2} length={isEnd ? 16 : 5} color={'#ffb7d5'} attenuation={(t) => t * t}>
                    <Star color="#ffb7d5" size={1.3} label="Giddu" />
                </Trail>
                <Pulse active={pulseActive} color="#ffb7d5" />
            </group>
        </group>
    );
}
