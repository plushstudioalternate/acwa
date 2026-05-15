"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const paragraph = [
    {
        text: "We work on India's most complex real estate situations,",
        className: "text-white",
    },
    {
        text: " reviving ",
        className: "text-brand-masturd",
    },
    {
        text: "projects through",
        className: "text-white",
    },
    {
        text: " capital deployment, restructuring",
        className: "text-brand-masturd",
    },
    {
        text: ", and",
        className: "text-white",
    },
    {
        text: "on-ground execution",
        className: "text-brand-masturd",
    },
];

export default function AboutUsSection() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const letters = textRef.current?.querySelectorAll(".letter");

            if (letters?.length) {
                gsap.set(letters, {
                    opacity: .35
                });

                gsap.to(letters, {
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        end: "bottom 50%",
                        scrub: true,
                    },
                    opacity: 1,
                    stagger: 0.03,
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full min-h-[100dvh] bg-brand-green text-white px-[4vw] flex items-center"
        >
            <div className="max-w-10xl mx-auto w-full">
                <h2
                    ref={textRef}
                    className="leading-tight md:leading-snug"
                    style={{ fontWeight: 600 }}
                >
                    {paragraph.map((segment, segmentIndex) => (
                        <span key={segmentIndex}>
                            {segment.text.split(" ").map((word, wordIndex) => (
                                <span
                                    key={wordIndex}
                                    className="inline-block mr-[0.25em] mb-[0.2em]"
                                >
                                    {word.split("").map((char, charIndex) => (
                                        <span
                                            key={charIndex}
                                            className={`letter transition-none ${segment.className}`}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            ))}
                        </span>
                    ))}
                </h2>
            </div>
        </section>
    );
}