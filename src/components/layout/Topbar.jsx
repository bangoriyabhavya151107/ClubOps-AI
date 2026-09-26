"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardCheck,
  CheckSquare,
  Video,
  FileText,
  Megaphone,
  BarChart3,
  Coins,
  ShieldAlert,
  Sparkles,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Crown,
  Zap,
  HeartHandshake,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import {
  getWorkspace,
  normalizeRole,
  initials,
} from "@/lib/clubops";


/* =========================================================
   NAVIGATION ITEMS
   ========================================================= */

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },

  {
    name: "Events",
    href: "/events",
    icon: CalendarDays,
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },

  {
    name: "Members",
    href: "/members",
    icon: Users,
    roles: [
      "ADMIN",
      "COORDINATOR",
    ],
  },

  {
    name: "Attendance",
    href: "/attendance",
    icon: ClipboardCheck,
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },

  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },

  {
    name: "Meetings",
    href: "/meetings",
    icon: Video,
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },

  {
    name: "Docs",
    href: "/documents",
    icon: FileText,
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },

  {
    name: "Announcements",
    href: "/announcements",
    icon: Megaphone,
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
  },

  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
    roles: [
      "ADMIN",
      "COORDINATOR",
    ],
  },

  {
    name: "Budget",
    href: "/budget",
    icon: Coins,
    roles: [
      "ADMIN",
    ],
  },

  {
    name: "Risks",
    href: "/risks",
    icon: ShieldAlert,
    roles: [
      "ADMIN",
      "COORDINATOR",
    ],
  },

  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: Sparkles,
    roles: [
      "ADMIN",
      "COORDINATOR",
      "VOLUNTEER",
    ],
    isAi: true,
  },
];


/* =========================================================
   TOPBAR COMPONENT
   ========================================================= */

