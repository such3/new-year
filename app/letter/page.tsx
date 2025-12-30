'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import Link from 'next/link';

// Sample Letter
const LETTER_CONTENT = `
My Dearest Giddu,

From the moment our paths crossed, my universe changed. 
Every silence we shared became a comfortable melody, and every laugh a spark that lit up my world.

You are my gravity, keeping me grounded while letting me fly. 
Through the years of silence to our first signal, and now to this beautiful forever...
I promise to be your constant star, orbiting you with love, today, tomorrow, and always.

Happy New Year 2026.

Forever yours,
`;

function LetterBackground() {
    return (
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <color attach="background" args={['#05020a']} />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
            <Sparkles count={100} scale={10} size={2} speed={0.2} opacity={0.3} color="#ffd700" />
        </Canvas>
    )
}

function Signature() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            style={{
                marginTop: '1rem',
                position: 'relative',
                display: 'inline-block'
            }}
        >
            <svg width="600" height="150" viewBox="0 0 600 150" style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="50%" stopColor="#ffec8b" />
                        <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>

                    <clipPath id="clip-chuchi">
                        <motion.rect
                            x="0" y="0" width="300" height="150"
                            initial={{ width: 0 }}
                            animate={{ width: 300 }}
                            transition={{ duration: 2.5, ease: "linear", delay: 0.5 }}
                        />
                    </clipPath>
                    <clipPath id="clip-giddu">
                        <motion.rect
                            x="320" y="0" width="300" height="150"
                            initial={{ width: 0 }}
                            animate={{ width: 300 }}
                            transition={{ duration: 2.5, ease: "linear", delay: 3.5 }}
                        />
                    </clipPath>
                </defs>

                {/* Chuchi - Left */}
                <motion.text
                    x="280"
                    y="75"
                    textAnchor="end"
                    dominantBaseline="middle"
                    fill="url(#gold-gradient)"
                    stroke="url(#gold-gradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    clipPath="url(#clip-chuchi)"
                    style={{
                        fontFamily: 'var(--font-great-vibes)',
                        fontSize: '4.5rem',
                        filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.3))'
                    }}
                    initial={{ fillOpacity: 0, strokeOpacity: 1 }}
                    animate={{ fillOpacity: 1, strokeOpacity: 0 }}
                    transition={{
                        fillOpacity: { duration: 1.5, delay: 2 },
                        strokeOpacity: { duration: 1.5, delay: 2 }
                    }}
                >
                    Chuchi
                </motion.text>

                {/* Heart - Center */}
                <motion.path
                    d="M 300 65 C 280 50, 270 75, 280 95 L 300 115 L 320 95 C 330 75, 320 50, 300 65"
                    fill="url(#gold-gradient)"
                    stroke="url(#gold-gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, scale: 0, opacity: 0 }}
                    animate={{ pathLength: 1, scale: 1, opacity: 1 }}
                    transition={{
                        pathLength: { duration: 1, delay: 2.8 },
                        scale: { duration: 0.5, type: "spring", delay: 2.8 },
                        opacity: { duration: 0.2, delay: 2.8 }
                    }}
                />

                {/* Giddu - Right */}
                <motion.text
                    x="320"
                    y="75"
                    textAnchor="start"
                    dominantBaseline="middle"
                    fill="url(#gold-gradient)"
                    stroke="url(#gold-gradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    clipPath="url(#clip-giddu)"
                    style={{
                        fontFamily: 'var(--font-great-vibes)',
                        fontSize: '4.5rem',
                        filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.3))'
                    }}
                    initial={{ fillOpacity: 0, strokeOpacity: 1 }}
                    animate={{ fillOpacity: 1, strokeOpacity: 0 }}
                    transition={{
                        fillOpacity: { duration: 1.5, delay: 5.5 },
                        strokeOpacity: { duration: 1.5, delay: 5.5 }
                    }}
                >
                    Giddu
                </motion.text>
            </svg>
        </motion.div>
    )
}

export default function LetterPage() {
    const paragraphs = LETTER_CONTENT.trim().split("\n\n");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.5 }
        }
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            y: 15,
            scale: 1.1,
            filter: 'blur(8px)',
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            overflowY: 'auto'
        }}>
            <LetterBackground />

            <div style={{
                maxWidth: '700px',
                width: '100%',
                zIndex: 10,
                textAlign: 'center'
            }}>
                {paragraphs.map((para, pIndex) => (
                    <motion.div
                        key={pIndex}
                        style={{ marginBottom: '2rem', lineHeight: '1.8' }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={container}
                    >
                        {para.split(" ").map((word, wIndex) => (
                            <motion.span
                                key={`${pIndex}-${wIndex}`}
                                variants={child}
                                whileHover={{
                                    scale: 1.25,
                                    color: '#ffd700',
                                    textShadow: "0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 105, 180, 0.6)",
                                    y: -3,
                                    rotate: Math.random() * 4 - 2 // Subtle random tilt
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '1.4rem',
                                    color: '#f0f0f0',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                    display: 'inline-block',
                                    margin: '0 4px',
                                    fontStyle: 'italic',
                                    cursor: 'default'
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>
                ))}

                <Signature />

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 8, duration: 1 }}
                    style={{ marginTop: '3rem', textAlign: 'center' }}
                >
                    <Link href="/" style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        border: '1px solid #ffd700',
                        color: '#ffd700',
                        fontFamily: 'var(--font-cinzel)',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        background: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.3s'
                    }}>
                        Return to Stars
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
