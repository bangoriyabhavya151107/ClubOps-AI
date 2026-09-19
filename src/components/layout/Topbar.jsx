"use client";

export default function Topbar() {
  return (
    <header className="clubops-topbar">
      <div className="clubops-topbar-left">
        <div className="clubops-mobile-brand">
          <div className="clubops-mobile-brand-mark">C</div>

          <strong>ClubOps AI</strong>
        </div>

        <div className="clubops-page-heading">
          <span>CLUB MANAGEMENT</span>
          <h1>Dashboard</h1>
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

        <div className="clubops-user">
          <div className="clubops-user-avatar">CA</div>

          <div className="clubops-user-details">
            <strong>Club Admin</strong>
            <span>Administrator</span>
          </div>

          <span className="clubops-user-arrow">⌄</span>
        </div>
      </div>
    </header>
  );
}