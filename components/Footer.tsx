"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function FooterSection() {
    const footerRef = useRef<HTMLElement>(null);
    const marqueeTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Single scrubbed tween handles both entrance sweep and ongoing drift.
            // Starts at x:350 (off-screen right) when footer enters viewport,
            // eases to x:-400 by the time the page is fully scrolled.
            // scrub:2 = 2s lag behind scroll — this is what gives the silky feel.
            gsap.fromTo(
                marqueeTrackRef.current,
                { x: 350 },
                {
                    x: -450,
                    ease: "none",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom",   // footer natural position enters viewport
                        end: "bottom top",     // footer natural position exits viewport
                        scrub: 2,
                    },
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const chunk = "Talk to us.\u00A0\u00A0\u00A0";
    const repeated = chunk.repeat(6);

    return (
        <footer
            ref={footerRef}
            className="sticky bottom-0 z-0 w-full min-h-[100dvh] bg-[#c2d4d0] text-[#0d3d22] overflow-hidden flex flex-col"
        >
            <div className="w-full overflow-hidden pt-8">
                <div ref={marqueeTrackRef} className="whitespace-nowrap will-change-transform">
                    <span className="text-[11vw] font-bold leading-[1.1] select-none">
                        {repeated}
                    </span>
                </div>
            </div>

            <div className="px-[4vw] mt-10 flex items-start gap-5">
                <div className="w-14 h-14 bg-[#0d3d22] rounded-[4px] flex-shrink-0" />
                <div>
                    <p className="font-semibold text-sm tracking-widest uppercase">Ample Tiger</p>
                    <p className="text-[11px] tracking-widest uppercase opacity-50 mt-0.5">Founder</p>
                    <p className="mt-4 text-lg italic">"Revival is responsibility."</p>
                    <p className="mt-5 text-[11px] tracking-widest uppercase font-semibold border-b border-[#0d3d22]/50 pb-0.5 w-fit cursor-pointer">
                        Get in touch
                    </p>
                </div>
            </div>

            <div className="mt-auto px-[4vw] pb-10 flex justify-end">
                <div className="grid grid-cols-2 gap-x-16 gap-y-1.5 text-sm">
                    <span>LinkedIn</span>     <span>+91 9811303960</span>
                    <span>Instagram</span>    <span>info@acwa.co.in</span>
                    <span>Whatsapp</span>     <span>A-152, sector 136, Noida</span>
                </div>
            </div>
        </footer>
    );
}