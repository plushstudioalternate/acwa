"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "IDENTIFY",
        description:
            "We identify distressed or underutilized real estate assets with strong recovery potential.",
    },
    {
        title: "ENTER",
        description:
            "We strategically enter projects through capital deployment and operational control.",
    },
    {
        title: "REVIVE",
        description:
            "We unlock stalled developments through execution, restructuring, and repositioning.",
    },
    {
        title: "EXIT",
        description:
            "We create value realization opportunities through asset monetization and exits.",
    },
];

// ✅ Octagon (all 4 corners clipped) + V-notch cut into bottom center
const CARD_CLIP =
    "polygon(0 0, 42% 0, 50% 12%, 58% 0, 100% 0, 100% 84%, 90% 100%, 10% 100%, 0 84%)";

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftContentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── Left content fades in when section enters view ────────────────
            gsap.fromTo(
                leftContentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            // ── Cards start invisible ─────────────────────────────────────────
            gsap.set(cardsRef.current, { opacity: 0, y: 50 });

            // ── Timeline: each card animates in one by one ────────────────────
            const tl = gsap.timeline();
            cardsRef.current.forEach((card) => {
                tl.to(
                    card,
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                    // each card starts after the previous one is mostly done
                    "+=0.1"
                );
            });

            // ── Single ScrollTrigger: pins the section and scrubs the timeline ─
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                // ✅ total scroll distance = room for each card to animate in
                end: `+=${steps.length * 280}`,
                pin: true,
                anticipatePin: 1,
                scrub: 1.2,
                animation: tl,
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[#DB8A00] overflow-hidden"
        >
            <div className="max-w-[1600px] mx-auto px-[5vw] py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                {/* LEFT SIDE */}
                <div ref={leftContentRef} className="max-w-[700px] opacity-0 text-white/80 ">
                    <h2 className="uppercase leading-[0.95] tracking-tight  text-[clamp(3rem,6vw,6rem)]">
                        ACWA focuses on unlocking value from projects where
                        significant capital and construction already exist.
                    </h2>
                    <p className="mt-10 text-lg max-w-[500px] leading-relaxed">
                        Instead of starting from zero, we work to revive viable
                        projects through strategic intervention.
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-center lg:items-end ">
                    {steps.map((step, index) => (
                        <HoverCard
                            key={index}
                            title={step.title}
                            description={step.description}
                            setRef={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            pulseDelay={index * 2.55}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

type HoverCardProps = {
    title: string;
    description: string;
    setRef: (el: HTMLDivElement | null) => void;
    pulseDelay: number;
};

function HoverCard({ title, description, setRef, pulseDelay }: HoverCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ringsRef = useRef<(HTMLDivElement | null)[]>([null, null, null]);

    useEffect(() => {
        const card = cardRef.current;
        const titleEl = titleRef.current;
        const descEl = descRef.current;
        if (!card || !titleEl || !descEl) return;

        gsap.set(descEl, { opacity: 0, y: 12, filter: "blur(5px)" });

        // ── Pulse rings: each one expands and fades, staggered within the card ─
        // pulseDelay offsets the whole card's cycle so they fire top → bottom
        ringsRef.current.forEach((ring, i) => {
            if (!ring) return;
            gsap.fromTo(
                ring,
                { scale: 0.8, opacity: 0.7 },
                {
                    scale: 1.75,
                    opacity: 0,
                    duration: 2.2,
                    ease: "power2.out",
                    repeat: -1,
                    delay: pulseDelay + i * 0.65, // rings within card fire sequentially
                }
            );
        });

        // ── Hover in ──────────────────────────────────────────────────────────
        const enter = () => {
            gsap.to(titleEl, {
                opacity: 0,
                y: -8,
                duration: 0.45,
                ease: "power3.out",
            });
            gsap.to(descEl, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.6,
                ease: "power4.out",
            });
        };

        // ── Hover out ─────────────────────────────────────────────────────────
        const leave = () => {
            gsap.to(titleEl, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
            });
            gsap.to(descEl, {
                opacity: 0,
                y: 12,
                filter: "blur(5px)",
                duration: 0.35,
                ease: "power2.in",
            });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        return () => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
            gsap.killTweensOf(ringsRef.current);
        };
    }, [pulseDelay]);

    return (
        // Wrapper has no overflow-hidden so rings bleed outside the card edges
        <div className="relative flex items-center justify-center">

            {/* Rings — ellipse-shaped to echo the card's proportions */}
            {[0,].map((i) => (
                <div
                    key={i}
                    ref={(el) => { ringsRef.current[i] = el; }}
                    className="absolute pointer-events-none"
                    style={{
                        width: "320px",
                        height: "150px",
                        clipPath: CARD_CLIP,
                        border: "2px solid #E9D9C6",
                        opacity: 0,
                        zIndex: 0,
                    }}
                />
            ))}

            {/* Card sits above the rings */}
            <div
                ref={(el) => {
                    cardRef.current = el;
                    setRef(el);
                }}
                className="relative w-[320px] h-[150px] bg-[#E9D9C6] cursor-pointer overflow-hidden"
                style={{ clipPath: CARD_CLIP, zIndex: 1 }}
            >
                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h3
                        ref={titleRef}
                        className="text-[#DB8A00] text-4xl font-light tracking-wide leading-none"
                    >
                        {title}
                    </h3>
                </div>

                {/* Description — always centered, blur-fades in on hover */}
                <div className="absolute inset-0 flex items-center justify-center px-8">
                    <p
                        ref={descRef}
                        className="text-center text-[#DB8A00] text-xs leading-relaxed max-w-[220px]"
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}