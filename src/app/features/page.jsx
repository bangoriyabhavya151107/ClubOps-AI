"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ClipboardCheck,
  Users,
  ListTodo,
  BrainCircuit,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Zap,
  UserCheck,
  MessageSquareText,
  LayoutDashboard,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import styles from "./features.module.css";

const features = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Event Management",
    tag: "PLAN • ORGANIZE • EXECUTE",
    description:
      "Create and manage your club's events from a single organized workspace. Keep event details, deadlines and operational information together instead of scattered across different tools.",
    points: [
      "Create and organize events",
      "Track upcoming activities",
      "Keep event information centralized",
      "Reduce operational confusion",
    ],
  },
  {
    number: "02",
    icon: Users,
    title: "Member Management",
    tag: "PEOPLE • ROLES • TEAMS",
    description:
      "Maintain a clear view of your club members and the people responsible for making things happen.",
    points: [
      "Organize member information",
      "Manage club roles",
      "Keep coordinators visible",
      "Build a structured team workspace",
    ],
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Attendance",
    tag: "TRACK • MEASURE • IMPROVE",
    description:
      "Track participation and attendance in a structured way so your team can understand engagement across club activities.",
    points: [
      "Record attendance",
      "Monitor participation",
      "Keep attendance information organized",
      "Understand member engagement",
    ],
  },
  {
    number: "04",
    icon: ListTodo,
    title: "Task Management",
    tag: "ASSIGN • TRACK • COMPLETE",
    description:
      "Turn club plans into actionable work. Assign responsibilities and keep important tasks visible to your team.",
    points: [
      "Create operational tasks",
      "Assign responsibilities",
      "Track task progress",
      "Reduce missed deadlines",
    ],
  },
  {
    number: "05",
    icon: BrainCircuit,
    title: "AI Assistant",
    tag: "THINK • PLAN • ASSIST",
    description:
      "Use AI as an operational assistant for planning, organizing and reducing repetitive work across your club.",
    points: [
      "Get planning assistance",
      "Generate structured ideas",
      "Reduce repetitive work",
      "Make operational workflows smarter",
    ],
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Reports & Analytics",
    tag: "UNDERSTAND • ANALYZE • ACT",
    description:
      "Turn your club's operational activity into information that helps your team understand what is happening.",
    points: [
      "View operational information",
      "Track club activity",
      "Understand participation",
      "Support better decisions",
    ],
  },
];

function Reveal({ children, className = "" }) {
  return (
    <div className={`${styles.reveal} ${className}`}>
      {children}
    </div>
  );
}

export default function FeaturesPage() {
  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.reveal}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page}>
      {/* BACKGROUND */}
      <div className={styles.background}>
        <div className={styles.grid} />
        <div className={`${styles.orb} ${styles.orbOne}`} />
        <div className={`${styles.orb} ${styles.orbTwo}`} />
      </div>

      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>C</span>
          <span>ClubOps AI</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/">Home</Link>

          <Link href="/features" className={styles.active}>
            Features
          </Link>

          <Link href="/about">About</Link>

          <Link href="/contact">Contact</Link>
        </div>

        <Link href="/register" className={styles.navCta}>
          Get Started
          <ArrowRight size={15} />
        </Link>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <Reveal>
          <div className={styles.heroBadge}>
            <span />
            CLUBOPS AI PLATFORM
          </div>
        </Reveal>

        <Reveal>
          <h1>
            One workspace.
            <br />
            <span>Every club operation.</span>
          </h1>
        </Reveal>

        <Reveal>
          <p>
            From your next event to your latest attendance record,
            ClubOps AI brings the operational side of your club
            together in one intelligent workspace.
          </p>
        </Reveal>

        <Reveal>
          <div className={styles.heroActions}>
            <Link href="/register" className={styles.primaryButton}>
              Start with ClubOps AI
              <ArrowRight size={17} />
            </Link>

            <Link href="/" className={styles.secondaryButton}>
              Back to Home
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FEATURE NAV */}
      <section className={styles.featureNavSection}>
        <div className={styles.featureNav}>
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <a
                key={feature.number}
                href={`#feature-${feature.number}`}
                className={styles.featureNavItem}
              >
                <span>{feature.number}</span>
                <Icon size={15} />
                <strong>{feature.title}</strong>
              </a>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const reverse = index % 2 !== 0;

          return (
            <div
              key={feature.number}
              id={`feature-${feature.number}`}
              className={styles.featureAnchor}
            >
              <Reveal>
                <article
                  className={`${styles.featureBlock} ${
                    reverse ? styles.reverse : ""
                  }`}
                >
                  <div className={styles.featureVisual}>
                    <div className={styles.visualGlow} />

                    <div className={styles.mockWindow}>
                      <div className={styles.mockTop}>
                        <div>
                          <span />
                          <span />
                          <span />
                        </div>

                        <small>ClubOps AI</small>

                        <ShieldCheck size={13} />
                      </div>

                      <div className={styles.mockBody}>
                        <div className={styles.mockIcon}>
                          <Icon size={27} />
                        </div>

                        <span>{feature.tag}</span>

                        <strong>{feature.title}</strong>

                        <div className={styles.mockRows}>
                          <div />
                          <div />
                          <div />
                        </div>

                        <div className={styles.mockFooter}>
                          <span>
                            <CheckCircle2 size={12} />
                            Organized
                          </span>

                          <span>
                            <Clock3 size={12} />
                            Updated
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.floatingMini}>
                      <Sparkles size={13} />
                      Club workspace
                    </div>
                  </div>

                  <div className={styles.featureCopy}>
                    <div className={styles.featureNumber}>
                      {feature.number}
                    </div>

                    <div className={styles.featureIcon}>
                      <Icon size={23} />
                    </div>

                    <span className={styles.featureTag}>
                      {feature.tag}
                    </span>

                    <h2>{feature.title}</h2>

                    <p>{feature.description}</p>

                    <ul>
                      {feature.points.map((point) => (
                        <li key={point}>
                          <CheckCircle2 size={16} />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <Link href="/register" className={styles.featureLink}>
                      Start using ClubOps AI
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            </div>
          );
        })}
      </section>

      {/* AI STRIP */}
      <section className={styles.aiSection}>
        <div className={styles.aiInner}>
          <Reveal>
            <div className={styles.aiIcon}>
              <BrainCircuit size={30} />
            </div>

            <span className={styles.aiLabel}>
              <Sparkles size={13} />
              INTELLIGENCE BUILT IN
            </span>

            <h2>
              Your club operations,
              <br />
              <span>with an AI layer.</span>
            </h2>

            <p>
              ClubOps AI is designed to make the operational side of
              student organizations more organized, more visible and
              easier to manage.
            </p>

            <Link href="/register" className={styles.aiButton}>
              Build your workspace
              <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        <Reveal>
          <span>READY TO GET STARTED?</span>

          <h2>
            Bring your club
            <br />
            <strong>together.</strong>
          </h2>

          <p>
            One platform for your people, events and operations.
          </p>

          <Link href="/register" className={styles.primaryButton}>
            Create your workspace
            <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}