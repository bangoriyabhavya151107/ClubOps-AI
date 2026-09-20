"use client";

import {
  useEffect,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  LayoutDashboard,
  ListTodo,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Zap,
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
      "Keep your members, coordinators and responsibilities organized.",
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Attendance",
    description:
      "Track participation and maintain reliable event attendance records.",
  },
  {
    icon: ListTodo,
    number: "04",
    title: "Task Management",
    description:
      "Assign work, monitor progress and keep important deadlines visible.",
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
      "Turn club activity into useful operational insights.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your workspace",
    text:
      "Bring your club and team into one organized digital workspace.",
  },
  {
    number: "02",
    title: "Organize everything",
    text:
      "Manage events, members, tasks, meetings and attendance in one place.",
  },
  {
    number: "03",
    title: "Let AI help",
    text:
      "Use intelligent assistance to reduce repetitive operational work.",
  },
  {
    number: "04",
    title: "Track progress",
    text:
      "Understand what is happening across your club and act faster.",
  },
];

export default function HomePage() {
  useEffect(() => {
    const elements =
      document.querySelectorAll(
        `.${styles.reveal}, .${styles.revealLeft}, .${styles.revealRight}`
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  styles.visible
                );
              }
            }
          );
        },
        {
          threshold: 0.08,
        }
      );

    elements.forEach(
      (element) =>
        observer.observe(element)
    );

    return () =>
      observer.disconnect();
  }, []);

  return (
    <main
      className={
        styles.page
      }
    >
      <div
        className={
          styles.background
        }
      >
        <div
          className={
            styles.grid
          }
        />

        <div
          className={`${styles.orb} ${styles.orbOne}`}
        />

        <div
          className={`${styles.orb} ${styles.orbTwo}`}
        />

        <div
          className={`${styles.orb} ${styles.orbThree}`}
        />
      </div>

      <nav
        className={
          styles.navbar
        }
      >
        <Link
          href="/"
          className={
            styles.logo
          }
        >
          <span
            className={
              styles.logoIcon
            }
          >
            C
          </span>

          <span
            className={
              styles.logoText
            }
          >
            ClubOps AI
          </span>
        </Link>

        <div
          className={
            styles.navLinks
          }
        >
          <Link
            href="/"
            className={
              styles.active
            }
          >
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

        <div
          className={
            styles.navActions
          }
        >
          <Link
            href="/login"
            className={
              styles.loginButton
            }
          >
            Login
          </Link>

          <Link
            href="/register"
            className={
              styles.navCta
            }
          >
            Get Started
            <ArrowRight size={15} />
          </Link>
        </div>
      </nav>

      <section
        className={
          styles.hero
        }
      >
        <div
          className={
            styles.heroGlow
          }
        />

        <div
          className={
            styles.heroContent
          }
        >
          <div
            className={`${styles.heroBadge} ${styles.reveal}`}
          >
            <Sparkles size={13} />

            AI-POWERED CLUB OPERATIONS

            <span>
              ●
            </span>

            LIVE
          </div>

          <h1
            className={`${styles.heroTitle} ${styles.reveal}`}
          >
            Your club.
            <br />

            <span>
              One intelligent
              workspace.
            </span>
          </h1>

          <p
            className={`${styles.heroDescription} ${styles.reveal}`}
          >
            ClubOps AI brings events,
            volunteers, tasks,
            attendance, meetings,
            budgets and AI assistance
            into one modern workspace
            built for student clubs.
          </p>

          <div
            className={`${styles.heroActions} ${styles.reveal}`}
          >
            <Link
              href="/register"
              className={
                styles.primaryButton
              }
            >
              Start managing

              <ArrowRight size={16} />
            </Link>

            <Link
              href="#features"
              className={
                styles.secondaryButton
              }
            >
              Explore platform

              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div
            className={`${styles.heroTrust} ${styles.reveal}`}
          >
            <div>
              <CheckCircle2 size={14} />
              <span>
                Real-time workspace
              </span>
            </div>

            <div>
              <CheckCircle2 size={14} />
              <span>
                Supabase powered
              </span>
            </div>

            <div>
              <CheckCircle2 size={14} />
              <span>
                AI assisted
              </span>
            </div>
          </div>
        </div>

        <div
          className={`${styles.dashboardPreview} ${styles.reveal}`}
        >
          <div
            className={
              styles.previewTop
            }
          >
            <div
              className={
                styles.previewBrand
              }
            >
              <span>
                C
              </span>

              ClubOps AI
            </div>

            <div
              className={
                styles.previewDots
              }
            >
              <i />
              <i />
              <i />
            </div>
          </div>

          <div
            className={
              styles.previewBody
            }
          >
            <aside
              className={
                styles.previewSidebar
              }
            >
              <div
                className={
                  styles.previewSideLogo
                }
              >
                C
              </div>

              <div
                className={
                  styles.previewSideActive
                }
              >
                ◈
              </div>

              <div>
                ✓
              </div>

              <div>
                👥
              </div>

              <div>
                ◷
              </div>

              <div>
                ✦
              </div>
            </aside>

            <div
              className={
                styles.previewMain
              }
            >
              <div
                className={
                  styles.previewWelcome
                }
              >
                <div>
                  <small>
                    LIVE WORKSPACE
                  </small>

                  <strong>
                    Good morning,
                    team 👋
                  </strong>
                </div>

                <span>
                  ADMIN
                </span>
              </div>

              <div
                className={
                  styles.previewStats
                }
              >
                <div>
                  <small>
                    MEMBERS
                  </small>

                  <strong>
                    128
                  </strong>

                  <span>
                    +12 this month
                  </span>
                </div>

                <div>
                  <small>
                    EVENTS
                  </small>

                  <strong>
                    08
                  </strong>

                  <span>
                    3 this week
                  </span>
                </div>

                <div>
                  <small>
                    TASKS
                  </small>

                  <strong>
                    76%
                  </strong>

                  <span>
                    completion
                  </span>
                </div>
              </div>

              <div
                className={
                  styles.previewCards
                }
              >
                <div>
                  <small>
                    UPCOMING EVENTS
                  </small>

                  <strong>
                    Tech Fest 2026
                  </strong>

                  <span>
                    24 Sep · Main Auditorium
                  </span>

                  <b>
                    Upcoming
                  </b>
                </div>

                <div>
                  <small>
                    AI ASSISTANT
                  </small>

                  <strong>
                    Event plan generated
                  </strong>

                  <span>
                    12 tasks · 4 risks · 8 volunteers
                  </span>

                  <b>
                    ✦ Ready
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className={
          styles.featuresSection
        }
      >
        <div
          className={`${styles.sectionIntro} ${styles.reveal}`}
        >
          <span>
            PLATFORM
          </span>

          <h2>
            Everything your club
            <br />
            needs to operate.
          </h2>

          <p>
            Replace scattered spreadsheets,
            chats and documents with one
            structured operational system.
          </p>
        </div>

        <div
          className={
            styles.featureGrid
          }
        >
          {features.map(
            (feature) => {
              const Icon =
                feature.icon;

              return (
                <article
                  key={
                    feature.number
                  }
                  className={`${styles.featureCard} ${styles.reveal}`}
                >
                  <div
                    className={
                      styles.featureTop
                    }
                  >
                    <div
                      className={
                        styles.featureIcon
                      }
                    >
                      <Icon
                        size={19}
                      />
                    </div>

                    <span>
                      {
                        feature.number
                      }
                    </span>
                  </div>

                  <h3>
                    {
                      feature.title
                    }
                  </h3>

                  <p>
                    {
                      feature.description
                    }
                  </p>

                  <ArrowUpRight
                    size={17}
                    className={
                      styles.featureArrow
                    }
                  />
                </article>
              );
            }
          )}
        </div>
      </section>

      <section
        className={
          styles.intelligence
        }
      >
        <div
          className={`${styles.intelligenceVisual} ${styles.revealLeft}`}
        >
          <div
            className={
              styles.aiCircle
            }
          >
            <div
              className={
                styles.aiCore
              }
            >
              <BrainCircuit
                size={30}
              />
            </div>

            <div
              className={`${styles.aiOrbit} ${styles.aiOrbitOne}`}
            />

            <div
              className={`${styles.aiOrbit} ${styles.aiOrbitTwo}`}
            />

            <div
              className={`${styles.aiOrbit} ${styles.aiOrbitThree}`}
            />
          </div>

          <div
            className={
              styles.aiFloating
            }
          >
            <Zap size={14} />
            <span>
              AI planning
            </span>
          </div>
        </div>

        <div
          className={`${styles.intelligenceContent} ${styles.revealRight}`}
        >
          <span>
            INTELLIGENT OPERATIONS
          </span>

          <h2>
            Stop spending
            <br />
            your time on
            <em>
              repetitive work.
            </em>
          </h2>

          <p>
            ClubOps AI is designed to
            help student teams spend
            less time coordinating
            spreadsheets and more time
            building meaningful
            experiences.
          </p>

          <div
            className={
              styles.intelligenceList
            }
          >
            <div>
              <BrainCircuit
                size={17}
              />

              <span>
                Generate event plans
                with AI
              </span>
            </div>

            <div>
              <ShieldCheck
                size={17}
              />

              <span>
                Identify operational
                risks
              </span>
            </div>

            <div>
              <MessageSquareText
                size={17}
              />

              <span>
                Create communication
                faster
              </span>
            </div>

            <div>
              <LayoutDashboard
                size={17}
              />

              <span>
                Understand your
                workspace instantly
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className={
          styles.workflow
        }
      >
        <div
          className={`${styles.sectionIntro} ${styles.reveal}`}
        >
          <span>
            HOW IT WORKS
          </span>

          <h2>
            From chaos to
            <br />
            organized operations.
          </h2>
        </div>

        <div
          className={
            styles.steps
          }
        >
          {steps.map(
            (step, index) => (
              <div
                key={
                  step.number
                }
                className={`${styles.step} ${styles.reveal}`}
              >
                <div
                  className={
                    styles.stepNumber
                  }
                >
                  {
                    step.number
                  }
                </div>

                {index <
                  steps.length -
                    1 && (
                  <div
                    className={
                      styles.stepLine
                    }
                  />
                )}

                <h3>
                  {
                    step.title
                  }
                </h3>

                <p>
                  {step.text}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section
        className={
          styles.statsSection
        }
      >
        <div
          className={`${styles.statFeature} ${styles.reveal}`}
        >
          <span>
            <Users
              size={17}
            />
          </span>

          <strong>
            One workspace
          </strong>

          <p>
            Keep your club's people,
            events and operations
            connected.
          </p>
        </div>

        <div
          className={`${styles.statFeature} ${styles.reveal}`}
        >
          <span>
            <Zap
              size={17}
            />
          </span>

          <strong>
            Less coordination
          </strong>

          <p>
            Reduce the repetitive
            administrative work that
            slows teams down.
          </p>
        </div>

        <div
          className={`${styles.statFeature} ${styles.reveal}`}
        >
          <span>
            <UserCheck
              size={17}
            />
          </span>

          <strong>
            Better visibility
          </strong>

          <p>
            Know what is happening
            across your club at a
            glance.
          </p>
        </div>
      </section>

      {/*
        IMPORTANT:
        There is intentionally NO extra CTA/footer
        section here.

        Footer.jsx already contains the complete CTA
        and footer. This prevents the duplicate-footer
        appearance.
      */}

      <Footer />
    </main>
  );
}