"use client";

import { useRef } from "react";
import { useLogoScrollAnimation } from "@/hooks/useLogoScrollAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";

import Image from "next/image";

export default function Home() {

  const heroLogoRef = useRef<HTMLHeadingElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const navLogoRef = useRef<HTMLSpanElement>(null);

  useLogoScrollAnimation({ heroLogoRef, navbarRef, navLogoRef });
  return (
    <main className="bg-white font-jakarta text-brand-text overflow-x-hidden">
      {/* Fixed navbar — starts invisible, revealed by scroll */}
      <Navbar ref={navbarRef} logoRef={navLogoRef} />

      {/* Full-screen hero with the large logo text */}
      <HeroSection ref={heroLogoRef} />

      {/*
       * Page body beneath the hero.
       * text-brand-muted → tailwind.config.ts › theme.extend.colors.brand.muted
       */}

      <section className="min-h-screen pt-32 pb-16 text-brand-muted tracking-[0.04em]">

      </section>
    </main>
  );
}
