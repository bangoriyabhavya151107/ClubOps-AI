"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function hasExistingReveal(node) {
  const className =
    typeof node.className === "string"
      ? node.className
      : "";

  /*
   * Protect animations that already exist
   * in your project.
   */
  if (
    /(^|\s)(reveal|visible|contact-reveal|fade|slide|animate|motion)(\S*)?/i.test(
      className
    )
  ) {
    return true;
  }

  /*
   * Also protect elements inside existing
   * animation containers.
   */
  return Boolean(
    node.closest(
      '[class*="reveal"], [class*="Reveal"], [class*="animate"], [data-motion-existing]'
    )
  );
}

function getTargets() {
  const selector = [
    "main section",
    "main article",
    "main .card",
    "main [class*='card']",
    "main form",
    "main .feature",
    "main [class*='feature']",
    "main [class*='event']",
    "main [class*='stat']",
  ].join(",");

  return Array.from(document.querySelectorAll(selector))
    .filter((node) => {
      /*
       * User can disable global animation
       * on any element by using:
       *
       * data-motion-ignore
       */
      if (node.hasAttribute("data-motion-ignore")) {
        return false;
      }

      /*
       * Do not animate the intro itself.
       */
      if (node.closest(".co-intro")) {
        return false;
      }

      /*
       * Do not interfere with existing
       * page-specific animations.
       */
      if (hasExistingReveal(node)) {
        return false;
      }

      return true;
    });
}

function prepareHeroText() {
  const candidates = Array.from(
    document.querySelectorAll(
      "main h1, main [class*='hero'] h1, main [class*='Hero'] h1"
    )
  );

  candidates.forEach((element) => {
    if (
      element.hasAttribute("data-motion-ignore") ||
      hasExistingReveal(element)
    ) {
      return;
    }

    element.classList.add("co-hero-text");
  });
}

function prepareMedia() {
  const media = Array.from(
    document.querySelectorAll(
      "main img, main picture, main video"
    )
  );

  media.forEach((element) => {
    if (
      element.hasAttribute("data-motion-ignore") ||
      hasExistingReveal(element)
    ) {
      return;
    }

    /*
     * Do not add the class directly to an image
     * if it is already inside a motion container.
     */
    if (element.closest(".co-media")) {
      return;
    }

    const wrapper = element.parentElement;

    if (
      wrapper &&
      !wrapper.hasAttribute("data-motion-ignore") &&
      !hasExistingReveal(wrapper)
    ) {
      wrapper.classList.add("co-media");
    }
  });
}

function prepareRevealElements() {
  const targets = getTargets();

  targets.forEach((element, index) => {
    element.classList.add("co-reveal");

    /*
     * Stagger animation.
     *
     * Maximum delay is kept small so the page
     * does not feel slow.
     */
    const delay = Math.min(index * 70, 350);

    element.style.setProperty(
      "--co-delay",
      `${delay}ms`
    );
  });
}

export default function ClubOpsMotion({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    /*
     * Wait until the page is mounted.
     */
    const frame = requestAnimationFrame(() => {
      prepareRevealElements();
      prepareHeroText();
      prepareMedia();

      const elements = document.querySelectorAll(
        ".co-reveal"
      );

      if (!elements.length) {
        return;
      }

      /*
       * IntersectionObserver watches when elements
       * enter the viewport.
       */
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "co-visible"
            );

            /*
             * Once animated, stop observing.
             * This prevents repeated animations
             * when scrolling up/down.
             */
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -60px 0px",
        }
      );

      elements.forEach((element) => {
        observer.observe(element);
      });

      /*
       * Cleanup when changing pages.
       */
      return () => {
        observer.disconnect();
      };
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      {/* =========================================
          INTRO SCREEN
      ========================================= */}

      <div
        className="co-intro"
        aria-hidden="true"
      >
        <div className="co-intro-center">

          <div className="co-intro-mark">
            C
          </div>

          <div className="co-intro-name">
            ClubOps AI
          </div>

          <div className="co-intro-line" />

        </div>
      </div>

      {/* =========================================
          WEBSITE CONTENT
      ========================================= */}

      <div className="co-page-shell">
        {children}
      </div>
    </>
  );
}