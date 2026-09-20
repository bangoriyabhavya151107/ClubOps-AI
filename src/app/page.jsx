"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  LayoutDashboard,
  Sparkles,
  Users,
  BarChart3,
  BrainCircuit,
  Zap,
  ShieldCheck,
  MessageSquareText,
  ListTodo,
  UserCheck,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import styles from "./home.module.css";

const features = [
  {
    icon: CalendarDays,
    number: "01",
    title: "Event Management",
    description:
      "Create, organize and track every club event from one structured workspace.",
  },
  {
    icon: Users,
    number: "02",
    title: "Member Management",
    description:
      "Keep your members, coordinators, roles and responsibilities organized.",
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Attendance",
    description:
      "Track participation and maintain reliable attendance records.",
  },
  {
    icon: ListTodo,
    number: "04",
    title: "Task Management",
    description:
      "Assign work, monitor progress and make sure important tasks do not get missed.",
  },
  {
    icon: BrainCircuit,
    number: "05",
    title: "AI Assistant",
    description:
      "Use AI to plan, organize and simplify repetitive club operations.",
  },
  {
    icon: BarChart3,
    number: "06",
    title: "Reports & Analytics",
    description:
      "Turn club activity into useful insights with clear operational reporting.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your workspace",
    description:
      "Set up your club and bring your team into one organized environment.",
  },
  {
    number: "02",
    title: "Organize everything",
    description:
      "Manage members, events, attendance and tasks without switching between tools.",
  },
  {
    number: "03",
    title: "Let AI help",
    description:
      "Use intelligent assistance to reduce repetitive work and plan faster.",
  },
  {
    number: "04",
    title: "Track progress",
    description:
      "See what is happening across your club and make better operational decisions.",
  },
];

