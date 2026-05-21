"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface Props { curtainRef: React.RefObject<HTMLElement | null> }

export default function FooterSection({ curtainRef }: Props) {
    const footerRef = useRef<HTMLElement | null>(null);
    const marqueeTrackRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const clipPathString = "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 15% 100%, 0% 85%)";

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.set(marqueeTrackRef.current, { x: 320, y: "65vh" });
            gsap.set(innerRef.current, { y: "65vh" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: curtainRef.current,
                    start: "bottom bottom",
                    end: "bottom top",
                    scrub: 2,
                },
            });

            tl.to(marqueeTrackRef.current, { x: -440, y: 0, duration: 1, ease: "none" }, 0);
            tl.to(innerRef.current, { y: 0, duration: 1, ease: "none" }, 0);
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const chunk = "Talk to us.\u00A0\u00A0\u00A0";
    const repeated = chunk.repeat(6);

    return (
        <footer
            ref={footerRef}
            className="sticky bottom-0 z-0 w-full min-h-[100dvh] bg-[#D0DCDC] text-[#0d3d22] overflow-hidden flex flex-col"
        >
            {/* Marquee — untouched */}
            <div className="w-full overflow-hidden pt-8">
                <div ref={marqueeTrackRef} className="whitespace-nowrap will-change-transform">
                    <span className="text-[11vw] font-light leading-[1.1] select-none">
                        {repeated}
                    </span>
                </div>
            </div>

            {/* Inner content wrapper — flex-col flex-1 so mt-auto still works on contacts */}
            <div ref={innerRef} className="flex flex-col flex-1 will-change-transform">
                <div className="px-[4vw] mt-10 flex items-start gap-5">
                    <div style={{ clipPath: clipPathString }} className="w-14 h-14 bg-[#0d3d22] flex-shrink-0" />
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
            </div>
        </footer>
    );
}