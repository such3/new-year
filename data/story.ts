export type Section = {
    id: number;
    title: string;
    text: string[];
    cameraZ: number; // Camera distance/position marker
    opacity: number;
};

export const STORY_SECTIONS: Section[] = [
    {
        id: 0,
        title: "Two Years of Silence",
        text: [
            "We lived in the same universe.",
            "Side by side… yet worlds apart."
        ],
        cameraZ: 0,
        opacity: 1
    },
    {
        id: 1,
        title: "The First Signal • July 26, 2025",
        text: [
            "One small reply.",
            "And the universe leaned in."
        ],
        cameraZ: 10,
        opacity: 0
    },
    {
        id: 2,
        title: "First Call • September 26, 2025",
        text: [
            "That voice didn’t feel new.",
            "It felt like it had always been there."
        ],
        cameraZ: 20,
        opacity: 0
    },
    {
        id: 3,
        title: "Our First Library Session",
        text: [
            "In the quietest place,",
            "everything finally made sense."
        ],
        cameraZ: 30,
        opacity: 0
    },
    {
        id: 4,
        title: "First Outing",
        text: [
            "Just food.",
            "Just laughs.",
            "Somehow… just perfect."
        ],
        cameraZ: 40,
        opacity: 0
    },
    {
        id: 5,
        title: "First Date • Court Circle Night",
        text: [
            "That night felt different.",
            "The universe felt closer."
        ],
        cameraZ: 50,
        opacity: 0
    },
    {
        id: 6,
        title: "The Proposal • November 27, 2025",
        text: [
            "Out of every possibility,",
            "we chose each other."
        ],
        cameraZ: 60,
        opacity: 0
    },
    {
        id: 7,
        title: "Tiffen House Date",
        text: [
            "No effort.",
            "No fear.",
            "Love felt easy."
        ],
        cameraZ: 70,
        opacity: 0
    },
    {
        id: 8,
        title: "New Year • 2026",
        text: [
            "Out of infinite space…",
            "Out of endless time…",
            "I still found you.",
            "",
            "Happy New Year 2026",
            "Some love is cosmic.",
            "From Chuchi 💖💖"
        ],
        cameraZ: 80,
        opacity: 0
    }
];
