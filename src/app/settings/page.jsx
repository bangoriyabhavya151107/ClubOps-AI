"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function SettingsPage() {
const [settings, setSettings] = useState({
emailNotifications: true,
eventReminders: true,
taskReminders: true,
weeklySummary: false,
});

const [saved, setSaved] = useState(false);

function toggleSetting(name) {
setSettings((current) => ({
...current,
[name]: !current[name],
}));

```
setSaved(false);
```

}

function handleSave() {
setSaved(true);
}

return ( <div className="clubops-dashboard"> <Sidebar />

```
  <main className="clubops-main">
    <Topbar />

    <section className="clubops-content">
      <div className="clubops-page-intro">
        <div>
          <span className="clubops-eyebrow">ACCOUNT</span>

          <h2>Settings</h2>

          <p>
            Manage your ClubOps preferences and notifications.
          </p>
        </div>
      </div>

      <div className="settings-layout">
        {/* General */}
        <section className="clubops-card">
          <div className="clubops-card-heading">
            <div>
              <span className="clubops-section-label">
                GENERAL
              </span>

              <h2>Workspace Settings</h2>

              <p>
                Configure the basic behavior of your club
                workspace.
              </p>
            </div>
          </div>

          <div className="settings-list">
            <div className="settings-row">
              <div>
                <strong>Club workspace</strong>
                <span>
                  ClubOps AI Club
                </span>
              </div>

              <span className="settings-value">
                Active
              </span>
            </div>

            <div className="settings-row">
              <div>
                <strong>Account role</strong>
                <span>
                  Administrator
                </span>
              </div>

              <span className="settings-value">
                Admin
              </span>
            </div>

            <div className="settings-row">
              <div>
                <strong>Timezone</strong>
                <span>
                  India Standard Time
                </span>
              </div>

              <span className="settings-value">
                IST
              </span>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="clubops-card">
          <div className="clubops-card-heading">
            <div>
              <span className="clubops-section-label">
                NOTIFICATIONS
              </span>

              <h2>Notification Preferences</h2>

              <p>
                Choose what notifications you want to receive.
              </p>
            </div>
          </div>

          <div className="settings-list">
            <SettingToggle
              title="Email notifications"
              description="Receive important account notifications by email."
              checked={settings.emailNotifications}
              onChange={() =>
                toggleSetting("emailNotifications")
              }
            />

            <SettingToggle
              title="Event reminders"
              description="Get reminders before upcoming club events."
              checked={settings.eventReminders}
              onChange={() =>
                toggleSetting("eventReminders")
              }
            />

            <SettingToggle
              title="Task reminders"
              description="Receive reminders for pending tasks."
              checked={settings.taskReminders}
              onChange={() =>
                toggleSetting("taskReminders")
              }
            />

            <SettingToggle
              title="Weekly summary"
              description="Receive a weekly overview of club activity."
              checked={settings.weeklySummary}
              onChange={() =>
                toggleSetting("weeklySummary")
              }
            />
          </div>

          <div className="settings-footer">
            {saved && (
              <span className="clubops-save-message">
                ✓ Settings saved
              </span>
            )}

            <button
              type="button"
              className="clubops-primary-button"
              onClick={handleSave}
            >
              Save Preferences
            </button>
          </div>
        </section>

        {/* Security */}
        <section className="clubops-card">
          <div className="clubops-card-heading">
            <div>
              <span className="clubops-section-label">
                SECURITY
              </span>

              <h2>Account Security</h2>

              <p>
                Manage your account security settings.
              </p>
            </div>
          </div>

          <div className="security-item">
            <div className="security-icon">
              🔐
            </div>

            <div>
              <strong>Password</strong>

              <p>
                Your password is securely managed through
                Supabase authentication.
              </p>
            </div>

            <button
              type="button"
              className="clubops-secondary-button"
            >
              Change
            </button>
          </div>
        </section>

        {/* Danger zone */}
        <section className="clubops-card danger-zone">
          <div className="clubops-card-heading">
            <div>
              <span className="clubops-section-label danger-label">
                DANGER ZONE
              </span>

              <h2>Account Actions</h2>

              <p>
                Actions in this section can affect your account.
              </p>
            </div>
          </div>

          <div className="danger-action">
            <div>
              <strong>Sign out</strong>

              <span>
                Sign out of your ClubOps AI account.
              </span>
            </div>

            <a
              href="/login"
              className="danger-button"
            >
              Logout
            </a>
          </div>
        </section>
      </div>
    </section>
  </main>
</div>
```

);
}

function SettingToggle({
title,
description,
checked,
onChange,
}) {
return ( <div className="settings-row settings-toggle-row"> <div> <strong>{title}</strong> <span>{description}</span> </div>

```
  <button
    type="button"
    className={`settings-toggle ${
      checked ? "checked" : ""
    }`}
    onClick={onChange}
    aria-pressed={checked}
    aria-label={title}
  >
    <span />
  </button>
</div>
```

);
}


