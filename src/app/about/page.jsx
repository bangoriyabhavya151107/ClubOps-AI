"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "./about.css";

export default function AboutPage() {
  const canvasRef = useRef(null);

  /* =========================================
     ANIMATED PARTICLE BACKGROUND
  ========================================= */

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationFrame;
    let particles = [];

    const mouse = {
      x: null,
      y: null,
      radius: 160,
    };

    const createParticles = () => {
      const area = window.innerWidth * window.innerHeight;

      const count = Math.min(
        110,
        Math.max(35, Math.floor(area / 18000))
      );

      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,

          size: Math.random() * 2 + 0.4,

          speedX: (Math.random() - 0.5) * 0.35,
          speedY: (Math.random() - 0.5) * 0.35,

          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (
          particle.x <= 0 ||
          particle.x >= window.innerWidth
        ) {
          particle.speedX *= -1;
        }

        if (
          particle.y <= 0 ||
          particle.y >= window.innerHeight
        ) {
          particle.speedY *= -1;
        }

        /* Mouse interaction */

        if (
          mouse.x !== null &&
          mouse.y !== null
        ) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (
            distance < mouse.radius &&
            distance > 0
          ) {
            const force =
              (mouse.radius - distance) /
              mouse.radius;

            particle.x +=
              (dx / distance) *
              force *
              0.6;

            particle.y +=
              (dy / distance) *
              force *
              0.6;
          }
        }

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(99, 102, 241, ${particle.opacity})`;

        ctx.fill();

        /* Particle connections */

        for (
          let j = index + 1;
          j < particles.length;
          j++
        ) {
          const other = particles[j];

          const dx =
            particle.x - other.x;

          const dy =
            particle.y - other.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (distance < 125) {
            const opacity =
              (1 - distance / 125) * 0.13;

            ctx.beginPath();

            ctx.moveTo(
              particle.x,
              particle.y
            );

            ctx.lineTo(
              other.x,
              other.y
            );

            ctx.strokeStyle =
              `rgba(99, 102, 241, ${opacity})`;

            ctx.lineWidth = 0.5;

            ctx.stroke();
          }
        }
      });

      animationFrame =
        requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resizeCanvas();
    animate();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  /* =========================================
     SCROLL REVEAL
  ========================================= */

  useEffect(() => {
    const elements =
      document.querySelectorAll(
        ".about-reveal"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "about-visible"
              );
            }
          });
        },
        {
          threshold: 0.12,
        }
      );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () =>
      observer.disconnect();
  }, []);

  return (
    <main className="about-page">

      {/* =====================================
          BACKGROUND
      ====================================== */}

      <canvas
        ref={canvasRef}
        className="about-particles"
      />

      <div className="about-noise" />

      <div className="about-glow about-glow-one" />
      <div className="about-glow about-glow-two" />
      <div className="about-glow about-glow-three" />


      {/* =====================================
          NAVBAR
      ====================================== */}

      <nav className="about-navbar">

        <Link
          href="/"
          className="about-logo"
        >

          <span className="about-logo-icon">
            C
          </span>

          <span>
            ClubOps AI
          </span>

        </Link>


        <div className="about-nav-links">

          <Link href="/">
            Home
          </Link>

          <Link href="/#features">
            Features
          </Link>

          <Link
            href="/about"
            className="active"
          >
            About
          </Link>

          <Link href="/contact">
            Contact
          </Link>

        </div>


        <Link
          href="/register"
          className="about-nav-button"
        >
          Get Started
          <span>→</span>
        </Link>

      </nav>


      {/* =====================================
          HERO
      ====================================== */}

      <section className="about-hero">

        <div className="about-badge about-reveal">

          <span className="about-badge-dot" />

          THE STORY BEHIND CLUBOPS AI

        </div>


        <h1 className="about-title about-reveal">

          Built to make
          <br />

          <span>
            clubs smarter.
          </span>

        </h1>


        <p className="about-hero-description about-reveal">

          ClubOps AI is an intelligent management
          platform designed to help college clubs
          organize people, events, tasks and
          operations from one powerful workspace.

        </p>


        <div className="about-scroll-hint">

          <div className="about-scroll-line" />

          SCROLL TO EXPLORE

          <div className="about-scroll-line" />

        </div>

      </section>


      {/* =====================================
          INTRODUCTION
      ====================================== */}

      <section className="about-intro">

        <div className="about-intro-label about-reveal">
          01 — WHY CLUBOPS
        </div>


        <div className="about-intro-content">

          <div className="about-reveal">

            <h2>
              College clubs
              <span>
                shouldn't be this complicated.
              </span>
            </h2>

          </div>


          <div className="about-intro-text about-reveal">

            <p>
              Running a college club involves much
              more than organizing events. Teams have
              to coordinate volunteers, assign tasks,
              manage attendance, communicate with
              members and keep track of countless
              operational details.
            </p>

            <p>
              ClubOps AI brings these activities
              together into one centralized platform,
              giving student organizations a simpler
              way to manage their everyday operations.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          STATS
      ====================================== */}

      <section className="about-stats">

        <div className="about-stat-card about-reveal">

          <strong>
            01
          </strong>

          <span>
            Unified
          </span>

          <p>
            One workspace for club operations.
          </p>

        </div>


        <div className="about-stat-card about-reveal">

          <strong>
            AI
          </strong>

          <span>
            Powered
          </span>

          <p>
            Intelligent assistance for repetitive work.
          </p>

        </div>


        <div className="about-stat-card about-reveal">

          <strong>
            24/7
          </strong>

          <span>
            Accessible
          </span>

          <p>
            Keep your organization connected.
          </p>

        </div>


        <div className="about-stat-card about-reveal">

          <strong>
            ∞
          </strong>

          <span>
            Possibilities
          </span>

          <p>
            Built to grow with your organization.
          </p>

        </div>

      </section>


      {/* =====================================
          MISSION
      ====================================== */}

      <section className="about-mission">

        <div className="about-section-number about-reveal">
          02
        </div>


        <div className="about-mission-content">

          <div className="about-reveal">

            <span className="about-section-label">
              OUR MISSION
            </span>

            <h2>
              Turn
              <span>
                organizational chaos
              </span>
              into clarity.
            </h2>

          </div>


          <div className="about-mission-description about-reveal">

            <p>
              Our mission is to give student
              organizations access to modern
              technology without making the
              technology itself complicated.
            </p>

            <p>
              Instead of switching between
              spreadsheets, messaging apps,
              calendars and disconnected tools,
              teams can bring their workflows
              together inside ClubOps AI.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          VALUES
      ====================================== */}

      <section className="about-values">

        <div className="about-values-heading about-reveal">

          <span className="about-section-label">
            WHAT WE BELIEVE
          </span>

          <h2>
            Principles behind
            <span>
              the product.
            </span>
          </h2>

        </div>


        <div className="about-values-grid">

          <article className="about-value-card about-reveal">

            <div className="value-number">
              01
            </div>

            <div className="value-icon">
              ◇
            </div>

            <h3>
              Simplicity
            </h3>

            <p>
              Powerful software should feel
              understandable. We focus on clear
              workflows and interfaces that students
              can learn quickly.
            </p>

          </article>


          <article className="about-value-card about-reveal">

            <div className="value-number">
              02
            </div>

            <div className="value-icon">
              ✦
            </div>

            <h3>
              Intelligence
            </h3>

            <p>
              AI should reduce repetitive work and
              help teams make better use of their
              time rather than adding another layer
              of complexity.
            </p>

          </article>


          <article className="about-value-card about-reveal">

            <div className="value-number">
              03
            </div>

            <div className="value-icon">
              ◎
            </div>

            <h3>
              Collaboration
            </h3>

            <p>
              Great clubs are built by teams.
              ClubOps AI is designed around
              collaboration, coordination and
              shared responsibility.
            </p>

          </article>


          <article className="about-value-card about-reveal">

            <div className="value-number">
              04
            </div>

            <div className="value-icon">
              ↗
            </div>

            <h3>
              Growth
            </h3>

            <p>
              A club changes every semester.
              The platform should evolve with its
              members, projects and ambitions.
            </p>

          </article>

        </div>

      </section>


      {/* =====================================
          HOW IT WORKS
      ====================================== */}

      <section className="about-process">

        <div className="about-process-heading about-reveal">

          <span className="about-section-label">
            THE APPROACH
          </span>

          <h2>
            From idea
            <span>
              to execution.
            </span>
          </h2>

        </div>


        <div className="about-timeline">

          <div className="timeline-line" />


          <div className="timeline-item about-reveal">

            <div className="timeline-marker">
              01
            </div>

            <div className="timeline-content">

              <span>
                ORGANIZE
              </span>

              <h3>
                Bring everything together.
              </h3>

              <p>
                Members, events, attendance and
                operational information are organized
                inside a centralized workspace.
              </p>

            </div>

          </div>


          <div className="timeline-item about-reveal">

            <div className="timeline-marker">
              02
            </div>

            <div className="timeline-content">

              <span>
                COORDINATE
              </span>

              <h3>
                Give everyone a clear role.
              </h3>

              <p>
                Teams can coordinate responsibilities,
                track activities and keep important
                tasks visible.
              </p>

            </div>

          </div>


          <div className="timeline-item about-reveal">

            <div className="timeline-marker">
              03
            </div>

            <div className="timeline-content">

              <span>
                AUTOMATE
              </span>

              <h3>
                Let AI handle repetitive work.
              </h3>

              <p>
                Intelligent tools can assist with
                planning, analysis and other
                time-consuming operational activities.
              </p>

            </div>

          </div>


          <div className="timeline-item about-reveal">

            <div className="timeline-marker">
              04
            </div>

            <div className="timeline-content">

              <span>
                GROW
              </span>

              <h3>
                Focus on what actually matters.
              </h3>

              <p>
                With operations organized, student
                teams can spend more time creating
                experiences and building communities.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          TECHNOLOGY
      ====================================== */}

      <section className="about-tech">

        <div className="about-tech-heading about-reveal">

          <span className="about-section-label">
            TECHNOLOGY
          </span>

          <h2>
            Built with
            <span>
              modern technology.
            </span>
          </h2>

          <p>
            ClubOps AI is built using a modern
            web technology stack designed to
            support a scalable and intelligent
            platform.
          </p>

        </div>


        <div className="about-tech-grid">

          <div className="tech-card about-reveal">

            <div className="tech-symbol">
              N
            </div>

            <h3>
              Next.js
            </h3>

            <p>
              Modern React framework for the
              application architecture.
            </p>

            <span>
              FRONTEND
            </span>

          </div>


          <div className="tech-card about-reveal">

            <div className="tech-symbol">
              S
            </div>

            <h3>
              Supabase
            </h3>

            <p>
              Backend services, authentication
              and data infrastructure.
            </p>

            <span>
              BACKEND
            </span>

          </div>


          <div className="tech-card about-reveal">

            <div className="tech-symbol">
              AI
            </div>

            <h3>
              Generative AI
            </h3>

            <p>
              AI capabilities designed to assist
              club operations.
            </p>

            <span>
              INTELLIGENCE
            </span>

          </div>


          <div className="tech-card about-reveal">

            <div className="tech-symbol">
              R
            </div>

            <h3>
              React
            </h3>

            <p>
              Component-based interface development
              for an interactive experience.
            </p>

            <span>
              UI
            </span>

          </div>

        </div>

      </section>


      {/* =====================================
          FUTURE
      ====================================== */}

      <section className="about-future">

        <div className="about-future-inner about-reveal">

          <div>

            <span className="about-section-label">
              WHAT'S NEXT
            </span>

            <h2>
              We're just
              <span>
                getting started.
              </span>
            </h2>

            <p>
              ClubOps AI is an evolving project.
              As the platform grows, the goal is
              to introduce deeper automation,
              analytics, AI assistance and tools
              that make student organizations
              more effective.
            </p>

          </div>


          <div className="future-orbit">

            <div className="orbit-ring orbit-ring-one" />
            <div className="orbit-ring orbit-ring-two" />
            <div className="orbit-ring orbit-ring-three" />

            <div className="orbit-core">
              C
            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          CTA
      ====================================== */}

      <section className="about-cta about-reveal">

        <span>
          READY TO BUILD BETTER CLUBS?
        </span>

        <h2>
          Your club.
          <br />
          One intelligent workspace.
        </h2>

        <p>
          Start organizing your club operations
          with ClubOps AI.
        </p>

        <div className="about-cta-buttons">

          <Link
            href="/register"
            className="about-primary-button"
          >
            Get Started
            <span>→</span>
          </Link>

          <Link
            href="/contact"
            className="about-secondary-button"
          >
            Contact Us
          </Link>

        </div>

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="about-footer">

        <div>
          © 2026 ClubOps AI
        </div>

        <div>
          AI-Powered College Club Management
        </div>

        <Link href="/">
          Back to home ↑
        </Link>

      </footer>

    </main>
  );
}