"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { formatMoney, getWorkspace } from "@/lib/clubops";

export default function BudgetPage() {
  const [clubId, setClubId] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    event_id: "",
    budget_name: "",
    category: "General",
    allocated_amount: "",
    spent_amount: "0",
    notes: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const workspace = await getWorkspace();

    setClubId(workspace.clubId);

    const supabase = (
      await import("@/lib/supabase/client")
    ).createClient();

    const [budgetResult, eventResult] =
      await Promise.all([
        supabase
          .from("event_budgets")
          .select("*")
          .eq("club_id", workspace.clubId)
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("events")
          .select("id,name")
          .eq("club_id", workspace.clubId)
          .order("event_date"),
      ]);

    setBudgets(budgetResult.data || []);
    setEvents(eventResult.data || []);
  }

  async function save(event) {
    event.preventDefault();

    if (
      !form.event_id ||
      !form.budget_name ||
      !form.allocated_amount
    ) {
      setMessage(
        "Event, budget name and amount are required."
      );
      return;
    }

    const supabase = (
      await import("@/lib/supabase/client")
    ).createClient();

    const {
      data: {
        user,
      },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("event_budgets")
      .insert({
        ...form,
        club_id: clubId,
        allocated_amount: Number(
          form.allocated_amount
        ),
        spent_amount: Number(
          form.spent_amount || 0
        ),
        created_by: user?.id,
      });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Budget line created.");

    setForm({
      event_id: "",
      budget_name: "",
      category: "General",
      allocated_amount: "",
      spent_amount: "0",
      notes: "",
    });

    load();
  }

  const allocated = budgets.reduce(
    (sum, item) =>
      sum + Number(item.allocated_amount || 0),
    0
  );

  const spent = budgets.reduce(
    (sum, item) =>
      sum + Number(item.spent_amount || 0),
    0
  );

  const remaining = allocated - spent;

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">
          <div className="clubops-welcome">
            <div>
              <span>BUDGET PLANNING</span>
              <h2>Financial Control</h2>
              <p>
                Plan event budgets and track spending.
              </p>
            </div>
          </div>

          <div className="clubops-stat-grid">
            <Stat
              label="Allocated"
              value={formatMoney(allocated)}
            />

            <Stat
              label="Spent"
              value={formatMoney(spent)}
            />

            <Stat
              label="Remaining"
              value={formatMoney(remaining)}
            />
          </div>

          <section className="clubops-panel">
            <div className="clubops-panel-title">
              <div>
                <span>BUDGET PLAN</span>
                <h3>New Budget Line</h3>
              </div>
            </div>

            {message && (
              <p>{message}</p>
            )}

            <form
              onSubmit={save}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",
                gap: 15,
              }}
            >
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
                  Select event
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

              <input
                placeholder="Budget name"
                value={form.budget_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    budget_name: e.target.value,
                  })
                }
              />

              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Allocated amount"
                value={form.allocated_amount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    allocated_amount:
                      e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Already spent"
                value={form.spent_amount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    spent_amount:
                      e.target.value,
                  })
                }
              />

              <input
                placeholder="Notes"
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: e.target.value,
                  })
                }
              />

              <button
                className="clubops-primary-button"
                type="submit"
              >
                Add Budget
              </button>
            </form>
          </section>

          <section className="clubops-panel">
            <div className="clubops-panel-title">
              <div>
                <span>LIVE DATA</span>
                <h3>Budget Lines</h3>
              </div>
            </div>

            {budgets.length === 0 ? (
              <div className="clubops-empty">
                <strong>No budget lines yet</strong>
                <p>
                  Create your first event budget above.
                </p>
              </div>
            ) : (
              <div className="clubops-list">
                {budgets.map((item) => (
                  <div
                    className="clubops-list-row"
                    key={item.id}
                  >
                    <div>
                      <strong>
                        {item.budget_name}
                      </strong>

                      <p>
                        {item.category}
                      </p>
                    </div>

                    <div>
                      <strong>
                        {formatMoney(
                          item.allocated_amount
                        )}
                      </strong>

                      <p>
                        Spent{" "}
                        {formatMoney(
                          item.spent_amount
                        )}
                      </p>
                    </div>

                    <span className="status-badge">
                      {formatMoney(
                        Number(
                          item.allocated_amount
                        ) -
                          Number(
                            item.spent_amount
                          )
                      )}
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

function Stat({ label, value }) {
  return (
    <article className="clubops-stat">
      <small>{label}</small>
      <strong>{value}</strong>
    </article>
  );
}