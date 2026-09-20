import "./globals.css";
import "./motion.css";

import Footer from "@/components/layout/Footer";
import ClubOpsMotion from "@/components/animation/ClubOpsMotion";

export const metadata = {
  title: "ClubOps AI",
  description: "AI-powered college club management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClubOpsMotion>
          {children}
        </ClubOpsMotion>

        <Footer />
      </body>
    </html>
  );
}