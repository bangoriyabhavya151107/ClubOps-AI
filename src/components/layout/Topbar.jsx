"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/*
|--------------------------------------------------------------------------
| Page Information
|--------------------------------------------------------------------------
|
| This object contains the title and description that appear in the
| dashboard topbar depending on the current URL.
|
*/

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

/*
|--------------------------------------------------------------------------
| Get Current Page
|--------------------------------------------------------------------------
|
| This function checks the current URL and finds the matching page
| information from the pageInfo object.
|
| Example:
|
| /dashboard
| /members
| /members/123
| /events
| /events/123
|
| All of these can be handled correctly.
|
*/

function getCurrentPage(pathname) {
  const entries = Object.entries(pageInfo);

  for (const [path, info] of entries) {
    /*
     * Exact route match
     *
     * Example:
     *
     * pathname = "/members"
     * path     = "/members"
     *
     * Result = true
     */

    if (pathname === path) {
      return info;
    }

    /*
     * Nested route match
     *
     * Example:
     *
     * pathname = "/members/123"
     * path     = "/members"
     *
     * path + "/" = "/members/"
     *
     * "/members/123".startsWith("/members/")
     *
     * Result = true
     */

    if (pathname.startsWith(path + "/")) {
      return info;
    }
  }

  /*
   * If no page matches, use Dashboard as the default.
   */

  return pageInfo["/dashboard"];
}

/*
|--------------------------------------------------------------------------
| Topbar Component
|--------------------------------------------------------------------------
*/

export default function Topbar() {
  /*
   * Get the current URL from Next.js.
   */

  const pathname = usePathname();

  /*
   * Find the page information for the current URL.
   */

  const current = getCurrentPage(pathname);

  return (
    <header className="clubops-topbar">

      {/* ================================================================
          LEFT SIDE
          ================================================================ */}

      <div className="clubops-topbar-left">

        {/* --------------------------------------------------------------
            Mobile Brand
            -------------------------------------------------------------- */}

        <div className="clubops-mobile-brand">

          <div className="clubops-mobile-brand-mark">
            C
          </div>

          <strong>
            ClubOps AI
          </strong>

        </div>

        {/* --------------------------------------------------------------
            Page Heading
            -------------------------------------------------------------- */}

        <div className="clubops-page-heading">

          {/* Small category label */}

          <span>
            {current.label}
          </span>

          {/* Main page title */}

          <h1>
            {current.title}
          </h1>

          {/* Page description */}

          <p>
            {current.description}
          </p>

        </div>

      </div>

      {/* ================================================================
          RIGHT SIDE
          ================================================================ */}

      <div className="clubops-topbar-right">

        {/* --------------------------------------------------------------
            Notification Button
            -------------------------------------------------------------- */}

        <button
          type="button"
          className="clubops-notification"
          aria-label="Notifications"
        >

          <span className="clubops-bell">
            ♢
          </span>

          <span className="clubops-notification-dot" />

        </button>

        {/* --------------------------------------------------------------
            Divider
            -------------------------------------------------------------- */}

        <div className="clubops-profile-divider" />

        {/* --------------------------------------------------------------
            User Profile
            -------------------------------------------------------------- */}

        <Link
          href="/profile"
          className="clubops-user"
        >

          {/* User Avatar */}

          <div className="clubops-user-avatar">
            CA
          </div>

          {/* User Information */}

          <div className="clubops-user-details">

            <strong>
              Club Admin
            </strong>

            <span>
              Administrator
            </span>

          </div>

          {/* Dropdown Arrow */}

          <span className="clubops-user-arrow">
            ⌄
          </span>

        </Link>

      </div>

    </header>
  );
}