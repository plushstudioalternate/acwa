/**
 * theme.ts
 *
 * Central config for values used outside Tailwind class strings —
 * e.g. GSAP timelines, CSS custom properties, and inline styles.
 *
 * Keep this in sync with tailwind.config.ts.
 */

export const theme = {
    // ─── SCROLL ANIMATION ──────────────────────────────────────────────────
    // How many pixels of scrolling drive the full hero→navbar transition.
    scrollDistance: 320,

    // ─── FONTS (must also match Google Fonts URL in layout.tsx) ───────────
    // These feed the CSS custom properties used by non-Tailwind JSX styles.
    fonts: {
        display: '"Cormorant Garamond", Georgia, serif',
        body: '"DM Sans", system-ui, sans-serif',
    },
} as const;