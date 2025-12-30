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
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3em',
                        color: '#aabfff',
                        marginBottom: '1rem',
                        opacity: 0.8
                    }}>
                        Phase {currentSection} — {section.title}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            {section.text.map((line, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.5 + 0.3, duration: 1 }}
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: currentSection === 8 ? '2rem' : '1.6rem',
                                        color: section.id === 6 ? '#ffd700' : '#ffffff',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.9)',
                                        margin: '0.4rem 0',
                                        fontWeight: 400,
                                        lineHeight: 1.4
                                    }}
                                >
                                    {line}
                                </motion.p>
                            ))}
                        </motion.div>
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
