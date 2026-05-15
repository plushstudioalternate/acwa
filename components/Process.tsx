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

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftContentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // LEFT CONTENT FADE IN
            gsap.fromTo(
                leftContentRef.current,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );

            // RIGHT CARDS STAGGER IN
            gsap.fromTo(
                cardsRef.current,
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.25,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const wrapper = sectionRef.current;

        // ── ScrollTrigger drives the timeline ────────────────────────────────
        // start: "top top"     = curtain is fully open (picks up exactly where curtain ends)
        // end:   "bottom bottom" = wrapper bottom hits viewport bottom (full 150vh of pin)
        const st = ScrollTrigger.create({
            trigger: wrapper,
            start: "top top",
            end: `+=${window.innerHeight * 1.5}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1.5,
            onUpdate(self) {
                // tl.progress(self.progress);
            },
        });

        return () => {
            st.kill();
            // tl.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[#DB8A00] overflow-hidden"
        >
            <div className="max-w-[1600px] mx-auto px-[5vw] py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                {/* LEFT SIDE */}
                <div
                    ref={leftContentRef}
                    className="max-w-[700px] opacity-0"
                >
                    <h2 className="text-white uppercase leading-[0.95] tracking-tight font-semibold text-[clamp(3rem,6vw,6rem)]">
                        ACWA focuses on unlocking value from projects where
                        significant capital and construction already exist.
                    </h2>

                    <p className="mt-10 text-white/90 text-lg max-w-[500px] leading-relaxed">
                        Instead of starting from zero, we work to revive viable
                        projects through strategic intervention.
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-center lg:items-end gap-0">
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

function HoverCard({
    title,
    description,
    setRef,
}: HoverCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const titleEl = titleRef.current;
        const descEl = descRef.current;

        if (!card || !titleEl || !descEl) return;

        const enterAnimation = () => {
            gsap.to(titleEl, {
                y: -18,
                scale: 0.82,
                duration: 0.35,
                ease: "power3.out",
            });

            gsap.to(descEl, {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power3.out",
            });
        };

        const leaveAnimation = () => {
            gsap.to(titleEl, {
                y: 0,
                scale: 1,
                duration: 0.35,
                ease: "power3.out",
            });

            gsap.to(descEl, {
                opacity: 0,
                y: 12,
                duration: 0.25,
                ease: "power3.out",
            });
        };

        card.addEventListener("mouseenter", enterAnimation);
        card.addEventListener("mouseleave", leaveAnimation);

        return () => {
            card.removeEventListener("mouseenter", enterAnimation);
            card.removeEventListener("mouseleave", leaveAnimation);
        };
    }, []);

    return (
        <div
            ref={(el) => {
                cardRef.current = el;
                setRef(el);
            }}
            className="
        relative
        w-[320px]
        h-[140px]
        bg-[#E9D9C6]
        overflow-hidden
        cursor-pointer
        opacity-0
        group
      "
            style={{
                clipPath:
                    "polygon(0 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%)",
            }}
        >
            {/* Decorative Notches */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#DB8A00] rotate-45" />
            <div className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#DB8A00] rotate-45" />

            {/* CONTENT */}
            <div className="relative w-full h-full flex flex-col items-center justify-center px-8">
                <h3
                    ref={titleRef}
                    className="
            text-[#DB8A00]
            text-4xl
            font-light
            tracking-wide
            absolute
          "
                >
                    {title}
                </h3>

                <p
                    ref={descRef}
                    className="
            text-center
            text-[#DB8A00]
            text-sm
            leading-relaxed
            opacity-0
            translate-y-3
            max-w-[220px]
          "
                >
                    {description}
                </p>
            </div>
        </div>
    );
}