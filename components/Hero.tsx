"use client";
import { forwardRef } from "react";

const HeroSection = forwardRef<HTMLHeadingElement>((_, ref) => {
    return (
        < div className="relative h-screen p-3" >

            {/* ── GMN block: anchored to top-0 left-0 of the outer wrapper (page edge) ── */}
            < div
                ref={ref as React.Ref<HTMLDivElement>}
                className="absolute top-0 left-0 z-20 bg-white px-[clamp(0.75rem,2vw,1.5rem)] pt-4 pb-3 rounded-br-lg [transform-origin:top_left] [will-change:transform,opacity]"
            >
                <img src="/acwa-logo.svg" alt="logo" className="h-[30vh]" />
            </div >

            {/* ── Inner header: fills the padded space, rounded corners visible ── */}
            < header
                className="relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-[url('/images/ball-bearings-wallpaper.png')] bg-[#0d1b3e75] bg-blend-multiply"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                {/* ── Hero content — vertically centered, left aligned ── */}
                < div className="flex flex-1 flex-col justify-center px-[clamp(2rem,6vw,6rem)] max-w-[780px] mt-[20vh]" >
                    <h1
                        className=" font-bold text-white leading-[1.05] tracking-[-0.03em] mb-6"
                    >
                        Reviving India’s
                        Stalled
                        Real Estate
                    </h1>
                </div >

                {/* ── Scroll indicator ── */}
                < p className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse text-[0.7rem] uppercase tracking-[0.18em] text-white/50" >
                    scroll to continue
                </p >
            </header >
        </div >
    );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;