"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
    name: string;
    title: string;
    description: string;
    image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
    {
        name: "Name of Founder",
        title: "Senior Designer",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/acwa-ceo.png",
    },
    {
        name: "Name of Founder",
        title: "Senior Designer",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/acwa-ceo.png",
    },
    {
        name: "Name of Founder",
        title: "Senior Designer",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/acwa-ceo.png",
    },
    {
        name: "Name of Founder",
        title: "Senior Designer",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        image: "/acwa-ceo.png",
    },
];

const CARD_CLIP =
    "polygon(48px 0, 100% 0, 100% calc(100% - 48px), calc(100% - 48px) 100%, 0 100%, 0 48px)";

// ─── Team Card ────────────────────────────────────────────────────────────────

function TeamCard({ member }: { member: TeamMember }) {
    const infoCardRef = useRef<HTMLDivElement>(null);
    const photoCardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleMouseEnter = () => {
        // Info card falls and rotates to the right
        gsap.to(infoCardRef.current, {
            rotation: 10,
            xPercent: 30,
            yPercent: 45,
            transformOrigin: "bottom left",
            duration: 0.55,
            ease: "power3.inOut",
        });
        // Photo card tilts slightly to the left
        gsap.to(photoCardRef.current, {
            rotation: -6,
            transformOrigin: "bottom center",
            duration: 0.55,
            ease: "power3.inOut",
        });
        gsap.to(imgRef.current, {
            scale: 1.05,
            duration: 0.55,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(infoCardRef.current, {
            rotation: 0,
            xPercent: 0,
            yPercent: 0,
            transformOrigin: "bottom left",
            duration: 0.55,
            ease: "power3.inOut",
        });
        gsap.to(photoCardRef.current, {
            rotation: 0,
            transformOrigin: "bottom center",
            duration: 0.55,
            ease: "power3.inOut",
        });
        gsap.to(imgRef.current, {
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
        });
    };

    return (
        <div
            className="relative cursor-pointer h-[380px]"
            style={{
                clipPath: CARD_CLIP,
                perspective: "1000px",
                opacity: 0,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* ── Photo card — tilts left on hover ── */}
            <div
                ref={photoCardRef}
                className="absolute inset-0 flex flex-col"
            >
                <div className="h-full flex-shrink-0">
                    <img
                        ref={imgRef}
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top grayscale"
                    />
                </div>
                {/* <div className="p-5 flex flex-col gap-1">
                    <h3 className="text-white font-bold text-base uppercase tracking-wide">
                        {member.name}
                    </h3>
                    <p className="text-zinc-400 text-[11px] uppercase tracking-widest">
                        {member.title}
                    </p>
                    <p className="text-zinc-300 text-xs leading-relaxed mt-2">
                        {member.description}
                    </p>
                </div> */}
            </div>

            {/* ── Info card — falls right on hover ── */}
            <div
                ref={infoCardRef}
                className="absolute inset-0 flex flex-col bg-indigo-500"
            >
                <div className="px-10 py-12">
                    <h3 className="text-white font-extrabold text-base uppercase tracking-wide leading-snug">
                        {member.name}
                    </h3>
                    <p className="text-indigo-300 text-[11px] uppercase tracking-widest mt-1">
                        {member.title}
                    </p>
                </div>
                <div className="px-10 mt-auto pb-18">
                    <p className="text-white/90 text-sm leading-relaxed">
                        {member.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function OurTeamSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── "OUR TEAM" character animation ──────────────────────────────────
            const label = labelRef.current;
            if (label) {
                const original = label.innerText;
                label.innerHTML = original
                    .split("")
                    .map((c) =>
                        c === " "
                            ? `<span class="inline-block">&nbsp;</span>`
                            : `<span class="inline-block char-item">${c}</span>`
                    )
                    .join("");

                const chars = label.querySelectorAll(".char-item");
                gsap.set(chars, { y: 20, opacity: 0 });

                gsap.to(chars, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.045,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: label,
                        start: "top 90%",
                        // ✅ replays every time the element enters/leaves view
                        toggleActions: "play reverse play reverse",
                    },
                });
            }

            // ── Heading word-mask reveal ─────────────────────────────────────────
            const heading = headingRef.current;
            if (heading) {
                const words = heading.innerText.split(" ");
                heading.innerHTML = words
                    .map(
                        (w) =>
                            `<span class="inline-block overflow-hidden" style="vertical-align:bottom"><span class="inline-block word-item">${w}\u00A0</span></span>`
                    )
                    .join("");

                const wordEls = heading.querySelectorAll(".word-item");
                gsap.set(wordEls, { y: "110%" });

                gsap.to(wordEls, {
                    y: "0%",
                    duration: 0.8,
                    stagger: 0.07,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 88%",
                        toggleActions: "play reverse play reverse",
                    },
                });
            }

            // ── Description fade up ──────────────────────────────────────────────
            gsap.set(descRef.current, { opacity: 0, y: 24 });
            gsap.to(descRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: descRef.current,
                    start: "top 88%",
                    toggleActions: "play reverse play reverse",
                },
            });

            // ── Cards stagger in ─────────────────────────────────────────────────
            if (cardsContainerRef.current) {
                const cards = Array.from(cardsContainerRef.current.children);
                gsap.set(cards, { opacity: 0, y: 70 });
                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.13,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsContainerRef.current,
                        start: "top 88%",
                        toggleActions: "play reverse play reverse",
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 bg-white"
        >
            <div className="mb-10">
                <span
                    ref={labelRef}
                    className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium"
                >
                    Our Team
                </span>

                <h2
                    ref={headingRef}
                    className="text-4xl lg:text-5xl leading-tight max-w-[80%]"
                    style={{
                        color: "#4f52e8",
                        textDecorationColor: "#4f52e8",
                        textUnderlineOffset: "6px",
                    }}
                >
                    Lorem ipsum dolor amet, consectetur adipiscing elit. Sed eiusmod
                    tempor
                </h2>
            </div>

            <div
                ref={cardsContainerRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
            >
                {TEAM_MEMBERS.map((member, i) => (
                    <TeamCard key={i} member={member} />
                ))}
            </div>
        </section>
    );
}