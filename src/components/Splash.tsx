import { useEffect, useState } from "react";

interface SplashProps {
  onDone: () => void;
}

export default function Splash({ onDone }: SplashProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(onDone, 800);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div id="splash" className={hidden ? "hidden" : ""}>
      <div className="text-center">
        <div className="splash-name">Made by Amrit Raj Yadav</div>
        <div className="splash-sub">Portfolio · 2026</div>
      </div>
    </div>
  );
}
