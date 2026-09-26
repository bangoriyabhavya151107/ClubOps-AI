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
   * We keep your existing sessionStorage behaviour.
   *
   * The intro is shown only once per browser session.
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
       * we still allow the page to work normally.
       */
      shouldShowIntro = false;
    }

    if (!shouldShowIntro) {
      return;
    }

    setShowIntro(true);

    /*
     * Give the navbar enough time to mount before
     * calculating the real navbar logo position.
     */
    const targetTimer = window.setTimeout(() => {
      updateLogoTarget();
    }, 100);

    /*
     * Complete animation.
     */
    introTimerRef.current = window.setTimeout(() => {
      setShowIntro(false);

      try {
        sessionStorage.setItem(
          "co-seen",
          "1"
        );
      } catch {
        // Storage unavailable.
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
   * This is the important fix.
   *
   * We don't guess where the navbar logo is.
   *
   * We find the actual:
   *
   *     .apple-logo-badge
   *
   * from your existing Topbar.jsx.
   *
   * Therefore the startup logo can travel toward the
   * real navbar logo position.
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
   * RECALCULATE ON RESIZE
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
   * BODY STATE
   * =========================================================
   *
   * This temporarily hides the final navbar logo while
   * the animated logo is travelling toward it.
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
   * Keep the existing ClubOps scroll progress feature.
   */

  useEffect(() => {
    function updateProgress() {
      const scrollTop =
        window.scrollY;

      const documentHeight =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        document.documentElement.style
          .setProperty(
            "--co-scroll-progress",
            "0%"
          );

        return;
      }

      const percentage =
        (scrollTop /
          documentHeight) *
        100;

      const safePercentage =
        Math.min(
          100,
          Math.max(
            0,
            percentage
          )
        );

      document.documentElement.style
        .setProperty(
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
   *
   * Keep support for existing .co-reveal elements.
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
          EXISTING SCROLL PROGRESS
          ===================================================== */}

      <div
        className="scroll-progress"
        aria-hidden="true"
      >
        <div
          className="scroll-progress-bar"
          style={{
            transform:
              "scaleX(var(--co-scroll-progress-value, 0))",
          }}
        />
      </div>


      {/* =====================================================
          STARTUP LOGO
          ===================================================== */}

      {mounted && showIntro && (
        <div
          className="co-intro"
          aria-hidden="true"
        >

          {/* Background */}
          <div className="co-intro-bg" />


          {/* Main intro content */}
          <div className="co-intro-center">

            {/* =================================================
                ORIGINAL LARGE LOGO
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

              This is the logo that actually travels from
              the centre of the screen to the navbar.

              Its destination is calculated from the REAL
              .apple-logo-badge in Topbar.jsx.
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
              LIGHT TRAIL
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