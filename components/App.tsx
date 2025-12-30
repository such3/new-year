'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });
const Interface = dynamic(() => import('@/components/dom/Interface'), { ssr: false });
const AudioControl = dynamic(() => import('@/components/dom/AudioControl'), { ssr: false });

export default function App() {
    return (
        <>
            <Scene />
            <Interface />
            <AudioControl />
        </>
    );
}
