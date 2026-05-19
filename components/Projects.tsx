"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CarouselItem {
    id: number;
    category: string;
    title: string;
    bgImage: string;
    fgImage: string;
}

// Sample data matching the layout structure in your screenshot
const dummyData: CarouselItem[] = [
    {
        id: 1,
        category: "Pune",
        title: "Miro",
        bgImage: "/acwa-project-1-bg.png",
        fgImage: "/acwa-project-1.jpg",
    },
    {
        id: 2,
        category: "Energy & Climate",
        title: "NYMA",
        bgImage: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80",
        fgImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 3,
        category: "Eco Architecture",
        title: "Urban Green",
        bgImage: "/acwa-project-2-bg.png",
        fgImage: "/acwa-project-2.png",
    },
];

export default function ProjectsCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        const slides = slidesRef.current;

        if (!container || slides.length === 0) return;

        // Increasing the multiplier to give the entire sequence more scrolling depth
        const totalSlides = slides.length;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                // totalSlides * 100% provides enough scroll room for both transitions AND holds
                end: `+=${totalSlides * 100}%`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });

        // We build a sequential timeline where each slide takes turns:
        // 1. Holding frame static (Pause)
        // 2. Transiting into view (Slide up)
        slides.forEach((slide, index) => {
            if (index === 0) return; // Slide 0 starts completely visible

            // Step 1: Add a standardized spacing/hold relative to the timeline sequence
            // This ensures the previous item stays completely static for a moment
            tl.to({}, { duration: 0.5 });

            // Step 2: Perform the slide transition
            tl.fromTo(
                slide,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "none",
                    duration: 1, // Linear animation duration
                }
            );
        });

        // Step 3: Add a final hold so the last item lingers before unpinning completely
        tl.to({}, { duration: 0.5 });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black select-none">
            {dummyData.map((item, index) => (
                <div
                    key={item.id}
                    ref={(el) => {
                        if (el) slidesRef.current[index] = el;
                    }}
                    className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                    style={{ zIndex: index + 1 }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            src={item.bgImage}
                            alt={item.title}
                            className="w-full h-full object-cover brightness-[0.7]"
                        />
                    </div>

                    {/* Foreground UI Layer */}
                    <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-20 z-10">
                        {/* Left Column: Typography */}
                        <div className="text-white space-y-2 mix-blend-difference">
                            <span className="text-sm md:text-base font-medium opacity-80 uppercase tracking-wider block">
                                {item.category}
                            </span>
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tight">
                                {item.title}
                            </h2>
                        </div>

                        {/* Right Column: Floating Picture Card */}
                        <div className="flex justify-center md:justify-end items-center h-full ptr-4 md:ptr-0">
                            <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] shadow-2xl rounded-sm overflow-hidden border border-white/10">
                                <img
                                    src={item.fgImage}
                                    alt={`${item.title} detail`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}