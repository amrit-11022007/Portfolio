import { useEffect, useRef, useState } from "react";
import { personal } from "../data/data";
import MagneticButton from "./MagneticButton";

// Each blob: pos (%), size (px), color, animation duration, keyframe deltas
const BLOBS = [
  { x: 15, y: 20, size: 480, color: "rgba(41,121,255,0.28)", dur: 18, dx1:"120px",dy1:"80px",dx2:"60px",dy2:"200px",dx3:"-80px",dy3:"120px" },
  { x: 70, y: 60, size: 420, color: "rgba(92,157,255,0.22)", dur: 22, dx1:"-100px",dy1:"60px",dx2:"80px",dy2:"-140px",dx3:"40px",dy3:"80px" },
  { x: 40, y: 80, size: 360, color: "rgba(41,121,255,0.18)", dur: 15, dx1:"80px",dy1:"-100px",dx2:"-60px",dy2:"80px",dx3:"120px",dy3:"-60px" },
  { x: 85, y: 10, size: 300, color: "rgba(160,195,255,0.20)", dur: 25, dx1:"-60px",dy1:"100px",dx2:"-120px",dy2:"-80px",dx3:"80px",dy3:"60px" },
  { x: 5,  y: 70, size: 260, color: "rgba(41,121,255,0.15)", dur: 20, dx1:"100px",dy1:"-60px",dx2:"60px",dy2:"120px",dx3:"-40px",dy3:"-100px" },
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Typewriter effect
  useEffect(() => {
    const tagline = personal.taglines[taglineIndex];

    if (!isDeleting) {
      if (displayText.length < tagline.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(tagline.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 45);
      } else {
        setIsDeleting(false);
        setTaglineIndex((i) => (i + 1) % personal.taglines.length);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, taglineIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[linear-gradient(160deg,_#e8f0ff_0%,_#f5f8ff_50%,_#eef3ff_100%)]"
    >
      {/* Animated blobs */}
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="blob"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: b.color,
            animationDuration: `${b.dur}s`,
            "--dx1": b.dx1,
            "--dy1": b.dy1,
            "--dx2": b.dx2,
            "--dy2": b.dy2,
            "--dx3": b.dx3,
            "--dy3": b.dy3,
          } as React.CSSProperties}
        />
      ))}

      {/* Mesh grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle,_rgba(41,121,255,0.06)_1px,_transparent_1px)] bg-[length:48px_48px]" />

      {/* Content */}
      <div className="relative z-10 max-w-[760px] px-10 ml-8">

        {/* Name */}
        <h1 className="font-['Inter',sans-serif] text-[clamp(2.4rem,6vw,5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] mb-4 text-[var(--text-primary)]">
          {personal.name.split(" ")[0]}{" "}
          <span className="text-[var(--blue)]">
            {personal.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* Typewriter line */}
        <div className="font-['Inter',sans-serif] text-[clamp(1.1rem,3vw,1.75rem)] font-semibold text-[var(--text-secondary)] mb-6 min-h-[2.2rem] flex items-center">
          <span>I am a&nbsp;</span>
          <span className="text-[var(--blue)]">{displayText}</span>
          <span className="cursor-blink" />
        </div>

        {/* Bio */}
        <p className="text-base text-[var(--text-muted)] leading-[1.8] max-w-[540px] mb-10 font-normal">
          {personal.bio}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4">
          <MagneticButton text="View Projects →" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} />
          <MagneticButton text="About Me →" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} />
        </div>
      </div>

      {/* Floating card decoration */}
      <div className="glass hero-floating-card hidden lg:flex absolute right-[6%] top-1/2 -translate-y-1/2 p-6 w-[220px] flex-col gap-3 z-10 animate-[blobFloat_8s_ease-in-out_infinite]">
        <div className="text-[0.7rem] uppercase tracking-[0.08em] font-semibold text-[var(--text-muted)]">Currently</div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[0.8rem] font-semibold text-[var(--text-primary)]">Learning C++.</span>
        </div>
        <div className="h-px bg-[rgba(41,121,255,0.1)]" />
        <div className="text-[0.75rem] text-[var(--text-muted)]">React + TypeScript frontend</div>
      </div>
    </section>
  );
}
