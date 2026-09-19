import "./globals.css";

export const metadata = {
  title: "ClubOps AI",
  description: "AI-Powered College Club Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}