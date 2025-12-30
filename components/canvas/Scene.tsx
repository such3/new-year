'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { Suspense } from 'react';
import * as THREE from 'three';
import Universe from './Universe';
import ScrollManager from './ScrollManager';

import Atmosphere from './Atmosphere';

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ background: '#05020a' }}
            dpr={[1, 2]} // Quality scaling
        >
            <Suspense fallback={null}>
                <Atmosphere />
                <ScrollManager />
                <Universe />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.2}
                        mipmapBlur
                        intensity={0.8}
                        radius={0.4}
                    />
                    <Noise opacity={0.02} />
                    <ChromaticAberration offset={[new THREE.Vector2(0.002, 0.002)]} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Suspense>
        </Canvas>
    );
}
