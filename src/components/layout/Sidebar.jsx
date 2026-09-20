"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import {
  getWorkspace,
  normalizeRole,
} from "@/lib/clubops";

const mainMenu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "⌂",
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },
  {
    name: "Members",
    href: "/members",
    icon: "♟",
    roles: [
      "ADMIN",
      "COORDINATOR",
    ],
  },
  {
    name: "Events",
    href: "/events",
    icon: "▣",
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },
  {
    name: "Attendance",
    href: "/attendance",
    icon: "✓",
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: "☑",
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },
  {
    name: "Meetings",
    href: "/meetings",
    icon: "◫",
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },
  {
    name: "Documents",
    href: "/documents",
    icon: "▤",
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },
  {
    name: "Announcements",
    href: "/announcements",
    icon: "◈",
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "▥",
    roles: [
      "ADMIN",
      "COORDINATOR",
    ],
  },
];

const aiMenu = [
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: "✦",
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },
];

function isActivePath(pathname, href) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

function getRoleLabel(role) {
  switch (normalizeRole(role)) {
    case "ADMIN":
      return "Administrator";

    case "COORDINATOR":
      return "Coordinator";

    case "VOLUNTEER":
      return "Volunteer";

    default:
      return "Club Member";
  }
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [workspace, setWorkspace] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    async function loadWorkspace() {
      try {
        const data =
          await getWorkspace();

        if (mounted) {
          setWorkspace(data);
        }
      } catch (error) {
        console.error(
          "Sidebar workspace error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadWorkspace();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleLogout() {
    try {
      await supabase.auth.signOut();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }
  }

  const role = normalizeRole(
    workspace?.role ||
      workspace?.profile?.role ||
      "VOLUNTEER"
  );

  const visibleMainMenu =
    mainMenu.filter((item) =>
      item.roles.includes(role)
    );

  const visibleAiMenu =
    aiMenu.filter((item) =>
      item.roles.includes(role)
    );

  const displayName =
    workspace?.profile?.full_name ||
    "Club Member";

  const roleLabel =
    getRoleLabel(role);

  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0).toUpperCase()
      )
      .join("") || "U";

  return (
    <aside className="clubops-sidebar">
      <div className="clubops-brand">
        <div className="clubops-brand-mark">
          C
        </div>

        <div className="clubops-brand-text">
          <strong>ClubOps AI</strong>

          <span>
            Club Management
          </span>
        </div>
      </div>

      <nav className="clubops-navigation">
        <div className="clubops-nav-section">
          <span className="clubops-nav-label">
            MAIN MENU
          </span>

          {visibleMainMenu.map(
            (item) => {
              const active =
                isActivePath(
                  pathname,
                  item.href
                );

              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`clubops-nav-item ${
                    active
                      ? "active"
                      : ""
                  }`}
                >
                  <span className="clubops-nav-icon">
                    {item.icon}
                  </span>

                  <span>
                    {item.name}
                  </span>

                  {active && (
                    <span className="clubops-active-indicator" />
                  )}
                </Link>
              );
            }
          )}
        </div>

        {visibleAiMenu.length > 0 && (
          <div className="clubops-nav-section">
            <span className="clubops-nav-label">
              SMART TOOLS
            </span>

            {visibleAiMenu.map(
              (item) => {
                const active =
                  isActivePath(
                    pathname,
                    item.href
                  );

                return (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={`clubops-nav-item clubops-ai-nav ${
                      active
                        ? "active"
                        : ""
                    }`}
                  >
                    <span className="clubops-nav-icon">
                      {item.icon}
                    </span>

                    <span>
                      {item.name}
                    </span>

                    <span className="clubops-ai-badge">
                      AI
                    </span>
                  </Link>
                );
              }
            )}
          </div>
        )}
      </nav>

      <div className="clubops-sidebar-account">
        <span className="clubops-nav-label">
          ACCOUNT
        </span>

        <Link
          href="/profile"
          className={`clubops-nav-item ${
            isActivePath(
              pathname,
              "/profile"
            )
              ? "active"
              : ""
          }`}
        >
          <span className="clubops-nav-icon">
            ◉
          </span>

          <span>
            My Profile
          </span>
        </Link>

        <Link
          href="/settings"
          className={`clubops-nav-item ${
            isActivePath(
              pathname,
              "/settings"
            )
              ? "active"
              : ""
          }`}
        >
          <span className="clubops-nav-icon">
            ⚙
          </span>

          <span>
            Settings
          </span>
        </Link>

        <button
          type="button"
          className="clubops-logout-button"
          onClick={handleLogout}
        >
          <span className="clubops-nav-icon">
            ↪
          </span>

          <span>
            Logout
          </span>
        </button>
      </div>

      <div className="clubops-sidebar-footer">
        <div className="clubops-footer-avatar">
          {loading ? "…" : initials}
        </div>

        <div className="clubops-footer-user">
          <strong>
            {loading
              ? "Loading..."
              : displayName}
          </strong>

          <span>
            {loading
              ? "Loading role..."
              : roleLabel}
          </span>
        </div>
      </div>
    </aside>
  );
}