"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="footer">
      {/* Top glow */}
      <div className="footer-glow" />

      <div className="footer-container">
        {/* =========================
            FOOTER CTA
        ========================== */}
        <section className="footer-cta">
          <div className="footer-cta-content">
            <span className="footer-eyebrow">
              CLUBOPS AI
            </span>

            <h2>
              Build better clubs.
              <br />
              <span>Run them smarter.</span>
            </h2>

            <p>
              Bring your club&apos;s members, events,
              attendance and operations together in
              one intelligent workspace.
            </p>

            <div className="footer-cta-actions">
              <Link href="/register" className="footer-primary-btn">
                Get Started
                <span>→</span>
              </Link>

              <Link href="/contact" className="footer-secondary-btn">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="footer-cta-decoration">
            <div className="footer-orbit orbit-1" />
            <div className="footer-orbit orbit-2" />
            <div className="footer-orbit orbit-3" />

            <div className="footer-orbit-core">
              <span>C</span>
            </div>
          </div>
        </section>

        {/* =========================
            MAIN FOOTER
        ========================== */}
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="footer-logo-icon">C</span>
              <span>ClubOps AI</span>
            </Link>

            <p>
              An intelligent workspace for modern
              college clubs and student organizations.
            </p>

            <div className="footer-status">
              <span className="status-dot" />
              <span>Building the future of club management</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-column">
            <h3>Platform</h3>

            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/register">Get Started</Link>
          </div>

          {/* Features */}
          <div className="footer-column">
            <h3>Explore</h3>

            <Link href="/dashboard">Dashboard</Link>
            <Link href="/members">Members</Link>
            <Link href="/events">Events</Link>
            <Link href="/attendance">Attendance</Link>
          </div>

          {/* Support */}
          <div className="footer-column">
            <h3>Support</h3>

            <Link href="/contact">Contact Support</Link>
            <Link href="/forgot-password">Forgot Password</Link>
            <a href="mailto:support@clubops.ai">
              Email Us
            </a>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h3>Stay in the loop</h3>

            <p>
              Get updates about ClubOps AI,
              new features and improvements.
            </p>

            {subscribed ? (
              <div className="footer-success">
                <span>✓</span>
                <div>
                  <strong>You&apos;re subscribed!</strong>
                  <small>
                    Thanks for joining the ClubOps community.
                  </small>
                </div>
              </div>
            ) : (
              <form
                className="footer-subscribe"
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  aria-label="Email address"
                  required
                />

                <button type="submit" aria-label="Subscribe">
                  →
                </button>
              </form>
            )}

            <span className="footer-note">
              No spam. Just product updates.
            </span>
          </div>
        </div>

        {/* =========================
            BOTTOM FOOTER
        ========================== */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} ClubOps AI.
            All rights reserved.
          </div>

          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>

          <div className="footer-socials">
            <a
              href="https://github.com/bangoriyabhavya151107/ClubOps-AI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GH
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              IG
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* =========================================
           FOOTER ROOT
        ========================================= */

        .footer {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(99, 102, 241, 0.08),
              transparent 38%
            ),
            #050509;
          color: #ffffff;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .footer-container {
          position: relative;
          z-index: 2;
          width: min(1400px, calc(100% - 48px));
          margin: 0 auto;
        }

        .footer-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 650px;
          height: 350px;
          background: rgba(99, 102, 241, 0.14);
          filter: blur(100px);
          pointer-events: none;
        }

        /* =========================================
           CTA
        ========================================= */

        .footer-cta {
          position: relative;
          min-height: 430px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 50px;
          padding: 90px 70px;
          margin-bottom: 70px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          overflow: hidden;
        }

        .footer-cta-content {
          position: relative;
          z-index: 3;
          max-width: 720px;
        }

        .footer-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #818cf8;
        }

        .footer-eyebrow::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 15px rgba(129, 140, 248, 0.8);
        }

        .footer-cta h2 {
          margin: 0;
          font-size: clamp(42px, 5vw, 76px);
          line-height: 0.98;
          letter-spacing: -0.05em;
          font-weight: 700;
        }

        .footer-cta h2 span {
          background: linear-gradient(
            90deg,
            #818cf8,
            #a78bfa,
            #c084fc
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% auto;
          animation: footerGradient 5s ease infinite;
        }

        .footer-cta p {
          max-width: 560px;
          margin: 25px 0 30px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 16px;
          line-height: 1.7;
        }

        @keyframes footerGradient {
          0% {
            background-position: 0% center;
          }

          50% {
            background-position: 100% center;
          }

          100% {
            background-position: 0% center;
          }
        }

        .footer-cta-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .footer-primary-btn,
        .footer-secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 48px;
          padding: 0 22px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .footer-primary-btn {
          color: white;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          box-shadow:
            0 10px 35px rgba(99, 102, 241, 0.2);
        }

        .footer-primary-btn:hover {
          transform: translateY(-3px);
          box-shadow:
            0 16px 45px rgba(99, 102, 241, 0.35);
        }

        .footer-primary-btn span {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .footer-primary-btn:hover span {
          transform: translateX(4px);
        }

        .footer-secondary-btn {
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.03);
        }

        .footer-secondary-btn:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.22);
        }

        /* =========================================
           ORBIT DECORATION
        ========================================= */

        .footer-cta-decoration {
          position: absolute;
          right: 70px;
          width: 360px;
          height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .footer-orbit {
          position: absolute;
          border: 1px solid rgba(129, 140, 248, 0.15);
          border-radius: 50%;
          animation: orbitSpin linear infinite;
        }

        .orbit-1 {
          width: 150px;
          height: 150px;
          animation-duration: 14s;
        }

        .orbit-2 {
          width: 250px;
          height: 250px;
          border-style: dashed;
          animation-duration: 20s;
          animation-direction: reverse;
        }

        .orbit-3 {
          width: 350px;
          height: 350px;
          animation-duration: 30s;
        }

        @keyframes orbitSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .footer-orbit-core {
          position: relative;
          z-index: 2;
          width: 76px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(99, 102, 241, 0.3),
              rgba(139, 92, 246, 0.12)
            );
          border: 1px solid rgba(129, 140, 248, 0.4);
          box-shadow:
            0 0 60px rgba(99, 102, 241, 0.25),
            inset 0 0 30px rgba(255, 255, 255, 0.04);
          animation: coreFloat 4s ease-in-out infinite;
        }

        .footer-orbit-core span {
          font-size: 30px;
          font-weight: 800;
          background: linear-gradient(
            135deg,
            #ffffff,
            #a5b4fc
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @keyframes coreFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        /* =========================================
           MAIN FOOTER
        ========================================= */

        .footer-main {
          display: grid;
          grid-template-columns:
            1.6fr
            0.8fr
            0.8fr
            0.9fr
            1.5fr;
          gap: 55px;
          padding: 0 0 70px;
        }

        .footer-brand {
          max-width: 320px;
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: white;
          text-decoration: none;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .footer-logo-icon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          font-size: 16px;
          font-weight: 800;
          box-shadow:
            0 8px 25px rgba(99, 102, 241, 0.25);
        }

        .footer-brand > p {
          margin: 20px 0;
          color: rgba(255, 255, 255, 0.45);
          font-size: 13px;
          line-height: 1.8;
        }

        .footer-status {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: rgba(255, 255, 255, 0.35);
          font-size: 10px;
          line-height: 1.5;
        }

        .status-dot {
          flex-shrink: 0;
          width: 7px;
          height: 7px;
          margin-top: 3px;
          border-radius: 50%;
          background: #34d399;
          box-shadow:
            0 0 10px rgba(52, 211, 153, 0.8);
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.35;
          }
        }

        /* =========================================
           FOOTER COLUMNS
        ========================================= */

        .footer-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 13px;
        }

        .footer-column h3,
        .footer-newsletter h3 {
          margin: 0 0 10px;
          color: white;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .footer-column a {
          color: rgba(255, 255, 255, 0.42);
          text-decoration: none;
          font-size: 13px;
          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }

        .footer-column a:hover {
          color: #a5b4fc;
          transform: translateX(4px);
        }

        /* =========================================
           NEWSLETTER
        ========================================= */

        .footer-newsletter {
          min-width: 0;
        }

        .footer-newsletter > p {
          margin: 0 0 18px;
          color: rgba(255, 255, 255, 0.42);
          font-size: 13px;
          line-height: 1.7;
        }

        .footer-subscribe {
          display: flex;
          align-items: center;
          height: 48px;
          padding: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.035);
          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .footer-subscribe:focus-within {
          border-color: rgba(129, 140, 248, 0.5);
          box-shadow:
            0 0 0 4px rgba(99, 102, 241, 0.08);
        }

        .footer-subscribe input {
          min-width: 0;
          flex: 1;
          height: 100%;
          padding: 0 12px;
          outline: none;
          border: 0;
          background: transparent;
          color: white;
          font-size: 12px;
        }

        .footer-subscribe input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .footer-subscribe button {
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 9px;
          cursor: pointer;
          color: white;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          font-size: 17px;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .footer-subscribe button:hover {
          transform: translateX(2px);
          box-shadow:
            0 5px 20px rgba(99, 102, 241, 0.3);
        }

        .footer-note {
          display: block;
          margin-top: 9px;
          color: rgba(255, 255, 255, 0.25);
          font-size: 10px;
        }

        .footer-success {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 48px;
          padding: 10px 14px;
          border: 1px solid rgba(52, 211, 153, 0.18);
          border-radius: 12px;
          background: rgba(52, 211, 153, 0.05);
        }

        .footer-success > span {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #34d399;
          background: rgba(52, 211, 153, 0.1);
        }

        .footer-success div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .footer-success strong {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
        }

        .footer-success small {
          color: rgba(255, 255, 255, 0.35);
          font-size: 9px;
        }

        /* =========================================
           BOTTOM
        ========================================= */

        .footer-bottom {
          min-height: 78px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.3);
          font-size: 10px;
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.35);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .footer-bottom-links a:hover {
          color: white;
        }

        .footer-socials {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .footer-socials a {
          width: 31px;
          height: 31px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          font-size: 9px;
          font-weight: 700;
          transition:
            transform 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .footer-socials a:hover {
          transform: translateY(-3px);
          color: white;
          border-color: rgba(129, 140, 248, 0.35);
          background: rgba(99, 102, 241, 0.1);
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1100px) {
          .footer-cta {
            padding: 80px 30px;
          }

          .footer-cta-decoration {
            right: -60px;
            opacity: 0.6;
          }

          .footer-main {
            grid-template-columns:
              1.4fr
              0.8fr
              0.8fr
              0.8fr;
          }

          .footer-newsletter {
            grid-column: 1 / -1;
            max-width: 450px;
          }
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 720px) {
          .footer-container {
            width: min(100% - 30px, 600px);
          }

          .footer-cta {
            min-height: auto;
            padding: 70px 0;
            margin-bottom: 55px;
          }

          .footer-cta-content {
            max-width: 100%;
          }

          .footer-cta h2 {
            font-size: clamp(40px, 12vw, 58px);
          }

          .footer-cta p {
            font-size: 14px;
          }

          .footer-cta-actions {
            flex-direction: column;
            align-items: stretch;
            max-width: 240px;
          }

          .footer-primary-btn,
          .footer-secondary-btn {
            width: 100%;
          }

          .footer-cta-decoration {
            right: -120px;
            bottom: -80px;
            transform: scale(0.7);
            opacity: 0.25;
          }

          .footer-main {
            grid-template-columns: repeat(2, 1fr);
            gap: 42px 25px;
          }

          .footer-brand {
            grid-column: 1 / -1;
            max-width: 100%;
          }

          .footer-newsletter {
            grid-column: 1 / -1;
            max-width: 100%;
          }

          .footer-bottom {
            grid-template-columns: 1fr;
            justify-items: center;
            padding: 25px 0;
            gap: 18px;
            text-align: center;
          }

          .footer-socials {
            justify-content: center;
          }
        }

        @media (max-width: 430px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
          }

          .footer-column {
            gap: 11px;
          }

          .footer-cta {
            padding-top: 55px;
          }

          .footer-cta h2 {
            font-size: 40px;
          }

          .footer-eyebrow {
            font-size: 9px;
          }
        }

        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .footer-cta h2 span,
          .footer-orbit,
          .footer-orbit-core,
          .status-dot {
            animation: none;
          }

          .footer-primary-btn,
          .footer-secondary-btn,
          .footer-column a,
          .footer-socials a {
            transition: none;
          }
        }
      `}</style>
    </footer>
  );
}