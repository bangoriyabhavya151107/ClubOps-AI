"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ClubOpsMotion({ children }) {
  const pathname = usePathname();
  const [showIntro, setShowIntro] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Safe client-side mount & session check
  useEffect(() => {
    setMounted(true);
    try {
      if (!sessionStorage.getItem("co-seen")) {
        setShowIntro(true);
        const timer = setTimeout(() => {
          setShowIntro(false);
          sessionStorage.setItem("co-seen", "1");
        }, 1800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  // Pravas Saathi smooth scroll progress
  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(
        Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
      );
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      {/* Pravas Saathi Scroll Progress Bar */}
      <div className="scroll-progress">
        <div
          className="scroll-progress-bar"
          style={{
            transform: `scaleX(${progress / 100})`,
          }}
        />
      </div>

      {/* Pravas Saathi Editorial Minimalist Loading Screen */}
      {mounted && showIntro && (
        <div className="loading-screen" aria-hidden="true">
          <div className="loading-logo">
            ClubOps AI<span>.</span>
          </div>
          <div className="loading-line">
            <span />
          </div>
        </div>
      )}

      {/* Page Shell */}
      <div key={pathname} className="co-page-shell">
        {children}
      </div>
    </>
  );
}