function Reveal({ children, className = "" }) {
  return (
    <div className={`${styles.reveal} ${className}`}>
      {children}
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      `.${styles.reveal}, .${styles.revealLeft}, .${styles.revealRight}`
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page}>
      {/* =========================================
          BACKGROUND
      ========================================= */}
      <div className={styles.background}>
        <div className={styles.grid} />
        <div className={`${styles.orb} ${styles.orbOne}`} />
        <div className={`${styles.orb} ${styles.orbTwo}`} />
        <div className={`${styles.orb} ${styles.orbThree}`} />
      </div>

      {/* =========================================
          NAVBAR
      ========================================= */}
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>C</span>
          <span className={styles.logoText}>ClubOps AI</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.active}>
            Home
          </Link>

          <Link href="/features">
            Features
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link href="/contact">
            Contact
          </Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>

          <Link href="/register" className={styles.navCta}>
            Get Started
            <ArrowRight size={15} />
          </Link>
        </div>
      </nav>

      {/* =========================================
          HERO
      ========================================= */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Reveal>
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot} />
              <Sparkles size={14} />
              AI-POWERED CLUB MANAGEMENT
            </div>
          </Reveal>

          <Reveal className={styles.heroRevealDelay}>
            <h1 className={styles.heroTitle}>
              Your club.
              <br />
              <span>Organized intelligently.</span>
            </h1>
          </Reveal>

          <Reveal className={styles.heroRevealDelayTwo}>
            <p className={styles.heroDescription}>
              ClubOps AI gives college clubs one powerful workspace to
              manage members, events, attendance, tasks and operations —
              with AI built into the experience.
            </p>
          </Reveal>

          <Reveal className={styles.heroRevealDelayThree}>
            <div className={styles.heroActions}>
              <Link href="/register" className={styles.primaryButton}>
                Start Managing
                <ArrowRight size={18} />
              </Link>

              <Link href="/features" className={styles.secondaryButton}>
                Explore Features
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </Reveal>

          <Reveal className={styles.heroRevealDelayFour}>
            <div className={styles.trustRow}>
              <div>
                <CheckCircle2 size={15} />
                Built for college clubs
              </div>

              <span />

              <div>
                <Zap size={15} />
                AI-powered workflows
              </div>

              <span />

              <div>
                <ShieldCheck size={15} />
                One organized workspace
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================
          PRODUCT PREVIEW
      ========================================= */}
      <section className={styles.previewSection}>
        <Reveal className={styles.previewReveal}>
          <div className={styles.previewWindow}>
            <div className={styles.windowTop}>
              <div className={styles.windowDots}>
                <span />
                <span />
                <span />
              </div>

              <div className={styles.windowAddress}>
                clubops.ai / dashboard
              </div>

              <div className={styles.windowStatus}>
                <span />
                Live workspace
              </div>
            </div>

            <div className={styles.dashboardPreview}>
              <aside className={styles.previewSidebar}>
                <div className={styles.previewBrand}>
                  <span>C</span>
                  ClubOps
                </div>

                <div className={styles.sidebarLabel}>
                  WORKSPACE
                </div>

                <div className={styles.sideItemActive}>
                  <LayoutDashboard size={15} />
                  Dashboard
                </div>

                <div className={styles.sideItem}>
                  <CalendarDays size={15} />
                  Events
                </div>

                <div className={styles.sideItem}>
                  <Users size={15} />
                  Members
                </div>

                <div className={styles.sideItem}>
                  <ClipboardCheck size={15} />
                  Attendance
                </div>

                <div className={styles.sideItem}>
                  <ListTodo size={15} />
                  Tasks
                </div>
              </aside>

              <div className={styles.previewMain}>
                <div className={styles.previewHeader}>
                  <div>
                    <span>MONDAY, SEPTEMBER 20</span>
                    <h3>Good morning, Club Admin.</h3>
                  </div>

                  <div className={styles.previewAvatar}>BA</div>
                </div>

                <div className={styles.previewStats}>
                  <div className={styles.previewStat}>
                    <div className={styles.statIcon}>
                      <Users size={17} />
                    </div>

                    <div>
                      <span>Total Members</span>
                      <strong>248</strong>
                    </div>

                    <small>+12%</small>
                  </div>

                  <div className={styles.previewStat}>
                    <div className={styles.statIcon}>
                      <CalendarDays size={17} />
                    </div>

                    <div>
                      <span>Upcoming Events</span>
                      <strong>08</strong>
                    </div>

                    <small>Next 30 days</small>
                  </div>

                  <div className={styles.previewStat}>
                    <div className={styles.statIcon}>
                      <ClipboardCheck size={17} />
                    </div>

                    <div>
                      <span>Attendance</span>
                      <strong>91%</strong>
                    </div>

                    <small>+4.2%</small>
                  </div>
                </div>

                <div className={styles.previewGrid}>
                  <div className={styles.activityCard}>
                    <div className={styles.cardHeading}>
                      <div>
                        <span>OVERVIEW</span>
                        <h4>Club activity</h4>
                      </div>

                      <BarChart3 size={18} />
                    </div>

                    <div className={styles.chart}>
                      <div className={styles.chartLine}>
                        <span style={{ height: "38%" }} />
                        <span style={{ height: "54%" }} />
                        <span style={{ height: "43%" }} />
                        <span style={{ height: "70%" }} />
                        <span style={{ height: "58%" }} />
                        <span style={{ height: "84%" }} />
                        <span style={{ height: "74%" }} />
                        <span style={{ height: "93%" }} />
                      </div>

                      <div className={styles.chartLabels}>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.upcomingCard}>
                    <div className={styles.cardHeading}>
                      <div>
                        <span>NEXT UP</span>
                        <h4>Upcoming event</h4>
                      </div>

                      <ArrowUpRight size={17} />
                    </div>

                    <div className={styles.eventMock}>
                      <div className={styles.eventDate}>
                        <strong>24</strong>
                        <span>SEP</span>
                      </div>

                      <div>
                        <strong>TechFest 2026</strong>
                        <p>
                          <Clock3 size={13} />
                          10:00 AM
                        </p>
                      </div>
                    </div>

                    <div className={styles.eventProgress}>
                      <span />
                    </div>

                    <small>72% preparation complete</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================================
          STATS
      ========================================= */}
      <section className={styles.statsSection}>
        <Reveal>
          <div className={styles.statsGrid}>
            <div>
              <strong>01</strong>
              <span>Unified workspace</span>
            </div>

            <div>
              <strong>06+</strong>
              <span>Core club workflows</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Intelligent assistance</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Accessible anywhere</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =========================================
          FEATURES
      ========================================= */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.sectionContainer}>
          <Reveal>
            <div className={styles.sectionIntro}>
              <div>
                <span className={styles.sectionEyebrow}>
                  <span />
                  THE CLUB OPERATING SYSTEM
                </span>

                <h2>
                  Everything your club needs.
                  <br />
                  <span>Nothing you don't.</span>
                </h2>
              </div>

              <p>
                Replace scattered spreadsheets, chats and disconnected
                tools with one organized environment designed around
                how student clubs actually work.
              </p>
            </div>
          </Reveal>

          <div className={styles.featureGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal
                  key={feature.title}
                  className={styles[`featureDelay${index + 1}`]}
                >
                  <Link
                    href="/features"
                    className={styles.featureCard}
                  >
                    <div className={styles.featureTop}>
                      <div className={styles.featureIcon}>
                        <Icon size={22} />
                      </div>

                      <span>{feature.number}</span>
                    </div>

                    <div className={styles.featureContent}>
                      <h3>{feature.title}</h3>

                      <p>{feature.description}</p>
                    </div>

                    <div className={styles.featureArrow}>
                      <ArrowUpRight size={18} />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className={styles.featureMore}>
              <Link href="/features">
                Explore all ClubOps AI features
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================
          AI SECTION
      ========================================= */}
      <section className={styles.aiSection}>
        <div className={styles.aiGlow} />

        <div className={styles.sectionContainer}>
          <div className={styles.aiGrid}>
            <Reveal className={styles.aiRevealLeft}>
              <div className={styles.aiVisual}>
                <div className={styles.aiCircle}>
                  <div className={styles.aiCore}>
                    <BrainCircuit size={34} />
                  </div>
                </div>

                <div className={styles.aiFloatingCardOne}>
                  <Sparkles size={15} />
                  AI planning
                </div>

                <div className={styles.aiFloatingCardTwo}>
                  <CheckCircle2 size={15} />
                  Task organized
                </div>

                <div className={styles.aiFloatingCardThree}>
                  <MessageSquareText size={15} />
                  Smart suggestions
                </div>
              </div>
            </Reveal>

            <Reveal className={styles.aiRevealRight}>
              <div className={styles.aiContent}>
                <span className={styles.sectionEyebrow}>
                  <span />
                  INTELLIGENCE BUILT IN
                </span>

                <h2>
                  Don't just manage
                  <br />
                  your club.
                  <span> Make it smarter.</span>
                </h2>

                <p>
                  ClubOps AI is designed to help reduce repetitive
                  operational work so your team can spend more time
                  creating events, building communities and making
                  an impact.
                </p>

                <div className={styles.aiPoints}>
                  <div>
                    <div>
                      <Sparkles size={17} />
                    </div>

                    <span>
                      <strong>Plan faster</strong>
                      Get help turning ideas into structured plans.
                    </span>
                  </div>

                  <div>
                    <div>
                      <Zap size={17} />
                    </div>

                    <span>
                      <strong>Reduce repetitive work</strong>
                      Spend less time on routine organization.
                    </span>
                  </div>

                  <div>
                    <div>
                      <BrainCircuit size={17} />
                    </div>

                    <span>
                      <strong>Work with context</strong>
                      Keep club information organized around your workflow.
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================
          HOW IT WORKS
      ========================================= */}
      <section className={styles.workflowSection}>
        <div className={styles.sectionContainer}>
          <Reveal>
            <div className={styles.centerIntro}>
              <span className={styles.sectionEyebrow}>
                <span />
                SIMPLE BY DESIGN
              </span>

              <h2>
                From scattered work
                <br />
                to <span>one clear workflow.</span>
              </h2>

              <p>
                ClubOps AI keeps the operational side of your club
                simple, visible and organized.
              </p>
            </div>
          </Reveal>

          <div className={styles.steps}>
            {steps.map((step, index) => (
              <Reveal
                key={step.number}
                className={styles[`stepDelay${index + 1}`]}
              >
                <div className={styles.step}>
                  <div className={styles.stepNumber}>
                    {step.number}
                  </div>

                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          ABOUT / WHY
      ========================================= */}
      <section className={styles.whySection} id="about">
        <div className={styles.sectionContainer}>
          <div className={styles.whyBox}>
            <Reveal>
              <div className={styles.whyHeading}>
                <span className={styles.sectionEyebrow}>
                  <span />
                  BUILT FOR STUDENT TEAMS
                </span>

                <h2>
                  Your club should spend
                  <br />
                  more time <span>building.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className={styles.whyContent}>
                <p>
                  Running a college club means coordinating people,
                  deadlines, events, communication and countless small
                  tasks. ClubOps AI brings those moving pieces together
                  into one focused workspace.
                </p>

                <Link href="/about" className={styles.textLink}>
                  Learn more about ClubOps AI
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaGlow} />

        <Reveal>
          <span className={styles.finalLabel}>
            READY WHEN YOU ARE
          </span>

          <h2>
            Run your club.
            <br />
            <span>Smarter.</span>
          </h2>

          <p>
            Bring your club operations together with ClubOps AI.
          </p>

          <div className={styles.finalActions}>
            <Link href="/register" className={styles.primaryButton}>
              Create your workspace
              <ArrowRight size={18} />
            </Link>

            <Link href="/contact" className={styles.finalContact}>
              Have a question?
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* =========================================
          EXISTING FOOTER
      ========================================= */}
      <Footer />
    </main>
  );
}