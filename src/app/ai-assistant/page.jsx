"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const templates = [
    {
      title: "Event Planner",
      prompt:
        "Create a complete event plan for a college technical fest for 300 expected students. Include activities, timeline, volunteer roles, tasks, budget categories, risks, contingency plan and communication checklist.",
    },
    {
      title: "Task Breakdown",
      prompt:
        "Break down organizing a college event into actionable tasks. Include owner role, priority, deadline and dependencies.",
    },
    {
      title: "Risk Manager",
      prompt:
        "Analyze common risks for a college event with 300 students. Give probability, impact, prevention and mitigation plans.",
    },
    {
      title: "Meeting Intelligence",
      prompt:
        "Create a professional meeting agenda for a college club operations meeting covering events, volunteers, tasks, budget, risks and upcoming deadlines.",
    },
    {
      title: "Announcement",
      prompt:
        "Write a concise but professional announcement for volunteers about an upcoming college club event.",
    },
    {
      title: "Budget Planner",
      prompt:
        "Create an event budget plan for a college event with an INR 50,000 budget. Divide it into practical categories and include contingency.",
    },
  ];

  async function ask(prompt = input) {
    const clean = prompt.trim();

    if (!clean) return;

    setLoading(true);
    setResponse("");

    try {
      const result = await fetch(
        "/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            prompt: clean,
          }),
        }
      );

      const data = await result.json();

      if (!result.ok) {
        throw new Error(
          data.error ||
            "AI request failed."
        );
      }

      setResponse(data.text);
    } catch (error) {
      setResponse(
        error?.message ||
          "Unable to contact Gemini."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">

          <div className="clubops-welcome">
            <div>
              <span>SMART OPERATIONS</span>

              <h2>
                ClubOps AI Planner
              </h2>

              <p>
                Turn a simple instruction into an
                actionable club operations plan.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "280px 1fr",
              gap: 18,
            }}
          >

            <section className="clubops-panel">
              <div className="clubops-panel-title">
                <div>
                  <span>AI WORKFLOWS</span>
                  <h3>Quick Prompts</h3>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 8,
                }}
              >
                {templates.map(
                  (template) => (
                    <button
                      key={template.title}
                      onClick={() =>
                        ask(
                          template.prompt
                        )
                      }
                      style={{
                        padding: 12,
                        border:
                          "1px solid #e5e7eb",
                        borderRadius: 9,
                        background:
                          "white",
                        textAlign:
                          "left",
                        cursor:
                          "pointer",
                      }}
                    >
                      <strong
                        style={{
                          display:
                            "block",
                          color:
                            "#111827",
                          fontSize:
                            10,
                        }}
                      >
                        ✦{" "}
                        {template.title}
                      </strong>

                      <small
                        style={{
                          display:
                            "block",
                          marginTop: 5,
                          color:
                            "#8b92a3",
                          fontSize:
                            8,
                          lineHeight:
                            1.5,
                        }}
                      >
                        Generate
                        workflow
                      </small>
                    </button>
                  )
                )}
              </div>
            </section>

            <section className="clubops-panel">

              <div className="clubops-panel-title">
                <div>
                  <span>GEMINI</span>
                  <h3>AI Workspace</h3>
                </div>
              </div>

              <textarea
                value={input}
                onChange={(e) =>
                  setInput(
                    e.target.value
                  )
                }
                placeholder="Example: Plan a 500-student hackathon with 20 volunteers and a ₹1 lakh budget..."
                style={{
                  width: "100%",
                  minHeight: 130,
                  padding: 14,
                  border:
                    "1px solid #dfe3ea",
                  borderRadius: 10,
                  resize: "vertical",
                  outline: "none",
                  fontFamily:
                    "inherit",
                  fontSize: 12,
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "flex-end",
                  marginTop: 12,
                }}
              >
                <button
                  className="clubops-primary-button"
                  onClick={() =>
                    ask()
                  }
                  disabled={loading}
                >
                  {loading
                    ? "Thinking..."
                    : "Generate Plan ✦"}
                </button>
              </div>

              {response && (
                <div
                  style={{
                    marginTop: 20,
                    padding: 20,
                    borderRadius: 12,
                    background:
                      "#f8f8ff",
                    whiteSpace:
                      "pre-wrap",
                    color:
                      "#303746",
                    fontSize: 11,
                    lineHeight: 1.7,
                  }}
                >
                  {response}
                </div>
              )}

            </section>

          </div>

        </section>
      </main>
    </div>
  );
}