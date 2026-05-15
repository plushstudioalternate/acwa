"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const paragraphText =
    "We work on India's most complex real estate situations, reviving projects through capital deployment, restructuring, and on-ground execution.";

export default function AboutUsSection() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        // 1. Register the plugin
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 2. Explicitly grab the spans only inside our specific paragraph
            const letters = textRef.current?.querySelectorAll(".letter");

            if (letters && letters.length > 0) {
                // 3. Force the starting color via GSAP to ensure Tailwind doesn't override it
                gsap.set(letters, { color: "rgba(255, 255, 255, 0.35)" });

                gsap.to(letters, {
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        end: "bottom 50%",
                        scrub: true,
                    },
                    // Animate to your brand.text solid black
                    color: "#ffffff",
                    stagger: 0.1,
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full min-h-[100dvh] bg-brand-green text-white px-[4vw] py-24 md:py-32 flex items-center"
        >
            <div className="max-w-10xl mx-auto w-full items-stretch">

                {/* RIGHT COLUMN: Text & CTA */}
                <div className=" flex flex-col items-start justify-between h-full">
                    <h2
                        ref={textRef}
                        className="leading-tight md:leading-snug"
                        style={{ fontWeight: 600 }}
                    >
                        {paragraphText.split(" ").map((word, wordIndex) => (
                            // REMOVED transition-colors so GSAP can take full control
                            <span
                                key={wordIndex}
                                className="inline-block mr-[0.25em] mb-[0.2em]"
                            >
                                {word.split("").map((char, charIndex) => (
                                    <span
                                        key={charIndex}
                                        // GSAP will target this 'letter' class
                                        className="letter transition-none"
                                    >
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h2>
                </div>
            </div>
        </section>
    );
}
