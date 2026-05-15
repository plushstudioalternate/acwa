"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ↓ scrollDistance → theme.ts › theme.scrollDistance
import { theme } from "@/theme";

interface UseLogoScrollAnimationOptions {
    /** The large hero <h1> element */
    heroLogoRef: React.RefObject<HTMLHeadingElement | null>;
    /** The <nav> element */
    navbarRef: React.RefObject<HTMLElement | null>;
    /** The small logo <span> inside the navbar */
    navLogoRef: React.RefObject<HTMLSpanElement | null>;
}

/**
 * Drives the hero-logo → navbar-logo transition.
 *
 * How the illusion works:
 * 1. We calculate the exact bounding-box of both the hero logo and the
 *    navbar logo at mount time.
 * 2. A ScrollTrigger scrub animates the hero logo from its natural position
 *    to the pixel-perfect position of the navbar logo (scale + translate).
 * 3. At ~80 % of the scroll range the navbar fades in and the navbar logo
 *    text becomes visible — right as the hero text reaches that spot.
 * 4. The hero element is hidden (opacity → 0) over the same range.
 */
export function useLogoScrollAnimation({
    heroLogoRef,
    navbarRef,
    navLogoRef,
}: UseLogoScrollAnimationOptions) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const heroEl = heroLogoRef.current;
        const navEl = navbarRef.current;
        const navLogoEl = navLogoRef.current;

        if (!heroEl || !navEl || !navLogoEl) return;

        // ─── Measure positions ────────────────────────────────────────────────────
        const heroRect = heroEl.getBoundingClientRect();
        const navLogoRect = navLogoEl.getBoundingClientRect();

        // Scale factor: how much smaller the navbar logo is vs the hero logo
        const scaleX = navLogoRect.width / heroRect.width;
        const scaleY = navLogoRect.height / heroRect.height;
        const scale = Math.min(scaleX, scaleY); // uniform scale

        // Translation needed so the scaled hero lands on the navbar logo position.
        // After scaling (transform-origin: top left) the top-left of the hero
        // stays at its original top-left; we need to shift it to match navLogoRect.
        const targetX = navLogoRect.left - heroRect.left;
        const targetY = navLogoRect.top - heroRect.top;

        // ─── Master timeline (scrubbed by scroll) ─────────────────────────────────
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                // Scroll distance → theme.ts › theme.scrollDistance
                end: `+=${theme.scrollDistance}`,
                scrub: 0.6,
                pin: false,
            },
        });

        // Phase 1 (0 → 100 %): hero text shrinks + moves toward navbar logo slot
        tl.to(
            heroEl,
            {
                x: targetX,
                y: targetY,
                scale,
                opacity: 0,
                ease: "power2.inOut",
                duration: 1,
                borderBottomRightRadius: "0px",
            },
            0
        );

        // Phase 2 (70 → 100 %): navbar container fades in
        tl.to(
            navEl,
            {
                opacity: 1,
                duration: 0.2,
                ease: "power1.out",
                onStart: () => navEl.classList.add("is-visible"),
                onReverseComplete: () => navEl.classList.remove("is-visible"),
            },
            0.4 // starts at 50 % through the timeline
        );

        // Phase 3 (80 → 100 %): navbar logo text fades in
        tl.to(
            navLogoEl,
            {
                opacity: 1,
                duration: 0.1,
                ease: "power1.out",
                borderBottomRightRadius: "0px",
            },
            0.5
        );

        // ─── Enable pointer-events on nav once fully shown ─────────────────────
        // (handled by the is-visible class above)

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, [heroLogoRef, navbarRef, navLogoRef]);
}