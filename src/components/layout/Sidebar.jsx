"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mainMenu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    name: "Members",
    href: "/members",
    icon: "♟",
  },
  {
    name: "Events",
    href: "/events",
    icon: "▣",
  },
  {
    name: "Attendance",
    href: "/attendance",
    icon: "✓",
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: "☑",
  },
  {
    name: "Meetings",
    href: "/meetings",
    icon: "◫",
  },
  {
    name: "Documents",
    href: "/documents",
    icon: "▤",
  },
  {
    name: "Announcements",
    href: "/announcements",
    icon: "◈",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "▥",
  },
];

const aiMenu = [
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: "✦",
  },
];

function isActivePath(pathname, href) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="clubops-sidebar">
      {/* Brand */}
      <div className="clubops-brand">
        <div className="clubops-brand-mark">C</div>

        <div>
          <strong>ClubOps AI</strong>
          <span>Club Management</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="clubops-navigation">
        <div className="clubops-nav-section">
          <span className="clubops-nav-label">MAIN MENU</span>

          {mainMenu.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                href={item.href}
                key={item.href}
                className={`clubops-nav-item ${
                  active ? "active" : ""
                }`}
              >
                <span className="clubops-nav-icon">
                  {item.icon}
                </span>

                <span>{item.name}</span>

                {active && (
                  <span className="clubops-active-indicator" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="clubops-nav-section">
          <span className="clubops-nav-label">SMART TOOLS</span>

          {aiMenu.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                href={item.href}
                key={item.href}
                className={`clubops-nav-item clubops-ai-nav ${
                  active ? "active" : ""
                }`}
              >
                <span className="clubops-nav-icon">
                  {item.icon}
                </span>

                <span>{item.name}</span>

                <span className="clubops-ai-badge">AI</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="clubops-sidebar-bottom">
        <Link
          href="/settings"
          className={`clubops-nav-item ${
            isActivePath(pathname, "/settings") ? "active" : ""
          }`}
        >
          <span className="clubops-nav-icon">⚙</span>
          <span>Settings</span>
        </Link>

        <Link
          href="/profile"
          className={`clubops-nav-item ${
            isActivePath(pathname, "/profile") ? "active" : ""
          }`}
        >
          <span className="clubops-nav-icon">◉</span>
          <span>Profile</span>
        </Link>

        <div className="clubops-sidebar-footer">
          <div className="clubops-footer-avatar">C</div>

          <div>
            <strong>Club Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}