import Link from "next/link";
import styles from "../legal.module.css";

export default function TermsPage() {
  return (
    <main className={styles.legalPage}>
      <div className={styles.legalBackground}>
        <div
          className={`${styles.legalGlow} ${styles.legalGlowOne}`}
        />

        <div
          className={`${styles.legalGlow} ${styles.legalGlowTwo}`}
        />
      </div>

      {/* NAVBAR */}
      <nav className={styles.legalNavbar}>
        <Link href="/" className={styles.legalLogo}>
          <span className={styles.legalLogoIcon}>C</span>
          <span>ClubOps AI</span>
        </Link>

        <Link href="/" className={styles.legalBack}>
          ← Back to Home
        </Link>
      </nav>

      {/* HERO */}
      <section className={styles.legalHero}>
        <span className={styles.legalBadge}>
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

        <span className={styles.legalUpdated}>
          Last updated: September 19, 2026
        </span>
      </section>

      {/* CONTENT */}
      <section className={styles.legalContent}>
        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>01</span>

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

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>02</span>

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

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>03</span>

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

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>04</span>

          <div>
            <h2>Acceptable Use</h2>

            <p>
              Users agree not to use ClubOps AI for
              activities that are unlawful, abusive,
              fraudulent or intended to interfere with
              the operation of the platform.
            </p>

            <ul>
              <li>
                Do not attempt to gain unauthorized access.
              </li>

              <li>
                Do not intentionally disrupt the service.
              </li>

              <li>
                Do not upload malicious software.
              </li>

              <li>
                Do not misuse another user's account.
              </li>

              <li>
                Do not use the platform for unlawful
                activities.
              </li>
            </ul>
          </div>
        </article>

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>05</span>

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

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>06</span>

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

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>07</span>

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

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>08</span>

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

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>09</span>

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

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>10</span>

          <div>
            <h2>Changes to These Terms</h2>

            <p>
              These Terms of Service may be updated as
              ClubOps AI develops. Updated terms will be
              published on this page.
            </p>
          </div>
        </article>

        <article className={styles.legalSection}>
          <span className={styles.legalNumber}>11</span>

          <div>
            <h2>Contact</h2>

            <p>
              If you have questions regarding these
              terms, please contact the ClubOps AI team.
            </p>

            <Link
              href="/contact"
              className={styles.legalInlineButton}
            >
              Contact ClubOps AI →
            </Link>
          </div>
        </article>
      </section>

      {/* FOOTER */}
      <footer className={styles.legalFooter}>
        <span>
          © {new Date().getFullYear()} ClubOps AI
        </span>

        <div>
          <Link href="/privacy">
            Privacy
          </Link>

          <Link
            href="/terms"
            className={styles.active}
          >
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