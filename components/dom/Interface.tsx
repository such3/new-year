'use client';

import { useStore } from '@/store/useStore';
import { STORY_SECTIONS } from '@/data/story';
import { AnimatePresence, motion } from 'framer-motion';

export default function Interface() {
    const currentSection = useStore((state) => state.currentSection);
    const section = STORY_SECTIONS[currentSection] || STORY_SECTIONS[0];

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            zIndex: 10,
            paddingBottom: '10vh' // Space for text
        }}>
            <div style={{ textAlign: 'center', width: '100%', maxWidth: '90%' }}>

                {/* Cinematic Subtitle Container with Framer Motion */}
                <div style={{
                    display: 'inline-block',
                    background: 'rgba(5,2,10,0.6)',
                    padding: '1.5rem 3rem',
                    borderRadius: '8px',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.1)'
                }}>
                    {/* Phase Indicator */}
                    <div style={{
                        fontFamily: 'var(--font-cinzel)',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4em',
                        color: '#e0c090', // Muted gold
                        marginBottom: '1.2rem',
                        opacity: 0.9,
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        Phase {currentSection} — {section.title}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSection}
                            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                            transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }} // Cinematic easing
                        >
                            {section.text.map((line, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                                    transition={{ delay: index * 0.8 + 0.2, duration: 1.5 }} // Slow reveals
                                    style={{
                                        fontFamily: "'Playfair Display', serif", // Use the variable
                                        fontSize: currentSection === 8 ? '2.2rem' : '1.8rem',
                                        color: section.id === 6 ? '#ffd700' : '#ffffff',
                                        textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                                        margin: '0.5rem 0',
                                        fontWeight: 500,
                                        lineHeight: 1.4,
                                        letterSpacing: '0.02em',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    {line}
                                </motion.p>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Love Letter Link - Finale Only */}
                    <AnimatePresence>
                        {currentSection === 8 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 2, duration: 1 }}
                                style={{ marginTop: '2rem', pointerEvents: 'auto' }}
                            >
                                <a href="/letter" style={{
                                    display: 'inline-block',
                                    padding: '0.8rem 2rem',
                                    border: '1px solid rgba(255, 215, 0, 0.5)',
                                    color: '#ffd700',
                                    fontFamily: 'var(--font-cinzel)',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    textDecoration: 'none',
                                    background: 'rgba(0,0,0,0.3)',
                                    borderRadius: '2px',
                                    transition: 'all 0.3s ease'
                                }}>
                                    ✉ Read My Letter
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>

            {/* Progress Timeline */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                display: 'flex',
                gap: '8px',
                opacity: 0.5
            }}>
                {STORY_SECTIONS.map((_, i) => (
                    <div key={i} style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: i === currentSection ? '#fff' : '#ffffff44',
                        transition: 'background 0.3s'
                    }} />
                ))}
            </div>

        </div>
    );
}
