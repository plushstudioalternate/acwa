"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const paragraph = [
    {
        text: "We work on India's most complex real estate situations,",
        className: "",
    },
    {
        text: " reviving ",
        className: "",
    },
    {
        text: "projects through",
        className: "",
    },
    {
        text: " capital deployment, restructuring",
        className: "",
    },
    {
        text: ", and",
        className: "",
    },
    {
        text: "on-ground execution",
        className: "",
    },
];

export default function PhilosophySection() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const visionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const letters = textRef.current?.querySelectorAll(".letter");

            if (letters?.length) {
                gsap.set(letters, { opacity: 0.35 });

                gsap.to(letters, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%", // ✅ begins as soon as section enters the viewport
                        end: "top top",      // ✅ completes exactly when section fully occupies the screen
                        scrub: true,
                    },
                    opacity: 1,
                    stagger: 0.03,
                });
            }

            // "Our philosophy" label — fade + slide up
            gsap.from(labelRef.current, {
                scrollTrigger: {
                    trigger: labelRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reset",
                },
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: "power2.out",
            });

            // Mission + Vision cards — staggered fade + slide up
            gsap.from([missionRef.current, visionRef.current], {
                scrollTrigger: {
                    trigger: missionRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reset",
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
            });
        }, containerRef);



        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full min-h-[100dvh] text-brand-red px-[4vw] mt-[10vh]"
        >

            <div className=" mx-auto w-full flex justify-between items-start">
                <p
                    ref={labelRef}
                    className="text-[24.47px] uppercase font-extralight"
                >
                    Our philosophy
                </p>
                <div className="w-2/3">

                    <h2 ref={textRef} className="leading-tight md:leading-snug ">
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
                    <div className="flex flex-wrap justify-between mt-[15vh]">
                        <div ref={missionRef} className="w-4/5 md:w-[30%] flex flex-col gap-4">
                            <h3 className="uppercase font-thin ">mission</h3>
                            <div className="h-[1.5px] bg-brand-red w-full" />
                            <p className="text-[20px] leading-snug font-light">
                                To revive viable stalled projects through structured execution and responsible recovery.
                            </p>
                        </div>
                        <div ref={visionRef} className="w-4/5 md:w-[30%] flex flex-col gap-4">
                            <h3 className="uppercase font-thin ">vision</h3>
                            <div className="h-[1.5px] bg-brand-red w-full" />
                            <p className="text-[20px] leading-snug font-light">
                                To revive viable stalled projects through structured execution and responsible recovery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}