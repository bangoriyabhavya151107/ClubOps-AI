"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { usePathname } from "next/navigation";

export default function ClubOpsMotion({ children }) {
  const pathname = usePathname();

  const [mounted, setMounted] =
    useState(false);

  const [showIntro, setShowIntro] =
    useState(false);

  const [logoTarget, setLogoTarget] =
    useState(null);

  const introTimerRef =
    useRef(null);

  const resizeTimerRef =
    useRef(null);

  /*
   * =========================================================
   * MOUNT
   * =========================================================
   */

  useEffect(() => {
    setMounted(true);
  }, []);


  /*
   * =========================================================
   * START ANIMATION
   * =========================================================
   *
   * The animation runs on the initial page load and again
   * whenever Next.js changes the route.
   *
   * This means the same visual system is used for:
   *
   * /dashboard
   * /events
   * /tasks
   * /meetings
   * /attendance
   * /announcements
   * /reports
   * /profile
   * /settings
   * /ai-assistant
   * etc.
   *
   * No individual page needs to be modified.
   */

  useEffect(() => {
    if (!mounted) {
      return;
    }

    /*
     * Cancel previous timer.
     */

    if (introTimerRef.current) {
      window.clearTimeout(
        introTimerRef.current
      );
    }

    /*
     * Start intro.
     */

    setLogoTarget(null);

    setShowIntro(true);

    /*
     * Wait until the current page and Topbar have rendered.
     */

    const targetTimer =
      window.setTimeout(() => {
        findLogoTarget();
      }, 80);

    /*
     * Complete the animation.
     */

    introTimerRef.current =
      window.setTimeout(() => {
        setShowIntro(false);
      }, 3000);

    return () => {
      window.clearTimeout(
        targetTimer
      );

      if (introTimerRef.current) {
        window.clearTimeout(
          introTimerRef.current
        );
      }
    };
  }, [pathname, mounted]);


  /*
   * =========================================================
   * FIND NAVBAR LOGO
   * =========================================================
   *
   * The current Topbar.jsx contains:
   *
   * .apple-logo-badge
   *
   * We measure that real element instead of guessing where
   * the logo should land.
   */

  function findLogoTarget() {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    /*
     * Primary target:
     * Dashboard/navbar logo.
     */

    let target =
      document.querySelector(
        ".apple-logo-badge"
      );

    /*
     * Secondary target:
     * Useful for public/login pages if a logo target
     * is present in the future.
     */

    if (!target) {
      target =
        document.querySelector(
          ".co-logo-target"
        );
    }

    /*
     * Home page fallback.
     */

    if (!target) {
      target =
        document.querySelector(
          ".brandDot"
        );
    }

    /*
     * If this page has no logo target,
     * the intro simply fades away.
     */

    if (!target) {
      setLogoTarget(null);
      return;
    }

    const rect =
      target.getBoundingClientRect();

    const targetX =
      rect.left +
      rect.width / 2 -
      window.innerWidth / 2;

    const targetY =
      rect.top +
      rect.height / 2 -
      window.innerHeight / 2;

    setLogoTarget({
      x: targetX,
      y: targetY,
      width: rect.width,
      height: rect.height,
    });
  }


  /*
   * =========================================================
   * RESIZE HANDLING
   * =========================================================
   */

  useEffect(() => {
    if (!showIntro) {
      return;
    }

    function handleResize() {
      window.clearTimeout(
        resizeTimerRef.current
      );

      resizeTimerRef.current =
        window.setTimeout(() => {
          findLogoTarget();
        }, 120);
    }

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      window.clearTimeout(
        resizeTimerRef.current
      );
    };
  }, [showIntro]);


  /*
   * =========================================================
   * BODY CLASS
   * =========================================================
   *
   * This lets the global CSS temporarily hide the real
   * navbar logo while the animated logo is travelling
   * toward it.
   */

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (showIntro) {
      document.body.classList.add(
        "co-logo-intro-active"
      );
    } else {
      document.body.classList.remove(
        "co-logo-intro-active"
      );
    }

    return () => {
      document.body.classList.remove(
        "co-logo-intro-active"
      );
    };
  }, [showIntro, mounted]);


  /*
   * =========================================================
   * SCROLL PROGRESS
   * =========================================================
   *
   * IMPORTANT:
   *
   * We use ONLY:
   *
   * --co-scroll-progress
   *
   * There is no:
   *
   * --co-scroll-progress-value
   *
   * anywhere in this component.
   */

  useEffect(() => {
    function updateProgress() {
      const scrollTop =
        window.scrollY || 0;

      const totalHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      if (totalHeight <= 0) {
        document.documentElement.style.setProperty(
          "--co-scroll-progress",
          "0%"
        );

        return;
      }

      const percentage =
        (scrollTop / totalHeight) *
        100;

      const safePercentage =
        Math.min(
          100,
          Math.max(
            0,
            percentage
          )
        );

      document.documentElement.style.setProperty(
        "--co-scroll-progress",
        `${safePercentage}%`
      );
    }

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      }
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


  /*
   * =========================================================
   * SCROLL REVEAL
   * =========================================================
   */

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const elements =
      document.querySelectorAll(
        ".co-reveal"
      );

    if (!elements.length) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "co-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px",
        }
      );

    elements.forEach(
      (element) => {
        observer.observe(element);
      }
    );

    return () => {
      observer.disconnect();
    };
  }, [pathname, mounted]);


  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <>
      {/* =====================================================
          SCROLL PROGRESS
          ===================================================== */}

      <div
        className="scroll-progress"
        aria-hidden="true"
      >
        <div className="scroll-progress-bar" />
      </div>


      {/* =====================================================
          STARTUP / ROUTE INTRO
          ===================================================== */}

      {mounted && showIntro && (
        <div
          className="co-intro"
          aria-hidden="true"
        >

          {/* =================================================
              BACKGROUND
              ================================================= */}

          <div className="co-intro-bg" />


          {/* =================================================
              LIGHT PARTICLES
              ================================================= */}

          <div className="co-intro-particles">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>


          {/* =================================================
              CENTER LOGO CONTENT
              ================================================= */}

          <div className="co-intro-center">

            {/* Logo */}

            <div className="co-intro-mark">

              <div className="co-intro-mark-ring" />

              <span className="co-intro-mark-letter">
                C
              </span>

            </div>


            {/* Brand */}

            <div className="co-intro-name">
              ClubOps AI
            </div>


            {/* Drawing line */}

            <div className="co-intro-line">
              <span />
            </div>


            {/* Tagline */}

            <div className="co-intro-tagline">
              SMART CLUB OPERATIONS
            </div>

          </div>


          {/* =================================================
              LOGO TRAVEL
              ================================================= */}

          {logoTarget && (
            <div
              className="co-logo-flight co-logo-flight-ready"
              style={{
                "--co-logo-target-x":
                  `${logoTarget.x}px`,

                "--co-logo-target-y":
                  `${logoTarget.y}px`,

                "--co-logo-target-width":
                  `${logoTarget.width}px`,

                "--co-logo-target-height":
                  `${logoTarget.height}px`,
              }}
            >
              <div className="co-logo-flight-inner">
                C
              </div>
            </div>
          )}


          {/* =================================================
              TRAIL
              ================================================= */}

          <div className="co-logo-trail" />

        </div>
      )}


      {/* =====================================================
          PAGE
          ===================================================== */}

      <div
        key={pathname}
        className="co-page-shell"
      >
        {children}
      </div>
    </>
  );
}