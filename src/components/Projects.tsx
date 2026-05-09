import { useEffect, useRef, useState } from "react";
import { projects } from "../data/data";
import "./style.css";

const VISIBLE_LARGE = 2;
const VISIBLE_SMALL = 1;
const GAP = 16;

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_LARGE);
  const [cardWidth, setCardWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Detect screen size
  useEffect(() => {
    const check = () =>
      setVisibleCount(window.innerWidth >= 900 ? VISIBLE_LARGE : VISIBLE_SMALL);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const maxIndex = Math.max(0, projects.length - visibleCount);

  const goNext = () => setCurrent((c) => Math.min(c + 1, maxIndex));
  const goPrev = () => setCurrent((c) => Math.max(c - 1, 0));

  // Clamp current when visibleCount changes
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  // Keyboard arrow support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [maxIndex]);

  // Measure card width dynamically from container
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const containerWidth = trackRef.current.parentElement!.offsetWidth;
      setCardWidth((containerWidth - GAP * (visibleCount - 1)) / visibleCount);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visibleCount]);

  const offset = current * (cardWidth + GAP);

  return (
    <section id="projects" className="project-section">
      <div className="fade-up project-heading">
        <h2 className="section-heading">
          Featured <span>Projects</span>
        </h2>
        <p className="project-title">
          Things I've built — from finance apps to physics simulations.
        </p>
      </div>

      {/* Slider viewport */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex"
          style={{
            gap: GAP,
            transform: `translateX(-${offset}px)`,
            transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
          }}
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="glass project-card flex-shrink-0 p-4"
              style={{
                minWidth: cardWidth || 0,
                width: cardWidth || 0,
                boxSizing: "border-box",
              }}
            >
              <div className="img-placeholder flex h-64 w-full items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={proj.screenshot}
                  alt={proj.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Title */}
              <div className="mb-2">
                <h3 className="font-['Syne'] text-[1.4rem] font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">
                  {proj.title}
                </h3>
                <div className="text-[0.8rem] font-medium text-[var(--blue)]">
                  {proj.subtitle}
                </div>
              </div>

              {/* Problem */}
              <div className="mb-3">
                <div className="mb-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                  Problem
                </div>
                <p className="text-[0.85rem] leading-[1.6] text-[var(--text-secondary)]">
                  {proj.problem}
                </p>
              </div>

              {/* Approach */}
              <div className="mb-4">
                <div className="mb-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                  My Approach
                </div>
                <p
                  className="overflow-hidden text-[0.85rem] leading-[1.6] text-[var(--text-secondary)] transition-[max-height] duration-300 ease-in-out"
                  style={{
                    maxHeight: expanded === proj.id ? "200px" : "3.5rem",
                  }}
                >
                  {proj.approach}
                </p>
                <button
                  onClick={() =>
                    setExpanded(expanded === proj.id ? null : proj.id)
                  }
                  className="cursor-pointer border-none bg-transparent py-[2px] text-[0.72rem] font-semibold text-[var(--blue)]"
                >
                  {expanded === proj.id ? "Show less ↑" : "Read more ↓"}
                </button>
              </div>

              {/* Tech stack */}
              <div className="mb-5 flex flex-wrap gap-[6px]">
                {proj.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-[6px] rounded-[10px] bg-[var(--text-primary)] px-4 py-2 text-[0.78rem] font-semibold text-white no-underline transition-opacity hover:opacity-75"
                >
                  GitHub ↗
                </a>
                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-[6px] rounded-[10px] bg-[var(--blue)] px-4 py-2 text-[0.78rem] font-semibold text-white no-underline"
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.8)] text-[1.1rem] transition-all duration-200 hover:bg-[var(--blue)] hover:text-white disabled:cursor-default disabled:opacity-35"
        >
          ←
        </button>

        <div className="flex gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(Math.min(i, maxIndex))}
              className="cursor-pointer rounded-[4px] transition-all duration-300 ease-in-out"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background:
                  i === current ? "var(--blue)" : "rgba(41,121,255,0.25)",
              }}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={current === maxIndex}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.8)] text-[1.1rem] transition-all duration-200 hover:bg-[var(--blue)] hover:text-white disabled:cursor-default disabled:opacity-35"
        >
          →
        </button>
      </div>

      <p className="mt-3 text-center text-[0.72rem] tracking-[0.05em] text-[var(--text-muted)]">
        use ← → arrow keys or buttons to navigate
      </p>
    </section>
  );
}
