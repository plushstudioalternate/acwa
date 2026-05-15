import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
        "./src/hooks/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            // ─── COLORS ────────────────────────────────────────────────────────────
            // Change these to retheme the entire app in one place.
            colors: {
                brand: {
                    // Page & hero background
                    bg: "#ffffff",
                    // Primary text (hero logo, navbar logo, body copy)
                    text: "#1a1a1a",
                    // Navbar background (semi-transparent version of bg — keep alpha low)
                    "nav-bg": "rgba(225, 232, 245, 0.6)",
                    // Navbar bottom border
                    "nav-border": "rgba(0, 0, 0, 0.08)",
                    // Menu button border
                    "btn-border": "rgba(0, 0, 0, 0.30)",
                    // Menu button border on hover
                    "btn-border-hover": "rgba(0, 0, 0, 0.50)",
                    // Menu button bg on hover
                    "btn-bg-hover": "rgba(0, 0, 0, 0.06)",
                    // Subtle muted text (scroll hint, body placeholder)
                    muted: "rgba(0, 0, 0, 0.35)",
                    // Why choose us background
                    "btn-blue": "var(--blue)",
                    "btn-blue-hover": "var(--blue-light)",
                },
            },


            // ─── NAVBAR ────────────────────────────────────────────────────────────
            height: {
                navbar: "52px", // navbar height — controls layout spacing
            },

            // ─── ANIMATION ─────────────────────────────────────────────────────────
            // Scroll distance (in px) that drives the hero→navbar animation.
            // This lives in useLogoScrollAnimation.ts — search for SCROLL_DISTANCE.
            // Kept here as documentation; not consumed by Tailwind directly.
            // scrollDistance: 320,
        },
    },
    plugins: [],
};

export default config;
