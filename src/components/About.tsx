import { useEffect, useRef } from "react";
import { about, personal } from "../data/data";

function useReveal(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.15 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return refs;
}

export default function About() {
  const cardRefs = useReveal(10);

  return (
    <section
      id="about"
      className="min-h-screen px-10 py-24 bg-[linear-gradient(180deg,_#e8efff_0%,_#f0f4ff_100%)] relative overflow-hidden"
    >
      {/* Blob decoration */}
      <div className="absolute -bottom-28 -left-20 h-[500px] w-[500px] rounded-full bg-[rgba(41,121,255,0.07)] blur-[80px] pointer-events-none" />

      {/* Heading */}
      <div
        className="fade-up max-w-[600px] mb-[3.5rem]"
        ref={el => { cardRefs.current[0] = el; }}
      >
        <h2 className="section-heading">Who <span>Am I</span></h2>
      </div>

      <div className="grid gap-6 max-w-[1100px] grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
        {/* Bio card */}
        <div
          className="glass fade-up about-card p-8 col-span-full delay-100"
          ref={el => { cardRefs.current[1] = el; }}
        >
          <div className="mb-3 text-[0.7rem] uppercase tracking-[0.1em] font-bold text-[var(--blue)]">
            A bit about me
          </div>
          <p className="max-w-[800px] text-base leading-[1.85] text-[var(--text-secondary)]">
            {personal.bio}
          </p>
        </div>

        {/* Education cards */}
        {about.education.map((edu, i) => (
          <div
            key={i}
            className="glass fade-up about-card p-7"
            ref={el => { cardRefs.current[i + 2] = el; }}
            style={{ transitionDelay: `${0.15 * (i + 2)}s` }}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[rgba(41,121,255,0.2)] bg-[var(--blue-subtle)] text-[1.2rem]">
              🎓
            </div>
            <div className="mb-2 text-[0.7rem] uppercase tracking-[0.1em] font-bold text-[var(--blue)]">
              Education
            </div>
            <h4 className="mb-1 text-base font-bold text-[var(--text-primary)]">
              {edu.degree}
            </h4>
            <div className="mb-1 text-[0.85rem] text-[var(--text-secondary)]">
              {edu.institution}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="badge">{edu.year}</span>
              <span className="badge">{edu.detail}</span>
            </div>
          </div>
        ))}

        {/* Achievements card */}
        <div
          className="glass fade-up about-card p-7 delay-600"
          ref={el => { cardRefs.current[4] = el; }}
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[rgba(41,121,255,0.2)] bg-[var(--blue-subtle)] text-[1.2rem]">
            🏆
          </div>
          <div className="mb-4 text-[0.7rem] uppercase tracking-[0.1em] font-bold text-[var(--blue)]">
            Achievements
          </div>
          <ul className="flex flex-col gap-2 list-none">
            {about.achievements.map((a, i) => (
              <li key={i} className="rounded-[8px] border border-[rgba(41,121,255,0.08)] bg-[rgba(41,121,255,0.04)] px-3 py-2 text-[0.875rem] leading-[1.5] text-[var(--text-secondary)]">
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Interests card */}
        <div
          className="glass fade-up about-card p-7 delay-750"
          ref={el => { cardRefs.current[5] = el; }}
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[rgba(41,121,255,0.2)] bg-[var(--blue-subtle)] text-[1.2rem]">
            💡
          </div>
          <div className="mb-4 text-[0.7rem] uppercase tracking-[0.1em] font-bold text-[var(--blue)]">
            Interests & Hobbies
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Mathematics", "Volleyball",
              "OpenGL & Graphics", "Open Source",
              "Reading Documentations",
            ].map((item) => (
              <span key={item} className="rounded-full border border-[rgba(41,121,255,0.15)] bg-[rgba(255,255,255,0.6)] px-3 py-[5px] text-[0.8rem] font-medium text-[var(--text-secondary)]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
