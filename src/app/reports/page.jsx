"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import styles from "@/components/clubops/ManagementPage.module.css";

export default function ReportsPage() {
  const metrics = [
    { label: "Members", value: 0 },
    { label: "Events", value: 0 },
    { label: "Tasks", value: 0 },
    { label: "Attendance", value: "0%" },
  ];

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">
          <div className="clubops-page-intro">
            <div>
              <span className="clubops-eyebrow">ANALYTICS</span>
              <h2>Reports</h2>
              <p>
                A clean overview of club activity. No sample data is loaded.
              </p>
            </div>
          </div>

          <div className={styles.reportGrid}>
            {metrics.map((metric) => (
              <div className={styles.reportMetric} key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>

          <section className="clubops-card">
            <div className="clubops-card-heading">
              <div>
                <span className="clubops-section-label">
                  SUMMARY
                </span>

                <h2>Operations Report</h2>

                <p>
                  Reports will reflect records created inside the connected
                  data source when you add that integration.
                </p>
              </div>
            </div>

            <div className={styles.reportList}>
              <div className={styles.reportRow}>
                <span>Total member records</span>
                <strong>0</strong>
              </div>

              <div className={styles.reportRow}>
                <span>Total event records</span>
                <strong>0</strong>
              </div>

              <div className={styles.reportRow}>
                <span>Total task records</span>
                <strong>0</strong>
              </div>

              <div className={styles.reportRow}>
                <span>Total attendance records</span>
                <strong>0</strong>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
