"use client";

import { forwardRef, useEffect, useRef, useState } from "react";

interface NavItem {
    label: string;
    number: string;
    href: string;
    image?: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", number: "01", href: "/", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80" },
    { label: "About", number: "02", href: "/about", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
    { label: "Work", number: "03", href: "/work", image: "https://images.unsplash.com/photo-1545665277-5937489579f2?w=600&q=80" },
    { label: "Contact", number: "04", href: "/contact" },
];

const DEFAULT_IMAGE = NAV_ITEMS[0].image!;

function getSlideDir(from: number | null, to: number): "up" | "down" {
    if (from === null) return "up";
    return to > from ? "up" : "down";
}

interface NavbarProps {
    logoRef: React.RefObject<HTMLSpanElement | null>;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(({ logoRef }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeImage, setActiveImage] = useState(DEFAULT_IMAGE);
    const [prevImage, setPrevImage] = useState<string | null>(null);
    const [slideDir, setSlideDir] = useState<"up" | "down">("up");
    const [isAnimating, setIsAnimating] = useState(false);
    const prevHoveredRef = useRef<number | null>(null);
    const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setHoveredIndex(null);
            setActiveImage(DEFAULT_IMAGE);
            setPrevImage(null);
            prevHoveredRef.current = null;
        }
    }, [isOpen]);

    function handleHover(i: number) {
        const item = NAV_ITEMS[i];
        setHoveredIndex(i);
        if (!item.image || item.image === activeImage) {
            prevHoveredRef.current = i;
            return;
        }
        const dir = getSlideDir(prevHoveredRef.current, i);
        setSlideDir(dir);
        setPrevImage(activeImage);
        setActiveImage(item.image);
        setIsAnimating(true);
        prevHoveredRef.current = i;
        if (animTimerRef.current) clearTimeout(animTimerRef.current);
        animTimerRef.current = setTimeout(() => {
            setPrevImage(null);
            setIsAnimating(false);
        }, 600);
    }

    return (
        <>
            {/* ── Navbar ── */}
            <nav
                ref={ref}
                aria-label="Main navigation"
                className="fixed inset-x-0 top-0 z-[100] flex h-navbar items-center bg-white justify-between border-b border-white/20 bg-blue-light px-8 backdrop-blur-md opacity-0 pointer-events-none"
            >
                <div className="flex h-full items-center">
                    <span
                        ref={logoRef}
                        aria-hidden="true"
                        className="font-logo text-[1.1rem] font-normal tracking-[-0.01em] whitespace-nowrap text-white opacity-0"
                    >
                        <img src="/acwa-logo.svg" alt="logo" className="h-7 w-full" />
                    </span>
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                    aria-expanded={isOpen}
                    className="inline-block md:hidden cursor-pointer rounded-full border border-white/40 bg-transparent px-[1.1rem] py-[0.4rem] font-body text-[0.75rem] font-medium tracking-[0.12em] text-white transition-[background,border-color] duration-200 hover:bg-white/10 hover:border-white/60"
                >
                    MENU
                </button>
                <div className="hidden md:flex font-light gap-8 items-center uppercase text-brand-blue">
                    <a href="#">home</a>
                    <a href="#">our projects</a>
                    <a href="#">contact us</a>
                </div>
            </nav>

            {/* ── Full-screen overlay ── */}
            <div
                aria-hidden={!isOpen}
                className={
                    "fixed inset-0 z-[200] flex bg-blue-light transition-opacity duration-500 ease-in-out " +
                    (isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
                }
            >
                {/*
                 * Close button — positioned identically to the MENU button:
                 * same h-navbar height, same px-8 right edge, items-center vertically.
                 * This makes the MENU→CLOSE transition appear seamless.
                 */}
                <div className="absolute inset-x-0 top-0 flex h-navbar items-center justify-end px-8 z-10">
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="cursor-pointer rounded-full border border-white/40 bg-transparent px-[1.1rem] py-[0.4rem] font-body text-[0.75rem] font-medium tracking-[0.12em] text-white transition-[background,border-color] duration-200 hover:bg-white/10"
                    >
                        CLOSE
                    </button>
                </div>

                {/* ── Left: image panel ── */}
                <div className="flex w-[45%] items-end pb-[clamp(2rem,5vw,5rem)] justify-center pl-[clamp(2rem,5vw,5rem)]">
                    <div
                        className="relative overflow-hidden rounded-sm"
                        style={{ width: "clamp(180px,22vw,290px)", height: "clamp(220px,28vw,360px)" }}
                    >
                        {prevImage && isAnimating && (
                            <div
                                key={"prev-" + prevImage}
                                className={"absolute inset-0 " + (slideDir === "up" ? "menu-slide-out-up" : "menu-slide-out-down")}
                            >
                                <img src={prevImage} alt="" className="h-full w-full object-cover" />
                            </div>
                        )}
                        <div
                            key={"active-" + activeImage}
                            className={"absolute inset-0 " + (isAnimating ? (slideDir === "up" ? "menu-slide-in-up" : "menu-slide-in-down") : "")}
                        >
                            <img src={activeImage} alt="" className="h-full w-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* ── Right: nav links ── */}
                <div className="flex w-[55%] flex-col justify-end pb-[clamp(2rem,5vw,5rem)] pr-[clamp(2rem,5vw,5rem)]">
                    <div>
                        {NAV_ITEMS.map((item, i) => {
                            const delay = 0.15 + i * 0.07;
                            const isHovered = hoveredIndex === i;
                            const anyHovered = hoveredIndex !== null;
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onMouseEnter={() => handleHover(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-baseline justify-between gap-4 border-b-[1.5px] border-white/35 pb-2 pt-1 no-underline mb-4"
                                    style={{
                                        opacity: isOpen ? (anyHovered ? (isHovered ? 1 : 0.3) : 1) : 0,
                                        transform: isOpen ? "translateX(0)" : "translateX(-40px)",
                                        transition: "opacity 0.25s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1) " + delay + "s",

                                    }}
                                >
                                    <div className="overflow-hidden">
                                        <span
                                            className="block font-display font-light"
                                            style={{
                                                fontSize: "clamp(2.5rem,5vw,4rem)",
                                                lineHeight: 1.1,
                                                letterSpacing: "-0.02em",
                                                color: "rgba(255,255,255,0.9)",
                                                transform: isOpen ? "translateY(0%)" : "translateY(105%)",
                                                transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1) " + (delay + 0.05) + "s",
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                    <span className="font-body shrink-0 self-end pb-2 text-[0.8rem] font-normal tracking-[0.05em] text-white/40">
                                        {item.number}
                                    </span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Footer meta */}
                    <div
                        className="mt-12 flex justify-between pt-6"
                        style={{
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? "translateY(0)" : "translateY(12px)",
                            transition: "opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s",
                        }}
                    >
                        <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/40">
                            NYC / LA
                        </span>
                        <span className="font-body text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/40">
                            HELLO@YOURSITE.CO
                        </span>
                    </div>
                </div>
            </div >
        </>
    );
});

Navbar.displayName = "Navbar";
export default Navbar;