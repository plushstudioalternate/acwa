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
};

function HoverCard({ title, description, setRef }: HoverCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const titleEl = titleRef.current;
        const descEl = descRef.current;
        if (!card || !titleEl || !descEl) return;

        // ✅ Description starts hidden via GSAP (not Tailwind) so GSAP owns it
        gsap.set(descEl, { opacity: 0, y: 10 });

        const enter = () => {
            // Title shifts up to make room
            gsap.to(titleEl, {
                y: -18,
                duration: 0.35,
                ease: "power3.out",
            });
            // Description fades in below
            gsap.to(descEl, {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power3.out",
            });
        };

        const leave = () => {
            gsap.to(titleEl, {
                y: 0,
                duration: 0.3,
                ease: "power3.out",
            });
            gsap.to(descEl, {
                opacity: 0,
                y: 10,
                duration: 0.25,
                ease: "power3.out",
            });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        return () => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
        };
    }, []);

    return (
        <div
            ref={(el) => {
                cardRef.current = el;
                setRef(el);
            }}
            className="relative w-[320px] h-[150px] bg-[#E9D9C6] cursor-pointer overflow-hidden"
            style={{ clipPath: CARD_CLIP }}
        >
            {/* ✅ Flex column: title on top half, description on bottom half */}
            {/* overflow-hidden on the outer div + absolute children keeps them
                from ever visually overlapping outside their regions */}
            <div className="relative w-full h-full flex flex-col items-center justify-center px-8 gap-1">

                {/* Title — shifts up on hover via GSAP y transform */}
                <h3
                    ref={titleRef}
                    className="text-[#DB8A00] text-4xl font-light tracking-wide leading-none mt-4"
                >
                    {title}
                </h3>

                {/* Description — fades in below the title on hover */}
                <p
                    ref={descRef}
                    className="text-center text-[#DB8A00] text-xs leading-relaxed max-w-[220px]"
                >
                    {description}
                </p>
            </div>
        </div>
    );
}