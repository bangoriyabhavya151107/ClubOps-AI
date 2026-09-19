"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Footer.module.css";

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
    <footer className={styles.footer}>
      {/* =====================================================
          TOP CTA
      ====================================================== */}
      <div className={styles.wrapper}>
        <section className={styles.cta}>
          <div className={styles.ctaGlow} />

          <div className={styles.ctaContent}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              CLUBOPS AI
            </span>

            <h2 className={styles.ctaTitle}>
              Run your club
              <span>smarter.</span>
            </h2>

            <p className={styles.ctaDescription}>
              Manage members, events, attendance and club
              operations from one organized workspace.
            </p>
          </div>

          <div className={styles.ctaActions}>
            <Link
              href="/register"
              className={styles.primaryButton}
            >
              Get Started
              <span>→</span>
            </Link>

            <Link
              href="/contact"
              className={styles.secondaryButton}
            >
              Contact Us
            </Link>
          </div>
        </section>

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}
        <div className={styles.main}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>C</span>

              <span className={styles.logoText}>
                ClubOps AI
              </span>
            </Link>

            <p className={styles.brandDescription}>
              A modern workspace built to help college clubs
              organize their people, events and operations.
            </p>

            <div className={styles.status}>
              <span className={styles.statusDot} />
              <span>Building smarter club management</span>
            </div>
          </div>

          {/* Product */}
          <div className={styles.column}>
            <h3>Product</h3>

            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/register">Get Started</Link>
          </div>

          {/* Workspace */}
          <div className={styles.column}>
            <h3>Workspace</h3>

            <Link href="/dashboard">Dashboard</Link>
            <Link href="/members">Members</Link>
            <Link href="/events">Events</Link>
            <Link href="/attendance">Attendance</Link>
          </div>

          {/* Support */}
          <div className={styles.column}>
            <h3>Support</h3>

            <Link href="/contact">Contact Support</Link>
            <Link href="/forgot-password">
              Forgot Password
            </Link>

            <a href="mailto:support@clubops.ai">
              Email Support
            </a>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletter}>
            <h3>Stay updated</h3>

            <p>
              Get occasional updates about new ClubOps AI
              features and improvements.
            </p>

            {subscribed ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>

                <div>
                  <strong>You&apos;re subscribed</strong>
                  <span>
                    Thanks for joining the ClubOps community.
                  </span>
                </div>
              </div>
            ) : (
              <form
                className={styles.subscribeForm}
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  aria-label="Email address"
                  required
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                >
                  →
                </button>
              </form>
            )}

            {!subscribed && (
              <span className={styles.newsletterNote}>
                No spam. Only useful product updates.
              </span>
            )}
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} ClubOps AI
            <span className={styles.separator}>•</span>
            All rights reserved.
          </div>

          <div className={styles.legal}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>

          <div className={styles.socials}>
            <a
              href="https://github.com/bangoriyabhavya151107/ClubOps-AI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={styles.social}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z"
                />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={styles.social}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2 2 0 1 0 5.25 7a2 2 0 0 0 0-4ZM20.44 13.4c0-3.46-1.85-5.07-4.32-5.07-1.99 0-2.88 1.1-3.38 1.88V8.5H9.36V20h3.38v-6.4c0-1.69.32-3.33 2.42-3.33 2.07 0 2.1 1.94 2.1 3.44V20h3.18v-6.6Z"
                />
              </svg>
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.social}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  ry="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}