import "./globals.css";
import Footer from "@/components/layout/Footer";    
export const metadata = {
  title: "ClubOps AI",
  description: "AI-Powered College Club Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
        <Footer />
    </html>
  );
}