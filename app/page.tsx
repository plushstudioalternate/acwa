"use client";

import { useRef } from "react";
import { useLogoScrollAnimation } from "@/hooks/useLogoScrollAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";
import AboutUsSection from "@/components/About";
import OurTeamSection from "@/components/OurTeam";
import ProcessSection from "@/components/Process";
import PhilosophySection from "@/components/Philosophy";
import FooterSection from "@/components/Footer";
import ProjectsCarousel from "@/components/Projects";

export default function Home() {

  const heroLogoRef = useRef<HTMLHeadingElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const navLogoRef = useRef<HTMLSpanElement>(null);
  const curtainRef = useRef<HTMLElement>(null);

  useLogoScrollAnimation({ heroLogoRef, navbarRef, navLogoRef });
  return (
    <main className="bg-white text-brand-text overflow-x-clip">
      {/* Fixed navbar — starts invisible, revealed by scroll */}

      {/*
       * Page body beneath the hero.
       * text-brand-muted → tailwind.config.ts › theme.extend.colors.brand.muted
       */}

      <section ref={curtainRef} className="min-h-screen bg-white relative z-10 pb-16 text-brand-muted tracking-[0.04em]">
        <Navbar ref={navbarRef} logoRef={navLogoRef} />

        {/* Full-screen hero with the large logo text */}
        <HeroSection ref={heroLogoRef} />
        <AboutUsSection />
        <OurTeamSection />
        <ProcessSection />
        <ProjectsCarousel />
        <PhilosophySection />
      </section>
      <FooterSection curtainRef={curtainRef} />
    </main>
  );
}
