"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ClubOpsMotion({ children }) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    const timer = window.setTimeout(() => {
      setIntroFinished(true);
    }, 2350);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const percentage =
        (scrollTop / documentHeight) * 100;

      setProgress(
        Math.min(100, Math.max(0, percentage))
      );
    }

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateProgress
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress
      );

      window.removeEventListener(
        "resize",
        updateProgress
      );
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const revealElements =
      document.querySelectorAll(".co-reveal");

    if (!revealElements.length) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "co-visible"
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12,
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted, pathname]);

  return (
    <>
      {/* =====================================================
          SCROLL PROGRESS
          ===================================================== */}

      <div
        className="co-scroll-progress"
        aria-hidden="true"
      >
        <div
          className="co-scroll-progress-bar"
          style={{
            transform: `scaleX(${progress / 100})`,
          }}
        />
      </div>

      {/* =====================================================
          STARTUP / LOGO INTRO
          ===================================================== */}

      {mounted && !introFinished && (
        <div
          className="co-startup"
          aria-hidden="true"
        >
          <div className="co-startup-background" />

          <div className="co-startup-grid" />

          <div className="co-startup-content">

            {/* Logo */}
            <div className="co-logo-animation">

              <div
                className="
                  co-logo-orbit
                  co-orbit-one
                "
              />

              <div
                className="
                  co-logo-orbit
                  co-orbit-two
                "
              />

              <div className="co-logo-ring">
                <span className="co-logo-letter">
                  C
                </span>
              </div>

              <span
                className="
                  co-logo-dot
                  co-dot-one
                "
              />

              <span
                className="
                  co-logo-dot
                  co-dot-two
                "
              />

              <span
                className="
                  co-logo-dot
                  co-dot-three
                "
              />
            </div>

            {/* Brand */}
            <div className="co-startup-name">
              ClubOps
              <span> AI</span>
            </div>

            {/* Drawing line */}
            <div className="co-startup-line">
              <span />
            </div>

            <p className="co-startup-tagline">
              SMART CLUB MANAGEMENT
            </p>
          </div>

          {/* =================================================
              THIS IS THE IMPORTANT PART

              A second small C appears near the end of the
              intro animation and travels toward the navbar.
              ================================================= */}

          <div className="co-logo-to-navbar">
            <div className="co-transfer-logo">
              C
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MAIN APPLICATION
          ===================================================== */}

      <div
        key={pathname}
        className="co-page"
      >
        {children}
      </div>
    </>
  );
}