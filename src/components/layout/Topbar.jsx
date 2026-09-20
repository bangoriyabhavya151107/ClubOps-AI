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
import { getWorkspace, normalizeRole, initials } from "@/lib/clubops";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["ADMIN", "COORDINATOR", "VOLUNTEER"] },
  { name: "Events", href: "/events", icon: CalendarDays, roles: ["ADMIN", "COORDINATOR", "VOLUNTEER"] },
  { name: "Members", href: "/members", icon: Users, roles: ["ADMIN", "COORDINATOR"] },
  { name: "Attendance", href: "/attendance", icon: ClipboardCheck, roles: ["ADMIN", "COORDINATOR", "VOLUNTEER"] },
  { name: "Tasks", href: "/tasks", icon: CheckSquare, roles: ["ADMIN", "COORDINATOR", "VOLUNTEER"] },
  { name: "Meetings", href: "/meetings", icon: Video, roles: ["ADMIN", "COORDINATOR", "VOLUNTEER"] },
  { name: "Docs", href: "/documents", icon: FileText, roles: ["ADMIN", "COORDINATOR", "VOLUNTEER"] },
  { name: "Announcements", href: "/announcements", icon: Megaphone, roles: ["ADMIN", "COORDINATOR", "VOLUNTEER"] },
  { name: "Reports", href: "/reports", icon: BarChart3, roles: ["ADMIN", "COORDINATOR"] },
  { name: "Budget", href: "/budget", icon: Coins, roles: ["ADMIN"] },
  { name: "Risks", href: "/risks", icon: ShieldAlert, roles: ["ADMIN", "COORDINATOR"] },
  { name: "AI Assistant", href: "/ai-assistant", icon: Sparkles, roles: ["ADMIN", "COORDINATOR", "VOLUNTEER"], isAi: true },
];

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getWorkspace();
        if (mounted) setWorkspace(data);
      } catch (err) {
        console.error("Topbar workspace load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentRole = normalizeRole(
    workspace?.role || workspace?.profile?.role || "VOLUNTEER"
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function isActive(href) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const visibleNav = NAV_ITEMS.filter((item) => item.roles.includes(currentRole));
  const userName = workspace?.profile?.full_name || "Club Member";
  const userInitials = initials(userName);

  return (
    <header className="apple-navbar-container" ref={dropdownRef}>
      <div className="apple-navbar">
        {/* Brand */}
        <Link href="/dashboard" className="apple-brand">
          <div className="apple-logo-badge">C</div>
          <div className="apple-brand-name">
            <strong>ClubOps AI</strong>
            <span className="apple-live-tag">WORKSPACE</span>
          </div>
        </Link>

        {/* Desktop Apple-Style Pill Nav */}
        <nav className="apple-nav-links">
          {visibleNav.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`apple-nav-item ${active ? "active" : ""} ${item.isAi ? "apple-ai-item" : ""}`}
              >
                <Icon size={15} strokeWidth={active ? 2.4 : 1.9} />
                <span>{item.name}</span>
                {item.isAi && <span className="apple-ai-spark">AI</span>}
                {active && <span className="apple-nav-indicator" />}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="apple-nav-right">
          {/* Read-Only Verified Role Badge (No Self-Promotion) */}
          <div className={`apple-role-pill role-${currentRole.toLowerCase()}`}>
            {currentRole === "ADMIN" && <Crown size={13} />}
            {currentRole === "COORDINATOR" && <Zap size={13} />}
            {currentRole === "VOLUNTEER" && <HeartHandshake size={13} />}
            <span>{currentRole}</span>
          </div>

          {/* User Profile Avatar Dropdown */}
          <div className="apple-user-wrap">
            <button
              type="button"
              className="apple-avatar-btn"
              onClick={() => setUserDropdown(!userDropdown)}
            >
              <div className="apple-avatar-circle">
                {loading ? "…" : userInitials}
              </div>
              <span className="apple-avatar-name">{userName}</span>
              <ChevronDown size={12} />
            </button>

            {userDropdown && (
              <div className="apple-dropdown apple-user-dropdown">
                <div className="apple-dropdown-user-header">
                  <strong>{userName}</strong>
                  <small>{workspace?.user?.email || "Signed in"}</small>
                </div>
                <div className="apple-dropdown-divider" />
                <Link
                  href="/profile"
                  className="apple-dropdown-link"
                  onClick={() => setUserDropdown(false)}
                >
                  <User size={14} />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className="apple-dropdown-link"
                  onClick={() => setUserDropdown(false)}
                >
                  <Settings size={14} />
                  <span>Settings</span>
                </Link>
                <div className="apple-dropdown-divider" />
                <button
                  type="button"
                  className="apple-dropdown-link apple-dropdown-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="apple-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="apple-mobile-menu">
          <div className="apple-mobile-nav-list">
            {visibleNav.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`apple-mobile-nav-link ${active ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={17} />
                  <span>{item.name}</span>
                  {item.isAi && <span className="apple-ai-spark">AI</span>}
                </Link>
              );
            })}
            <div className="apple-dropdown-divider" />
            <Link
              href="/profile"
              className="apple-mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <User size={17} />
              <span>My Profile</span>
            </Link>
            <Link
              href="/settings"
              className="apple-mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <Settings size={17} />
              <span>Settings</span>
            </Link>
            <button
              type="button"
              className="apple-mobile-nav-link apple-dropdown-logout"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}