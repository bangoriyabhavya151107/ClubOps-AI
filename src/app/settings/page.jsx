"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import styles from "@/components/clubops/ManagementPage.module.css";

const settingItems = [
  {
    key: "email",
    title: "Email notifications",
    description: "Receive account and club notifications by email.",
  },
  {
    key: "events",
    title: "Event reminders",
    description: "Receive reminders for upcoming events.",
  },
  {
    key: "tasks",
    title: "Task reminders",
    description: "Receive reminders for pending tasks.",
  },
  {
    key: "announcements",
    title: "Announcement alerts",
    description: "Receive alerts when new announcements are published.",
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    email: false,
    events: false,
    tasks: false,
    announcements: false,
  });

  const [saved, setSaved] = useState(false);

  function toggle(key) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
    setSaved(false);
  }

  function save() {
    setSaved(true);
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">
          <div className="clubops-page-intro">
            <div>
              <span className="clubops-eyebrow">ACCOUNT</span>
              <h2>Settings</h2>
              <p>Manage your ClubOps preferences.</p>
            </div>
          </div>

          <div className={styles.settingsStack}>
            <section className={styles.settingsCard}>
              <div className="clubops-card-heading">
                <div>
                  <span className="clubops-section-label">
                    NOTIFICATIONS
                  </span>

                  <h2>Notification Preferences</h2>

                  <p>
                    All preferences start disabled.
                  </p>
                </div>
              </div>

              <div className={styles.settingsRows}>
                {settingItems.map((item) => (
                  <div className={styles.settingRow} key={item.key}>
                    <div className={styles.settingText}>
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </div>

                    <button
                      type="button"
                      className={
                        styles.toggle +
                        (settings[item.key]
                          ? " " + styles.toggleOn
                          : "")
                      }
                      onClick={() => toggle(item.key)}
                      aria-pressed={settings[item.key]}
                      aria-label={item.title}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.settingsFooter}>
                {saved && (
                  <span className={styles.success}>
                    Settings saved for this session.
                  </span>
                )}

                <button
                  type="button"
                  className="clubops-primary-button"
                  onClick={save}
                >
                  Save Settings
                </button>
              </div>
            </section>

            <section className={styles.settingsCard}>
              <div className="clubops-card-heading">
                <div>
                  <span className="clubops-section-label">
                    WORKSPACE
                  </span>

                  <h2>Workspace Information</h2>

                  <p>
                    These values intentionally start empty.
                  </p>
                </div>
              </div>

              <div className={styles.settingsRows}>
                <div className={styles.settingRow}>
                  <div className={styles.settingText}>
                    <strong>Club name</strong>
                    <span>Not configured</span>
                  </div>

                  <strong>0</strong>
                </div>

                <div className={styles.settingRow}>
                  <div className={styles.settingText}>
                    <strong>Timezone</strong>
                    <span>Not configured</span>
                  </div>

                  <strong>0</strong>
                </div>

                <div className={styles.settingRow}>
                  <div className={styles.settingText}>
                    <strong>Members</strong>
                    <span>No member data loaded.</span>
                  </div>

                  <strong>0</strong>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
