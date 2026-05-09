import { useCallback, useEffect, useRef, useState } from "react";
import Splash from "./components/Splash";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { navItems } from "./data/data";

const SECTIONS = navItems.filter((n) => !n.external).map((n) => n.id);

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!splashDone) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [splashDone]);

  // Animate all fade-up elements on scroll
  useEffect(() => {
    if (!splashDone) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [splashDone]);

  const handleSplashDone = useCallback(() => setSplashDone(true), []);

  return (
    <>
      <Splash onDone={handleSplashDone} />

      {splashDone && (
        <>
          {/* Mobile hamburger */}
          <button
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Sidebar */}
          <Sidebar
            activeSection={activeSection}
            mobileOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />

          {/* Main content */}
          <main className="main-content">
            <Hero />
            <Projects />
            <About />
            <Skills />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
