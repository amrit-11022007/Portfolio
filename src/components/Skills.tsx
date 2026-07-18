import { useEffect, useRef } from "react";
import { skills } from "../data/data";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f0f4ff_0%,#eaf0ff_100%)] px-10 py-24"
    >
      {/* Decorative blob */}
      <div className="pointer-events-none absolute right-[-100px] top-[30%] h-[400px] w-[400px] rounded-full bg-[rgba(41,121,255,0.07)] blur-[70px]" />

      <div ref={sectionRef} className="fade-up mb-14 max-w-[600px]">
        <h2 className="section-heading">
          Tech <span>Stack</span>
        </h2>

        <p className="mt-3 text-[0.95rem] leading-[1.7] text-[var(--text-muted)]">
          Tools I use.
        </p>
      </div>

      {/* Skills grid */}
      <div className="grid max-w-[900px] grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="skill-chip glass flex cursor-default flex-col items-center gap-[0.6rem] px-4 py-5"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              width={40}
              height={40}
              className="object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";

                const parent = (e.target as HTMLImageElement).parentElement!;

                const span = document.createElement("span");

                span.style.fontSize = "2rem";
                span.textContent = skill.name[0];

                parent.prepend(span);
              }}
            />

            <span className="text-center font-['DM_Sans'] text-[0.78rem] font-semibold text-[var(--text-secondary)]">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Proficiency note */}
      <div className="mt-12 flex max-w-[900px] items-start gap-4 rounded-2xl border border-[rgba(41,121,255,0.12)] bg-[rgba(41,121,255,0.05)] px-7 py-5">
        <span className="shrink-0 text-[1.25rem]">📌</span>

        <div>
          <div className="mb-1 text-[0.875rem] font-semibold text-[var(--text-primary)]">
            Next in Line:
          </div>

          <p className="text-[0.825rem] leading-[1.7] text-[var(--text-muted)]">
            Prisma ORM · Postgre
          </p>
        </div>
      </div>
    </section>
  );
}
