'use client';

import { useEffect, useRef, useState } from 'react';

export default function AudioControl() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const startAudio = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(e => {
                    console.log("Audio autoplay blocked, waiting for more interaction");
                });
            }
        };

        window.addEventListener('scroll', startAudio);
        window.addEventListener('click', startAudio);

        return () => {
            window.removeEventListener('scroll', startAudio);
            window.removeEventListener('click', startAudio);
        }
    }, [isPlaying]);

    return (
        <audio ref={audioRef} loop>
            {/* Placeholder source - user should replace this or I can provide a public domain ambient link */}
            <source src="https://assets.mixkit.co/music/preview/mixkit-space-traveller-1099.mp3" type="audio/mp3" />
        </audio>
    );
}
