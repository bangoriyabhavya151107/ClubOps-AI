"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function ClubOpsMotion({ children }) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [logoTarget, setLogoTarget] = useState(null);

  const introTimerRef = useRef(null);
  const resizeTimerRef = useRef(null);

  /*
   * =========================================================
   * STARTUP ANIMATION
   * =========================================================
   *
   * The ClubOps AI logo intro is shown once per browser
   * session.
   */

  useEffect(() => {
    setMounted(true);

    let shouldShowIntro = false;

    try {
      shouldShowIntro =
        !sessionStorage.getItem("co-seen");
    } catch {
      /*
       * If sessionStorage is unavailable,
       * continue without the intro.
       */
      shouldShowIntro = false;
    }

    if (!shouldShowIntro) {
      return;
    }

    setShowIntro(true);

    /*
     * Wait for the navbar to mount before finding
     * the real navbar logo position.
     */

    const targetTimer = window.setTimeout(() => {
      updateLogoTarget();
    }, 100);

    /*
     * Finish the intro animation.
     */

    introTimerRef.current =
      window.setTimeout(() => {
        setShowIntro(false);

        try {
          sessionStorage.setItem(
            "co-seen",
            "1"
          );
        } catch {
          /*
           * Storage unavailable.
           * The application continues normally.
           */
        }
      }, 2700);

    return () => {
      window.clearTimeout(targetTimer);

      if (introTimerRef.current) {
        window.clearTimeout(
          introTimerRef.current
        );
      }
    };
  }, []);


  /*
   * =========================================================
   * FIND REAL NAVBAR LOGO
   * =========================================================
   *
   * The flying logo does not use a hard-coded position.
   *
   * It finds the actual logo inside Topbar.jsx:
   *
   *     .apple-logo-badge
   *
   * This allows the intro logo to travel directly toward
   * the real navbar logo.
   */

  function updateLogoTarget() {
    if (typeof window === "undefined") {
      return;
    }

    const navbarLogo =
      document.querySelector(
        ".apple-logo-badge"
      );

    if (!navbarLogo) {
      return;
    }

    const rect =
      navbarLogo.getBoundingClientRect();

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
   * RECALCULATE LOGO POSITION ON RESIZE
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
          updateLogoTarget();
        }, 100);
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
   * BODY INTRO STATE
   * =========================================================
   *
   * While the startup animation is running we add:
   *
   *     co-logo-intro-active
   *
   * to the body.
   *
   * Dashboard animations use this state so that the
   * dashboard waits for the logo animation to finish.
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
  }, [mounted, showIntro]);


  /*
   * =========================================================
   * SCROLL PROGRESS
   * =========================================================
   *
   * We store the scroll position as a percentage:
   *
   *     0%
   *     25%
   *     50%
   *     100%
   *
   * The global CSS uses this value directly as the width
   * of the progress bar.
   */

  useEffect(() => {
    function updateProgress() {
      const scrollTop =
        window.scrollY;

      const documentHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      /*
       * No scrollable content.
       */

      if (documentHeight <= 0) {
        document.documentElement.style.setProperty(
          "--co-scroll-progress",
          "0%"
        );

        return;
      }

      /*
       * Calculate percentage.
       */

      const percentage =
        (scrollTop /
          documentHeight) *
        100;

      /*
       * Keep the value between 0 and 100.
       */

      const safePercentage =
        Math.min(
          100,
          Math.max(
            0,
            percentage
          )
        );

      /*
       * Save the percentage to the root.
       */

      document.documentElement.style.setProperty(
        "--co-scroll-progress",
        `${safePercentage}%`
      );
    }

    /*
     * Set initial value immediately.
     */

    updateProgress();

    /*
     * Update while scrolling.
     */

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      }
    );

    /*
     * Recalculate when window size changes.
     */

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
   *
   * Existing .co-reveal elements are revealed when they
   * enter the viewport.
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
  }, [mounted, pathname]);


  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <>
      {/* =====================================================
          SCROLL PROGRESS BAR
          ===================================================== */}

      <div
        className="scroll-progress"
        aria-hidden="true"
      >
        <div
          className="scroll-progress-bar"
        />
      </div>


      {/* =====================================================
          STARTUP LOGO INTRO
          ===================================================== */}

      {mounted && showIntro && (
        <div
          className="co-intro"
          aria-hidden="true"
        >

          {/* =================================================
              INTRO BACKGROUND
              ================================================= */}

          <div className="co-intro-bg" />


          {/* =================================================
              MAIN INTRO CONTENT
              ================================================= */}

          <div className="co-intro-center">

            {/* =================================================
                LARGE CLUBOPS LOGO
                ================================================= */}

            <div className="co-intro-mark">

              <span className="co-intro-mark-letter">
                C
              </span>

            </div>


            {/* =================================================
                BRAND NAME
                ================================================= */}

            <div className="co-intro-name">
              ClubOps AI
            </div>


            {/* =================================================
                DRAWING LINE
                ================================================= */}

            <div className="co-intro-line">
              <span />
            </div>


            {/* =================================================
                TAGLINE
                ================================================= */}

            <div className="co-intro-tagline">
              SMART CLUB MANAGEMENT
            </div>

          </div>


          {/* =================================================
              FLYING LOGO
              =================================================
              
              This logo starts in the center and travels
              toward the actual navbar logo.
              ================================================= */}

          <div
            className={`co-logo-flight ${
              logoTarget
                ? "co-logo-flight-ready"
                : ""
            }`}
            style={
              logoTarget
                ? {
                    "--co-logo-target-x":
                      `${logoTarget.x}px`,

                    "--co-logo-target-y":
                      `${logoTarget.y}px`,

                    "--co-logo-target-width":
                      `${logoTarget.width}px`,

                    "--co-logo-target-height":
                      `${logoTarget.height}px`,
                  }
                : undefined
            }
          >

            <div className="co-logo-flight-inner">
              <span>C</span>
            </div>

          </div>


          {/* =================================================
              LOGO LIGHT TRAIL
              ================================================= */}

          <div className="co-logo-trail" />

        </div>
      )}


      {/* =====================================================
          PAGE CONTENT
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