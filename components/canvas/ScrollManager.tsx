'use client';

import { useScroll, ScrollControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';
import { STORY_SECTIONS } from '@/data/story';
import { useEffect } from 'react';

function ScrollHandler() {
    const scroll = useScroll();
    const setScrollProgress = useStore(state => state.setScrollProgress);
    const setCurrentSection = useStore(state => state.setCurrentSection);

    useFrame(() => {
        // Current scroll offset (0 to 1)
        const offset = scroll.offset;
        setScrollProgress(offset);

        // Calculate current section based on scroll segments
        // We have STORY_SECTIONS.length sections.
        const totalSections = STORY_SECTIONS.length;
        // Section index is roughly offset * (totalSections - 1)
        const sectionIndex = Math.min(
            Math.floor(offset * totalSections),
            totalSections - 1
        );

        setCurrentSection(sectionIndex);
    });

    return null;
}

export default function ScrollManager() {
    // pages = scroll length. 
    // pages = scroll length.
    // snap: locks to 1/pages. With 9 pages, it locks to each section.
    // damping: 0.5 (heavy cinematic feel)
    return (
        <ScrollControls
            pages={STORY_SECTIONS.length}
            damping={0.5}
            // @ts-ignore
            snap={{ mass: 4, tension: 150 }}
        >
            <ScrollHandler />
        </ScrollControls>
    );
}
