'use client';

import { useMemo, useState } from 'react';
import { Html, Line } from '@react-three/drei';
import { useStore } from '@/store/useStore';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ConstellationData = {
    sectionId: number;
    points: [number, number, number][];
    label: string;
    description: string;
    color?: string;
};

// Custom shapes for the constellations
// Simple approximations using points
const MAGGIE_BOWL: [number, number, number][] = [
    [-0.5, 0.2, 0], [0.5, 0.2, 0], [0.3, -0.3, 0], [-0.3, -0.3, 0], [-0.5, 0.2, 0] // Bowl text
];

const HEART_SHAPE: [number, number, number][] = [
    [0, -0.5, 0], [-0.5, 0.2, 0], [-0.2, 0.5, 0], [0, 0.2, 0], [0.2, 0.5, 0], [0.5, 0.2, 0], [0, -0.5, 0]
];

const CONSTELLATIONS_LIST: ConstellationData[] = [
    {
        sectionId: 4, // First Outing - Maggie
        points: MAGGIE_BOWL,
        label: "First Outing",
        description: "Maggie & Perfect Company 🍜",
        color: "#ffd700"
    },
    {
        sectionId: 5, // First Date - Court Circle
        points: HEART_SHAPE,
        label: "Court Circle",
        description: "Under the city lights",
        color: "#ff69b4" // Pinkish
    },
    {
        sectionId: 7, // Tiffen House
        points: MAGGIE_BOWL.map(p => [p[0] + 0.1, p[1] + 0.1, p[2]] as [number, number, number]), // Reuse bowl slightly offset
        label: "Tiffen House",
        description: "Love felt easy",
        color: "#aabfff"
    }
];

function ConstellationItem({ data }: { data: ConstellationData }) {
    const [hovered, setHovered] = useState(false);

    return (
        <group>
            <Line
                points={data.points}
                color={data.color || "white"}
                opacity={0.6}
                transparent
                lineWidth={2}
            />
            {/* Interactive Stars at vertices */}
            {data.points.map((p, i) => (
                <mesh key={i} position={p} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color={hovered ? "white" : data.color || "#ffd700"} />
                </mesh>
            ))}

            <Html distanceFactor={8} position={[0, -1, 0]} style={{ pointerEvents: 'none', transition: 'opacity 0.5s' }}>
                <div style={{
                    opacity: hovered ? 1 : 0,
                    background: 'rgba(10, 5, 20, 0.9)',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${data.color}`,
                    color: 'white',
                    width: '180px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-main)'
                }}>
                    <h4 style={{ margin: 0, color: data.color }}>{data.label}</h4>
                    <p style={{ margin: '5px 0 0', fontSize: '0.8rem', opacity: 0.8 }}>{data.description}</p>
                </div>
            </Html>
        </group>
    )
}

export default function Constellations() {
    const currentSection = useStore(state => state.currentSection);
    const group = useMemo(() => new THREE.Group(), []);

    useFrame(() => {
        group.rotation.y += 0.001;
        group.rotation.z += 0.0005;
    });

    // Find active constellation for this section
    const activeConstellation = CONSTELLATIONS_LIST.find(c => c.sectionId === currentSection);

    if (!activeConstellation) return null;

    return (
        <primitive object={group} position={[0, 0, 0]}>
            <ConstellationItem data={activeConstellation} />
        </primitive>
    );
}
