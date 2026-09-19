"use client";

import { useRouter } from "next/navigation";

export default function Header({ user, role }) {
  const router = useRouter();

  const name =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <header className="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p>Manage your college club from one place.</p>
      </div>

      <div className="header-right">
        <button
          className="notification-button"
          onClick={() => router.push("/dashboard/announcements")}
        >
          🔔
        </button>

        <div className="user-profile">
          <div className="avatar">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{name}</strong>
            <small>
              {role
                ? role.charAt(0).toUpperCase() + role.slice(1)
                : "Member"}
            </small>
          </div>
        </div>
      </div>
    </header>
  );
}