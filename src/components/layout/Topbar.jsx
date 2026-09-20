```jsx
"use client";

import { usePathname } from "next/navigation";

const pageInfo = {
  "/dashboard": {
    label: "CLUB MANAGEMENT",
    title: "Dashboard",
    description: "Overview of your club operations",
  },
  "/members": {
    label: "CLUB MANAGEMENT",
    title: "Members",
    description: "Manage your club members",
  },
  "/events": {
    label: "CLUB MANAGEMENT",
    title: "Events",
    description: "Create and manage club events",
  },
  "/attendance": {
    label: "CLUB MANAGEMENT",
    title: "Attendance",
    description: "Track member participation",
  },
  "/tasks": {
    label: "WORKSPACE",
    title: "Tasks",
    description: "Manage your club tasks",
  },
  "/meetings": {
    label: "WORKSPACE",
    title: "Meetings",
    description: "Manage club meetings",
  },
  "/documents": {
    label: "WORKSPACE",
    title: "Documents",
    description: "Manage club documents",
  },
  "/announcements": {
    label: "COMMUNICATION",
    title: "Announcements",
    description: "Manage club announcements",
  },
  "/reports": {
    label: "ANALYTICS",
    title: "Reports",
    description: "View club reports and analytics",
  },
  "/ai-assistant": {
    label: "SMART TOOLS",
    title: "AI Assistant",
    description: "Get help with club operations",
  },
  "/profile": {
    label: "ACCOUNT",
    title: "My Profile",
    description: "Manage your personal information",
  },
  "/settings": {
    label: "ACCOUNT",
    title: "Settings",
    description: "Manage your account preferences",
  },
};

export default function Topbar() {
  const pathname = usePathname();

  const current =
    Object.entries(pageInfo).find(([path]) =>
      pathname === path || pathname.startsWith(`${path}/`)
    )?.[1] || pageInfo["/dashboard"];

  return (
    <header className="clubops-topbar">
      <div className="clubops-topbar-left">
        <div className="clubops-mobile-brand">
          <div className="clubops-mobile-brand-mark">C</div>
          <strong>ClubOps AI</strong>
        </div>

        <div className="clubops-page-heading">
          <span>{current.label}</span>
          <h1>{current.title}</h1>
          <p>{current.description}</p>
        </div>
      </div>

      <div className="clubops-topbar-right">
        <button
          type="button"
          className="clubops-notification"
          aria-label="Notifications"
        >
          <span className="clubops-bell">♢</span>
          <span className="clubops-notification-dot" />
        </button>

        <div className="clubops-profile-divider" />

        <a href="/profile" className="clubops-user">
          <div className="clubops-user-avatar">CA</div>

          <div className="clubops-user-details">
            <strong>Club Admin</strong>
            <span>Administrator</span>
          </div>

          <span className="clubops-user-arrow">⌄</span>
        </a>
      </div>
    </header>
  );
}
```
