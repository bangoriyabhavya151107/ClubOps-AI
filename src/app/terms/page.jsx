import Link from "next/link";
import "./legal.css";

export default function TermsPage() {
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

      {/* HERO */}
      <section className="legal-hero">
        <span className="legal-badge">
          TERMS
        </span>

        <h1>
          Terms of
          <span>Service</span>
        </h1>

        <p>
          These terms describe the general rules for using
          ClubOps AI and the responsibilities associated
          with using the platform.
        </p>

        <span className="legal-updated">
          Last updated: September 19, 2026
        </span>
      </section>

      {/* CONTENT */}
      <section className="legal-content">

        <article className="legal-section">
          <span className="legal-number">01</span>

          <div>
            <h2>Acceptance of Terms</h2>

            <p>
              By accessing or using ClubOps AI, you agree
              to follow these Terms of Service.
            </p>

            <p>
              If you do not agree with these terms, you
              should not use the platform.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">02</span>

          <div>
            <h2>Using ClubOps AI</h2>

            <p>
              ClubOps AI is intended to help student
              organizations manage club-related activities,
              information and workflows.
            </p>

            <p>
              Users are responsible for using the platform
              appropriately and providing accurate
              information where required.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">03</span>

          <div>
            <h2>User Accounts</h2>

            <p>
              Some features may require an account.
              Users are responsible for maintaining the
              confidentiality of their account credentials.
            </p>

            <p>
              You should notify the appropriate support
              contact if you believe your account has been
              accessed without authorization.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">04</span>

          <div>
            <h2>Acceptable Use</h2>

            <p>
              Users agree not to use ClubOps AI for
              activities that are unlawful, abusive,
              fraudulent or intended to interfere with
              the operation of the platform.
            </p>

            <ul>
              <li>Do not attempt to gain unauthorized access.</li>
              <li>Do not intentionally disrupt the service.</li>
              <li>Do not upload malicious software.</li>
              <li>Do not misuse another user's account.</li>
              <li>Do not use the platform for unlawful activities.</li>
            </ul>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">05</span>

          <div>
            <h2>Club Data</h2>

            <p>
              Users and organizations are responsible for
              the information they enter into ClubOps AI.
            </p>

            <p>
              You should ensure that you have the
              appropriate permission to provide information
              about other members, events or organizations.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">06</span>

          <div>
            <h2>Availability</h2>

            <p>
              ClubOps AI is provided as an evolving
              software project. Features may be changed,
              improved, temporarily unavailable or
              discontinued as development continues.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">07</span>

          <div>
            <h2>Third-Party Services</h2>

            <p>
              The application may depend on third-party
              services such as hosting, authentication,
              databases or other infrastructure.
            </p>

            <p>
              Availability and functionality of those
              services may be subject to their own terms
              and policies.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">08</span>

          <div>
            <h2>Intellectual Property</h2>

            <p>
              The ClubOps AI application, branding,
              interface and original content may be
              protected by applicable intellectual
              property laws.
            </p>

            <p>
              Nothing in these terms automatically grants
              users ownership of the platform or its
              underlying intellectual property.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">09</span>

          <div>
            <h2>Disclaimer</h2>

            <p>
              ClubOps AI is provided on an evolving
              development basis. Information and features
              may contain errors or limitations.
            </p>

            <p>
              Users should maintain appropriate backups
              and should not rely on the application as
              the sole system for critical information.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">10</span>

          <div>
            <h2>Changes to These Terms</h2>

            <p>
              These Terms of Service may be updated as
              ClubOps AI develops. Updated terms will be
              published on this page.
            </p>
          </div>
        </article>

        <article className="legal-section">
          <span className="legal-number">11</span>

          <div>
            <h2>Contact</h2>

            <p>
              If you have questions regarding these
              terms, please contact the ClubOps AI team.
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
          <Link href="/privacy">
            Privacy
          </Link>

          <Link href="/terms" className="active">
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