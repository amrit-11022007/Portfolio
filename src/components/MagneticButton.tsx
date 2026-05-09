import { useRef } from "react";

interface MagneticButtonProps {
  text: string;
  onClick?: () => void;
}

export default function MagneticButton({ text, onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  function handleMouseMove(e: React.MouseEvent) {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const strength = 0.6;
    button.style.transform = `translate(${deltaX * strength}px, ${deltaY * strength}px)`;
  }
  function handleMouseLeave() {
    const button = buttonRef.current;
    if (!button) return;
    button.style.transform = "translate(0px, 0px)";
  }

  return (
    <button
      ref={buttonRef}
      className="py-4 px-10 border-none rounded-lg bg-blue-600 text-white text-lg cursor-pointer transition-transform duration-200 ease-in-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
