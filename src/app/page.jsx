import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        <div className="logo">

          <div className="logo-icon">
            C
          </div>

          <div className="logo-text">
            ClubOps AI
          </div>

        </div>


        <div className="nav-links">

          <Link href="/">
            Home
          </Link>

          <Link href="/#features">
            Features
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link href="/contact">
            Contact
          </Link>

        </div>


        <div className="nav-buttons">

          <Link
            href="/login"
            className="login-button"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="get-started-button"
          >
            Get Started
          </Link>

        </div>

      </nav>


      {/* =========================
          HERO
      ========================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ AI-Powered College Club Management
          </div>

          <h1>
            Run Your College
            <br />

            <span>
              Events Smarter with AI
            </span>
          </h1>

          <p className="hero-description">
            Manage events, tasks, volunteers,
            meetings and club operations from
            one intelligent platform.
          </p>


          <div className="hero-buttons">

            <Link
              href="/register"
              className="primary-button"
            >
              Create Account →
            </Link>

            <Link
              href="/login"
              className="secondary-button"
            >
              Login
            </Link>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES
      ========================= */}

      <section
        className="features-section"
        id="features"
      >

        <div className="section-header">

          <h2>
            Everything Your Club Needs
          </h2>

          <p>
            ClubOps AI brings your college club
            operations into one simple platform.
          </p>

        </div>


        <div className="features-grid">


          {/* Feature 1 */}

          <div className="feature-card">

            <div className="feature-icon">
              📅
            </div>

            <h3>
              Event Management
            </h3>

            <p>
              Manage college events, deadlines
              and activities from one place.
            </p>

          </div>


          {/* Feature 2 */}

          <div className="feature-card">

            <div className="feature-icon">
              🤖
            </div>

            <h3>
              AI Assistant
            </h3>

            <p>
              Use AI to plan events and automate
              operational tasks.
            </p>

          </div>


          {/* Feature 3 */}

          <div className="feature-card">

            <div className="feature-icon">
              👥
            </div>

            <h3>
              Team Management
            </h3>

            <p>
              Manage coordinators, volunteers
              and responsibilities.
            </p>

          </div>


          {/* Feature 4 */}

          <div className="feature-card">

            <div className="feature-icon">
              ✅
            </div>

            <h3>
              Attendance
            </h3>

            <p>
              Track attendance and monitor
              member participation.
            </p>

          </div>


          {/* Feature 5 */}

          <div className="feature-card">

            <div className="feature-icon">
              📋
            </div>

            <h3>
              Task Management
            </h3>

            <p>
              Assign, track and complete club
              tasks efficiently.
            </p>

          </div>


          {/* Feature 6 */}

          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Reports & Analytics
            </h3>

            <p>
              Understand your club performance
              with useful reports.
            </p>

          </div>


        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">

        <h3>
          ClubOps AI
        </h3>

        <p>
          AI-Powered College Club Management
        </p>

        <p>
          © 2026 ClubOps AI. All rights reserved.
        </p>

      </footer>

    </main>
  );
}