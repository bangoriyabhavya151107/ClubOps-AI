"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./contact.css";

export default function ContactPage() {
  const canvasRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
      radius: 140,
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

    const createParticles = () => {
      const count = Math.min(
        100,
        Math.floor((window.innerWidth * window.innerHeight) / 18000)
      );

      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,

          size: Math.random() * 2 + 0.5,

          speedX: (Math.random() - 0.5) * 0.35,
          speedY: (Math.random() - 0.5) * 0.35,

          opacity: Math.random() * 0.5 + 0.15,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.speedX *= -1;
        }

        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.speedY *= -1;
        }

        /* Mouse interaction */

        if (mouse.x !== null && mouse.y !== null) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius && distance > 0) {
            const force = (mouse.radius - distance) / mouse.radius;

            particle.x += (dx / distance) * force * 0.7;
            particle.y += (dy / distance) * force * 0.7;
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

        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;

        ctx.fill();

        /* Connect nearby particles */

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];

          const dx = particle.x - other.x;
          const dy = particle.y - other.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.15;

            ctx.beginPath();

            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);

            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;

            ctx.lineWidth = 0.5;

            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(drawParticles);
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
    drawParticles();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  /* =========================================
     SCROLL REVEAL
  ========================================= */

  useEffect(() => {
    const elements = document.querySelectorAll(".contact-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact-visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  /* =========================================
     FORM HANDLING
  ========================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      {/* =====================================
          BACKGROUND
      ====================================== */}

      <canvas
        ref={canvasRef}
        className="contact-particles"
      />

      <div className="contact-noise" />

      <div className="contact-glow contact-glow-one" />
      <div className="contact-glow contact-glow-two" />
      <div className="contact-glow contact-glow-three" />


      {/* =====================================
          NAVBAR
      ====================================== */}

      <nav className="contact-navbar">

        <Link
          href="/"
          className="contact-logo"
        >

          <span className="contact-logo-icon">
            C
          </span>

          <span>
            ClubOps AI
          </span>

        </Link>


        <div className="contact-nav-links">

          <Link href="/">
            Home
          </Link>

          <Link href="/#features">
            Features
          </Link>

          <Link href="/#about">
            About
          </Link>

          <Link
            href="/contact"
            className="active"
          >
            Contact
          </Link>

        </div>


        <Link
          href="/register"
          className="contact-nav-button"
        >
          Get Started
          <span>→</span>
        </Link>

      </nav>


      {/* =====================================
          MAIN HERO
      ====================================== */}

      <section className="contact-hero">

        <div className="contact-badge contact-reveal">

          <span className="badge-dot" />

          LET'S CONNECT

        </div>


        <h1 className="contact-title contact-reveal">

          Let's build something

          <span>
            intelligent.
          </span>

        </h1>


        <p className="contact-description contact-reveal">

          Have a question, idea, collaboration proposal,
          or simply want to learn more about ClubOps AI?

          <br />

          Send us a message and let's start a conversation.

        </p>


        <div className="contact-scroll-indicator">

          <span />

          Scroll to connect

          <span />

        </div>

      </section>


      {/* =====================================
          CONTACT CONTENT
      ====================================== */}

      <section className="contact-content">

        {/* LEFT SIDE */}

        <div className="contact-info contact-reveal">

          <span className="contact-section-label">
            CONTACT
          </span>

          <h2>
            We would love
            <br />
            to hear from you.
          </h2>

          <p>
            Whether you're building a college club,
            organizing your next event, or interested
            in collaborating with ClubOps AI, we're
            always open to hearing from you.
          </p>


          {/* Contact cards */}

          <div className="contact-details">

            <div className="contact-detail-card">

              <div className="detail-icon">
                ✉
              </div>

              <div>

                <span>
                  Email
                </span>

                <strong>
                  hello@clubops.ai
                </strong>

              </div>

            </div>


            <div className="contact-detail-card">

              <div className="detail-icon">
                ◉
              </div>

              <div>

                <span>
                  Availability
                </span>

                <strong>
                  Mon — Fri
                </strong>

              </div>

            </div>


            <div className="contact-detail-card">

              <div className="detail-icon">
                ⚡
              </div>

              <div>

                <span>
                  Response
                </span>

                <strong>
                  Within 24–48 hours
                </strong>

              </div>

            </div>

          </div>


          {/* Social links */}

          <div className="contact-socials">

            <span>
              Follow the journey
            </span>

            <div>

              <a
                href="#"
                aria-label="GitHub"
              >
                GH
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
              >
                IN
              </a>

              <a
                href="#"
                aria-label="Instagram"
              >
                IG
              </a>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="contact-form-wrapper contact-reveal">

          <div className="form-glow" />

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-heading">

              <span>
                SEND A MESSAGE
              </span>

              <h3>
                Tell us what's on your mind.
              </h3>

            </div>


            {/* Name + Email */}

            <div className="form-row">

              <div className="form-field">

                <label htmlFor="name">
                  Your name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Bhavya"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-field">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Subject */}

            <div className="form-field">

              <label htmlFor="subject">
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>


            {/* Message */}

            <div className="form-field">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Tell us a little about what you have in mind..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
              />

            </div>


            {/* Submit */}

            <button
              type="submit"
              className="contact-submit"
            >

              <span>
                Send Message
              </span>

              <span className="submit-arrow">
                →
              </span>

            </button>


            {submitted && (

              <div className="success-message">

                <span>
                  ✓
                </span>

                Thanks! Your message has been received.

              </div>

            )}

            <p className="form-note">
              By submitting this form, you agree to be
              contacted regarding your message.
            </p>

          </form>

        </div>

      </section>


      {/* =====================================
          BOTTOM CTA
      ====================================== */}

      <section className="contact-cta contact-reveal">

        <div>

          <span>
            HAVE AN IDEA?
          </span>

          <h2>
            Let's make it happen.
          </h2>

        </div>


        <Link
          href="/register"
          className="cta-button"
        >

          Start with ClubOps AI

          <span>
            →
          </span>

        </Link>

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="contact-footer">

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