export default function Topbar() {
  const pathname = usePathname();

  const router = useRouter();

  const supabase = createClient();

  const dropdownRef = useRef(null);


  /* =======================================================
     STATE
     ======================================================= */

  const [workspace, setWorkspace] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [userDropdown, setUserDropdown] =
    useState(false);


  /* =======================================================
     LOAD WORKSPACE
     ======================================================= */

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
          "Topbar workspace load error:",
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


  /* =======================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
     ======================================================= */

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setUserDropdown(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);


  /* =======================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
     ======================================================= */

  useEffect(() => {
    setMenuOpen(false);

    setUserDropdown(false);
  }, [pathname]);


  /* =======================================================
     CURRENT USER ROLE
     ======================================================= */

  const currentRole =
    normalizeRole(
      workspace?.role ||
        workspace?.profile?.role ||
        "VOLUNTEER"
    );


  /* =======================================================
     LOGOUT
     ======================================================= */

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


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  function isActive(href) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  }


  /* =======================================================
     VISIBLE NAVIGATION
     ======================================================= */

  const visibleNav =
    NAV_ITEMS.filter((item) =>
      item.roles.includes(
        currentRole
      )
    );


  /* =======================================================
     USER INFORMATION
     ======================================================= */

  const userName =
    workspace?.profile?.full_name ||
    "Club Member";

  const userInitials =
    initials(userName);


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <header
      className="apple-navbar-container"
      ref={dropdownRef}
    >

      {/* ===================================================
          MAIN NAVBAR
          =================================================== */}

      <div className="apple-navbar">


        {/* =================================================
            CLUBOPS BRAND
            ================================================= */}

        <Link
          href="/dashboard"
          className="apple-brand"
          aria-label="ClubOps AI Dashboard"
        >

          {/* -----------------------------------------------
              ANIMATED NAVBAR LOGO TARGET

              ClubOpsMotion.jsx detects this element
              automatically and moves the startup logo
              into this exact position.
              ----------------------------------------------- */}

          <div
            className="apple-logo-badge co-logo-target"
            aria-hidden="true"
          >
            C
          </div>


          {/* -----------------------------------------------
              BRAND TEXT
              ----------------------------------------------- */}

          <div className="apple-brand-name">

            <strong>
              ClubOps AI
            </strong>

            <span className="apple-live-tag">
              WORKSPACE
            </span>

          </div>

        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
            ================================================= */}

        <nav
          className="apple-nav-links"
          aria-label="Main navigation"
        >

          {visibleNav.map(
            (item) => {
              const active =
                isActive(
                  item.href
                );

              const Icon =
                item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "apple-nav-item",
                    active
                      ? "active"
                      : "",
                    item.isAi
                      ? "apple-ai-item"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >

                  {/* ICON */}

                  <Icon
                    size={15}
                    strokeWidth={
                      active
                        ? 2.4
                        : 1.9
                    }
                  />


                  {/* NAME */}

                  <span>
                    {item.name}
                  </span>


                  {/* AI LABEL */}

                  {item.isAi && (
                    <span className="apple-ai-spark">
                      AI
                    </span>
                  )}


                  {/* ACTIVE INDICATOR */}

                  {active && (
                    <span
                      className="apple-nav-indicator"
                      aria-hidden="true"
                    />
                  )}

                </Link>
              );
            }
          )}

        </nav>


        {/* =================================================
            RIGHT SIDE
            ================================================= */}

        <div className="apple-nav-right">


          {/* =================================================
              ROLE BADGE
              ================================================= */}

          <div
            className={[
              "apple-role-pill",
              `role-${currentRole.toLowerCase()}`,
            ].join(" ")}
          >

            {currentRole ===
              "ADMIN" && (
              <Crown size={13} />
            )}

            {currentRole ===
              "COORDINATOR" && (
              <Zap size={13} />
            )}

            {currentRole ===
              "VOLUNTEER" && (
              <HeartHandshake
                size={13}
              />
            )}

            <span>
              {currentRole}
            </span>

          </div>


          {/* =================================================
              USER PROFILE
              ================================================= */}

          <div className="apple-user-wrap">

            <button
              type="button"
              className="apple-avatar-btn"
              onClick={() =>
                setUserDropdown(
                  (current) =>
                    !current
                )
              }
              aria-expanded={
                userDropdown
              }
              aria-haspopup="menu"
            >

              {/* AVATAR */}

              <div
                className="apple-avatar-circle"
                aria-hidden="true"
              >
                {loading
                  ? "…"
                  : userInitials}
              </div>


              {/* USER NAME */}

              <span className="apple-avatar-name">
                {userName}
              </span>


              {/* ARROW */}

              <ChevronDown
                size={12}
                className={
                  userDropdown
                    ? "apple-chevron-open"
                    : ""
                }
              />

            </button>


            {/* =================================================
                USER DROPDOWN
                ================================================= */}

            {userDropdown && (
              <div
                className="apple-dropdown apple-user-dropdown"
                role="menu"
              >

                {/* USER HEADER */}

                <div className="apple-dropdown-user-header">

                  <strong>
                    {userName}
                  </strong>

                  <small>
                    {
                      workspace?.user
                        ?.email ||
                      "Signed in"
                    }
                  </small>

                </div>


                {/* DIVIDER */}

                <div className="apple-dropdown-divider" />


                {/* PROFILE */}

                <Link
                  href="/profile"
                  className="apple-dropdown-link"
                  onClick={() =>
                    setUserDropdown(
                      false
                    )
                  }
                  role="menuitem"
                >

                  <User
                    size={14}
                  />

                  <span>
                    My Profile
                  </span>

                </Link>


                {/* SETTINGS */}

                <Link
                  href="/settings"
                  className="apple-dropdown-link"
                  onClick={() =>
                    setUserDropdown(
                      false
                    )
                  }
                  role="menuitem"
                >

                  <Settings
                    size={14}
                  />

                  <span>
                    Settings
                  </span>

                </Link>


                {/* DIVIDER */}

                <div className="apple-dropdown-divider" />


                {/* LOGOUT */}

                <button
                  type="button"
                  className="apple-dropdown-link apple-dropdown-logout"
                  onClick={
                    handleLogout
                  }
                  role="menuitem"
                >

                  <LogOut
                    size={14}
                  />

                  <span>
                    Sign Out
                  </span>

                </button>

              </div>
            )}

          </div>


          {/* =================================================
              MOBILE MENU BUTTON
              ================================================= */}

          <button
            type="button"
            className="apple-mobile-toggle"
            onClick={() =>
              setMenuOpen(
                (current) =>
                  !current
              )
            }
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={
              menuOpen
            }
          >

            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}

          </button>

        </div>

      </div>


      {/* =====================================================
          MOBILE DRAWER
          ===================================================== */}

      {menuOpen && (
        <div
          className="apple-mobile-menu"
          aria-label="Mobile navigation"
        >

          <div className="apple-mobile-nav-list">

            {/* ===============================================
                MOBILE MAIN NAV
                =============================================== */}

            {visibleNav.map(
              (item) => {
                const active =
                  isActive(
                    item.href
                  );

                const Icon =
                  item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "apple-mobile-nav-link",
                      active
                        ? "active"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() =>
                      setMenuOpen(
                        false
                      )
                    }
                  >

                    <Icon
                      size={17}
                    />

                    <span>
                      {item.name}
                    </span>

                    {item.isAi && (
                      <span className="apple-ai-spark">
                        AI
                      </span>
                    )}

                  </Link>
                );
              }
            )}


            {/* ===============================================
                DIVIDER
                =============================================== */}

            <div className="apple-dropdown-divider" />


            {/* ===============================================
                PROFILE
                =============================================== */}

            <Link
              href="/profile"
              className="apple-mobile-nav-link"
              onClick={() =>
                setMenuOpen(
                  false
                )
              }
            >

              <User size={17} />

              <span>
                My Profile
              </span>

            </Link>


            {/* ===============================================
                SETTINGS
                =============================================== */}

            <Link
              href="/settings"
              className="apple-mobile-nav-link"
              onClick={() =>
                setMenuOpen(
                  false
                )
              }
            >

              <Settings
                size={17}
              />

              <span>
                Settings
              </span>

            </Link>


            {/* ===============================================
                LOGOUT
                =============================================== */}

            <button
              type="button"
              className="apple-mobile-nav-link apple-dropdown-logout"
              onClick={
                handleLogout
              }
            >

              <LogOut
                size={17}
              />

              <span>
                Sign Out
              </span>

            </button>

          </div>

        </div>
      )}

    </header>
  );
}