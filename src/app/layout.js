import "./globals.css";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "ClubOps AI",
  description: "AI-powered college club management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}