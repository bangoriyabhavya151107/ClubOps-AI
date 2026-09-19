import Link from "next/link";
import "./legal.css";

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-background">
        <div className="legal-glow legal-glow-one" />
        <div className="legal-glow legal-glow-two" />
      </div>

      {/* NAVBAR */}
      <nav className="legal-navbar">
        <Link href="/" className="legal-logo">
          <span className="legal-logo-icon">C</span>
          <span>ClubOps AI</span>
        </Link>

        <Link href="/" className="legal-back">
          ← Back to Home
        </Link>
      </nav>

      {/* CONTENT */}
      <section className="legal-hero">
        <span className="legal-badge">
          PRIVACY
        </span>

        <h1>
          Privacy
          <span>Policy</span>
        </h1>

        <p>
          Your privacy matters to us. This page explains
          how ClubOps AI may collect, use and protect
          information when you use the platform.
        </p>

        <span className="legal-updated">
          Last updated: September 19, 2026
        </span>
      </section>

      <section className="legal-content">

        <article className="legal-section">
          <span className="legal-number">01</span>

          <div>
            <h2>Introduction</h2>

            <p>
              ClubOps AI is a platform designed to help
              college clubs and student organizations
              manage their operations.
            </p>

            <p>
              This Privacy Policy describes the types of
              information that may be collected when you
              use ClubOps AI and how that information may
              be handled.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">02</span>

          <div>
            <h2>Information We May Collect</h2>

            <p>
              Depending on the features you use, ClubOps AI
              may process information such as:
            </p>

            <ul>
              <li>Name and basic profile information</li>
              <li>Email address</li>
              <li>Club membership information</li>
              <li>Event and attendance information</li>
              <li>Information you voluntarily provide</li>
              <li>Technical information required to operate the application</li>
            </ul>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">03</span>

          <div>
            <h2>How Information May Be Used</h2>

            <p>
              Information may be used to provide and
              improve ClubOps AI services, including:
            </p>

            <ul>
              <li>Creating and managing user accounts</li>
              <li>Providing club management functionality</li>
              <li>Managing events and attendance</li>
              <li>Providing account-related communication</li>
              <li>Improving application performance</li>
              <li>Maintaining application security</li>
            </ul>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">04</span>

          <div>
            <h2>Authentication & Security</h2>

            <p>
              ClubOps AI may use third-party infrastructure
              such as Supabase for authentication and
              application data services.
            </p>

            <p>
              Reasonable technical measures are intended
              to help protect information. However, no
              internet-based service can guarantee absolute
              security.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">05</span>

          <div>
            <h2>Third-Party Services</h2>

            <p>
              ClubOps AI may rely on third-party services
              to provide hosting, authentication,
              infrastructure or other functionality.
            </p>

            <p>
              Those services may process information
              according to their own privacy policies and
              terms.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">06</span>

          <div>
            <h2>Data Retention</h2>

            <p>
              Information may be retained for as long as
              reasonably necessary to provide the service,
              maintain accounts, satisfy operational
              requirements or comply with applicable
              obligations.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">07</span>

          <div>
            <h2>Your Choices</h2>

            <p>
              Depending on the functionality available in
              the platform, you may be able to update your
              account information or request assistance
              regarding your information.
            </p>

            <p>
              If you have a privacy-related question,
              please contact the ClubOps AI team.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">08</span>

          <div>
            <h2>Changes to This Policy</h2>

            <p>
              This Privacy Policy may be updated as
              ClubOps AI evolves. Changes will be reflected
              on this page together with an updated date.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">09</span>

          <div>
            <h2>Contact</h2>

            <p>
              If you have questions about this Privacy
              Policy, you can contact us through the
              ClubOps AI contact page.
            </p>

            <Link
              href="/contact"
              className="legal-inline-button"
            >
              Contact ClubOps AI →
            </Link>
          </div>
        </article>

      </section>

      {/* FOOTER */}
      <footer className="legal-footer">
        <span>
          © {new Date().getFullYear()} ClubOps AI
        </span>

        <div>
          <Link href="/privacy" className="active">
            Privacy
          </Link>

          <Link href="/terms">
            Terms
          </Link>

          <Link href="/contact">
            Contact
          </Link>
        </div>

        <Link href="/">
          Back to home ↑
        </Link>
      </footer>
    </main>
  );
}