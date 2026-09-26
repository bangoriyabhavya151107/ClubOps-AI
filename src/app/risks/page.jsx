"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function RisksPage() {
  const [workspace, setWorkspace] = useState(null);
  const [risks, setRisks] = useState([]);
  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    event_id: "",
    title: "",
    description: "",
    risk_level: "medium",
    status: "open",
    mitigation_plan: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { getWorkspace } =
      await import("@/lib/clubops");

    const workspaceData = await getWorkspace();

    setWorkspace(workspaceData);

    const supabase = (
      await import("@/lib/supabase/client")
    ).createClient();

    const [riskResult, eventResult] =
      await Promise.all([
        supabase
          .from("risks")
          .select("*")
          .eq("club_id", workspaceData.clubId)
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("events")
          .select("id,name")
          .eq("club_id", workspaceData.clubId)
          .order("event_date"),
      ]);

    setRisks(riskResult.data || []);
    setEvents(eventResult.data || []);
  }

  async function save(e) {
    e.preventDefault();

    if (!form.title) {
      alert("Risk title is required.");
      return;
    }

    const supabase = (
      await import("@/lib/supabase/client")
    ).createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("risks")
      .insert({
        ...form,
        club_id: workspace.clubId,
        created_by: user?.id,
        event_id: form.event_id || null,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setForm({
      event_id: "",
      title: "",
      description: "",
      risk_level: "medium",
      status: "open",
      mitigation_plan: "",
    });

    load();
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">
          <div className="clubops-welcome">
            <div>
              <span>RISK MANAGEMENT</span>
              <h2>Potential Risks</h2>
              <p>
                Identify risks before they become incidents.
              </p>
            </div>
          </div>

          <section className="clubops-panel">
            <div className="clubops-panel-title">
              <div>
                <span>RISK REGISTER</span>
                <h3>Add Risk</h3>
              </div>
            </div>

            <form
              onSubmit={save}
              style={{
                display: "grid",
                gap: 14,
                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",
              }}
            >
              <input
                placeholder="Risk title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <select
                value={form.event_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    event_id: e.target.value,
                  })
                }
              >
                <option value="">
                  General club risk
                </option>

                {events.map((event) => (
                  <option
                    key={event.id}
                    value={event.id}
                  >
                    {event.name}
                  </option>
                ))}
              </select>

              <select
                value={form.risk_level}
                onChange={(e) =>
                  setForm({
                    ...form,
                    risk_level: e.target.value,
                  })
                }
              >
                <option value="low">Low</option>
                <option value="medium">
                  Medium
                </option>
                <option value="high">High</option>
                <option value="critical">
                  Critical
                </option>
              </select>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
              >
                <option value="open">Open</option>
                <option value="mitigated">
                  Mitigated
                </option>
                <option value="closed">
                  Closed
                </option>
              </select>

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Mitigation plan"
                value={form.mitigation_plan}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mitigation_plan:
                      e.target.value,
                  })
                }
              />

              <button
                className="clubops-primary-button"
                type="submit"
              >
                Add Risk
              </button>
            </form>
          </section>

          <section className="clubops-panel">
            <div className="clubops-panel-title">
              <div>
                <span>LIVE DATABASE</span>
                <h3>Risk Register</h3>
              </div>
            </div>

            {risks.length === 0 ? (
              <div className="clubops-empty">
                <strong>No risks recorded</strong>
                <p>
                  This is a clean workspace.
                </p>
              </div>
            ) : (
              <div className="clubops-list">
                {risks.map((risk) => (
                  <div
                    className="clubops-list-row"
                    key={risk.id}
                  >
                    <div>
                      <strong>
                        {risk.title}
                      </strong>

                      <p>
                        {risk.description ||
                          "No description"}
                      </p>

                      <small>
                        Mitigation:{" "}
                        {risk.mitigation_plan ||
                          "Not defined"}
                      </small>
                    </div>

                    <span className="priority high">
                      {risk.risk_level}
                    </span>

                    <span className="status-badge">
                      {risk.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}