"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Check, Users, Calendar, Shield, Cpu, Activity } from "lucide-react";
import Reveal from "@/components/animation/Reveal";
import Parallax from "@/components/animation/Parallax";
import styles from "./home.module.css";

const FEATURES = [
  {
    number: "01",
    title: "Event Operations",
    description: "Plan, schedule and execute campus events with centralized milestones, deadlines and venue assignments.",
  },
  {
    number: "02",
    title: "Role Governance",
    description: "Clear demarcation for Admins, Coordinators and Volunteers. Ensure everyone has the right permissions.",
  },
  {
    number: "03",
    title: "Attendance & Check-ins",
    description: "Live participation tracking for workshops and general meetings. No more lost paper sheets.",
  },
  {
    number: "04",
    title: "Financial Control",
    description: "Track event budgets, categorize expenses and ensure complete financial transparency across the board.",
  },
  {
    number: "05",
    title: "Risk Management",
    description: "Identify logistical and venue risks before they become incidents with an active risk register.",
  },
  {
    number: "06",
    title: "AI Assistant",
    description: "Use intelligent generative models to draft event schedules, volunteer rosters and campus communications.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Initialize Space",
    text: "Set up your student club workspace and invite team members with dedicated operational roles.",
  },
  {
    number: "02",
    title: "Organize & Assign",
    text: "Schedule upcoming events, delegate tasks to volunteers and establish clear accountability.",
  },
  {
    number: "03",
    title: "AI Acceleration",
    text: "Let the AI assistant generate schedules, announcements and operational risk checklists.",
  },
  {
    number: "04",
    title: "Review & Report",
    text: "Monitor real-time participation, task progress and export clean analytical reports.",
  },
];

export default function HomePage() {
  return (
    <div className={styles.landingPage}>
      {/* =========================================
          NAVBAR (PRAVAS SAATHI STYLE)
          ========================================= */}
      <nav className={styles.navbar}>
        <Link href="/" className={styles.brand}>
          <div className={styles.brandDot} />
          ClubOps AI<span>.</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.active}>Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/login" className={styles.navLogin}>Sign in</Link>
          <Link href="/register" className={styles.navCta}>
            Get Started →
          </Link>
        </div>
      </nav>

      {/* =========================================
          HERO SECTION (PRAVAS SAATHI EDITORIAL HERO)
          ========================================= */}
      <main>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <Reveal>
              <span className="eyebrow">
                YOUR CLUB · YOUR WORKSPACE
              </span>

              <h1 className={styles.heroTitle}>
                Manage
                <br />
                <em>with purpose.</em>
              </h1>

              <p className={styles.heroDescription}>
                ClubOps AI unifies campus events, volunteer coordination,
                attendance, financial budgets and AI intelligence into one
                connected operational experience.
              </p>

              <div className={styles.heroActions}>
                <Link href="/register" className="button-primary">
                  Start planning →
                </Link>
                <a href="#discover" className="button-secondary">
                  Explore platform
                </a>
              </div>
            </Reveal>
          </div>

          <Parallax strength={-65} className={styles.heroVisual}>
            <div className={styles.heroGlow} />

            <div className={`${styles.floatingCard} ${styles.cardMain}`}>
              <span>UPCOMING EVENT</span>
              <strong>Tech Fest 2026</strong>
              <small>Main Hall · 280 Registered</small>
            </div>

            <div className={`${styles.floatingCard} ${styles.cardSecondary}`}>
              <span>CLUB HEALTH</span>
              <strong>98%</strong>
              <small>Tasks on schedule</small>
            </div>

            <div className={`${styles.floatingCard} ${styles.cardMini}`}>
              <span>AI COPILOT</span>
              <strong>✓ Active</strong>
            </div>
          </Parallax>
        </section>

        {/* =========================================
            STATEMENT SECTION
            ========================================= */}
        <section className={styles.statementSection} id="discover">
          <Reveal>
            <span className="eyebrow">THE PHILOSOPHY</span>
            <h2>
              Operations should
              <br />
              feel like part
              <br />
              of the mission.
            </h2>
            <p>
              Student organizations shouldn't be lost in messy spreadsheets,
              endless chat groups and forgotten checklists. We build clarity into
              every event.
            </p>
          </Reveal>
        </section>

        {/* =========================================
            SHOWCASE SECTION (EDITORIAL CARDS)
            ========================================= */}
        <section className={styles.showcaseSection}>
          <Reveal>
            <span className="eyebrow">02 / CAPABILITIES</span>
            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.06em", margin: 0, fontWeight: 800 }}>
              Engineered for
              <br />
              campus leaders.
            </h2>
          </Reveal>

          <div className={styles.showcaseGrid}>
            {FEATURES.map((feat, idx) => (
              <Reveal key={feat.number} delay={idx * 0.08}>
                <article className={styles.showcaseCard}>
                  <span className={styles.showcaseNumber}>{feat.number}</span>
                  <div>
                    <h3>{feat.title}</h3>
                    <p>{feat.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =========================================
            PROCESS SECTION (03 / THE PROCESS)
            ========================================= */}
        <section className={styles.processSection}>
          <Reveal>
            <span className="eyebrow">03 / THE PROCESS</span>
            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.06em", margin: 0, fontWeight: 800 }}>
              From setup
              <br />
              to execution.
            </h2>
          </Reveal>

          <div className={styles.processGrid}>
            {PROCESS_STEPS.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 0.1}>
                <div className={styles.processStep}>
                  <span className={styles.processStepNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =========================================
            FINAL CTA (PRAVAS SAATHI EDITORIAL CTA)
            ========================================= */}
        <section className={styles.finalCta}>
          <Reveal>
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>
              YOUR NEXT CHAPTER
            </span>

            <h2>
              Where will your
              <br />
              club lead next?
            </h2>

            <Link href="/register" className={styles.finalCtaButton}>
              Create your workspace →
            </Link>
          </Reveal>
        </section>
      </main>

      {/* =========================================
          FOOTER
          ========================================= */}
      <footer className={styles.landingFooter}>
        <strong>ClubOps AI.</strong>
        <span>Student operations, reimagined.</span>
      </footer>
    </div>
  );
}