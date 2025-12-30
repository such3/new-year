'use client';

import { Stars, Float, Sparkles, PresentationControls } from '@react-three/drei';
import MainStars from './MainStars';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

import Constellations from './Constellations';
import Planet from './Planet';
import ProposalEffect from './ProposalEffect';
import HeartParticles from './HeartParticles';

export default function Universe() {
    const bgStarsRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (bgStarsRef.current) {
            // Background rotates slowly forever
            bgStarsRef.current.rotation.y += delta * 0.05;

            // Move background backward based on scroll to simulate forward travel
            const scrollProgress = useStore.getState().scrollProgress; // Direct access
            bgStarsRef.current.position.z = -scrollProgress * 10;
        }
    });

    return (
        <group>
            {/* Background Stars - static/ambient */}
            <group ref={bgStarsRef}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </group>

            {/* Magical Ambient Dust */}
            <Sparkles count={300} scale={15} size={2} speed={0.4} opacity={0.5} noise={0.2} color="#fff8e7" />

            {/* The Main Narrative Elements - Lifted slightly for cinematic framing */}
            {/* Wrapped in PresentationControls for interactive parallax */}
            <PresentationControls
                global={false}
                cursor={false}
                snap={true}
                speed={1}
                zoom={1}
                rotation={[0, 0, 0]}
                polar={[-0.1, 0.1]}
                azimuth={[-0.1, 0.1]}
            >
                <group position={[0, 1.2, 0]}>
                    <HeartParticles />
                    <Constellations />
                    <Planet />
                    <ProposalEffect />
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <MainStars />
                    </Float>
                </group>
            </PresentationControls>
        </group>
    );
}
