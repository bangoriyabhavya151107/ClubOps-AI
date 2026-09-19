"use client";

export default function Topbar() {
  return (
    <header className="topbar">

      <div>
        <h1>Dashboard</h1>
        <p>Welcome back to ClubOps-AI</p>
      </div>

      <div className="topbar-right">

        <button className="notification-button">
          🔔
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">

          <div className="user-avatar">
            U
          </div>

          <div className="user-info">
            <strong>Club Admin</strong>
            <span>Administrator</span>
          </div>

        </div>

      </div>

    </header>
  );
}