
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">

                {/* Brand */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="footer-logo-icon">C</div>
                        <span>ClubOps AI</span>
                    </div>

                    <p>
                        AI-powered college club management made simple.
                        Organize events, manage teams, and bring your
                        club community together in one place.
                    </p>

                    <div className="footer-status">
                        <span className="status-dot"></span>
                        All systems operational
                    </div>
                </div>


                {/* Product */}
                <div className="footer-column">
                    <h4>Product</h4>

                    <Link href="/#features">Features</Link>
                    <Link href="/register">Get Started</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/#about">About</Link>
                </div>


                {/* Community */}
                <div className="footer-column">
                    <h4>Community</h4>

                    <Link href="#">Community</Link>
                    <Link href="#">Events</Link>
                    <Link href="#">Volunteer</Link>
                    <Link href="#">Student Clubs</Link>
                </div>


                {/* Support */}
                <div className="footer-column">
                    <h4>Support</h4>

                    <Link href="/#contact">Contact Us</Link>
                    <Link href="#">Help Center</Link>
                    <Link href="#">System Status</Link>
                    <Link href="#">Feedback</Link>
                </div>


                {/* Contact */}
                <div className="footer-column footer-contact">
                    <h4>Contact</h4>

                    <a href="mailto:hello@clubops.ai">
                        hello@clubops.ai
                    </a>

                    <a href="mailto:support@clubops.ai">
                        support@clubops.ai
                    </a>

                    <p>
                        Made for college clubs
                        <br />
                        and student communities.
                    </p>
                </div>

            </div>


            {/* Bottom Footer */}
            <div className="footer-bottom">

                <div className="footer-copyright">
                    © 2026 ClubOps AI. All rights reserved.
                </div>

                <div className="footer-legal">
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms of Service</Link>
                    <Link href="#">Cookie Policy</Link>
                </div>

            </div>
        </footer>
    );
}

