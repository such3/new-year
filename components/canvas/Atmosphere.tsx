'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import * as THREE from 'three';
import { useEffect } from 'react';

export default function Atmosphere() {
    const { scene } = useThree();
    const currentSection = useStore(state => state.currentSection);

    useEffect(() => {
        // Setup fog
        scene.fog = new THREE.FogExp2('#05020a', 0.02);
    }, [scene]);

    useFrame((state, delta) => {
        let targetColor = new THREE.Color('#05020a'); // Default Deep Black
        let targetDensity = 0.02;

        switch (currentSection) {
            case 0: // Silence
                targetColor.set('#020104');
                targetDensity = 0.03; // Dense, dark
                break;
            case 2: // Call (Blue/Warm)
            case 3: // Library
                targetColor.set('#0f0a1f'); // Deep Purple
                targetDensity = 0.015; // Opening up
                break;
            case 6: // Proposal (Gold)
                targetColor.set('#1a1000'); // Deep Gold-Black
                targetDensity = 0.01;
                break;
            case 8: // New Year
                targetColor.set('#1f1429'); // Bright Deep Lavender
                targetDensity = 0.01;
                break;
        }

        // Lerp fog color
        if (scene.fog) {
            // @ts-ignore
            scene.fog.color.lerp(targetColor, delta * 0.5);
            // @ts-ignore
            scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, targetDensity, delta * 0.5);
        }

        // Also clear color for background
        // scene.background = scene.fog.color; (Optional, but fog covers it mostly)
    });

    return null;
}
