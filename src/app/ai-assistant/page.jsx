"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import styles from "@/components/clubops/ManagementPage.module.css";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  function sendMessage(event) {
    event.preventDefault();

    const text = input.trim();

    if (!text) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: String(Date.now()),
        role: "user",
        text,
      },
      {
        id: String(Date.now() + 1),
        role: "system",
        text:
          "Your message was received. Connect your Gemini or OpenAI API to generate an AI response here.",
      },
    ]);

    setInput("");
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">
          <div className="clubops-page-intro">
            <div>
              <span className="clubops-eyebrow">SMART TOOLS</span>
              <h2>AI Assistant</h2>
              <p>
                Ask questions about club operations.
              </p>
            </div>
          </div>

          <section className={styles.aiCard}>
            <div className={styles.chat}>
              {messages.length === 0 ? (
                <div className={styles.chatEmpty}>
                  <div>
                    <div className={styles.chatEmptyIcon}>
                      ✦
                    </div>

                    <h3>Start a conversation</h3>

                    <p>
                      The conversation starts empty. Type a message below.
                      The page is ready for your AI provider integration.
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.messageList}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={
                        styles.chatMessage +
                        " " +
                        (message.role === "user"
                          ? styles.userMessage
                          : styles.systemMessage)
                      }
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form className={styles.chatForm} onSubmit={sendMessage}>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask something about your club..."
                aria-label="Ask the AI assistant"
              />

              <button
                type="submit"
                className="clubops-primary-button"
              >
                Send
              </button>
            </form>
          </section>
        </section>
      </main>
    </div>
  );
}
