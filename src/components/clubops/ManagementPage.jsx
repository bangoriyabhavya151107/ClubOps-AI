"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import styles from "./ManagementPage.module.css";

function emptyForm(fields) {
  const result = {};

  fields.forEach((field) => {
    result[field.name] = "";
  });

  return result;
}

export default function ManagementPage({
  eyebrow = "WORKSPACE",
  title,
  description,
  singular = "Item",
  fields = [],
  columns = [],
}) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(emptyForm(fields));
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return records;
    }

    return records.filter((record) =>
      Object.values(record).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [records, search]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setMessage("");
  }

  function addRecord(event) {
    event.preventDefault();

    const missing = fields.some(
      (field) => field.required && !String(form[field.name] || "").trim()
    );

    if (missing) {
      setMessage("Please complete the required fields.");
      return;
    }

    const newRecord = {
      ...form,
      id: String(Date.now()),
    };

    setRecords((current) => [newRecord, ...current]);
    setForm(emptyForm(fields));
    setShowForm(false);
    setMessage(singular + " added successfully.");
  }

  function removeRecord(id) {
    setRecords((current) =>
      current.filter((record) => record.id !== id)
    );
    setMessage(singular + " removed.");
  }

  function clearAll() {
    setRecords([]);
    setMessage("All records cleared.");
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">
          <div className="clubops-page-intro">
            <div>
              <span className="clubops-eyebrow">{eyebrow}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>

            <button
              type="button"
              className="clubops-primary-button"
              onClick={() => {
                setShowForm((current) => !current);
                setMessage("");
              }}
            >
              {showForm ? "Close Form" : "+ Add " + singular}
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span>Total</span>
              <strong>{records.length}</strong>
            </div>

            <div className={styles.stat}>
              <span>Showing</span>
              <strong>{filteredRecords.length}</strong>
            </div>

            <div className={styles.stat}>
              <span>Search</span>
              <strong>{search ? "On" : "Off"}</strong>
            </div>

            <div className={styles.stat}>
              <span>Status</span>
              <strong>{records.length === 0 ? "Empty" : "Active"}</strong>
            </div>
          </div>

          {showForm && (
            <section className={"clubops-card " + styles.formCard}>
              <div className="clubops-card-heading">
                <div>
                  <span className="clubops-section-label">
                    CREATE
                  </span>

                  <h2>New {singular}</h2>

                  <p>
                    Add a new record. Nothing is pre-filled.
                  </p>
                </div>
              </div>

              <form className={styles.form} onSubmit={addRecord}>
                <div className={styles.formGrid}>
                  {fields.map((field) => (
                    <label
                      className={
                        field.fullWidth
                          ? styles.fieldFull
                          : styles.field
                      }
                      key={field.name}
                    >
                      <span>
                        {field.label}
                        {field.required ? " *" : ""}
                      </span>

                      {field.type === "textarea" ? (
                        <textarea
                          value={form[field.name]}
                          onChange={(event) =>
                            updateField(
                              field.name,
                              event.target.value
                            )
                          }
                          placeholder={field.placeholder || ""}
                          rows={4}
                        />
                      ) : (
                        <input
                          type={field.type || "text"}
                          value={form[field.name]}
                          onChange={(event) =>
                            updateField(
                              field.name,
                              event.target.value
                            )
                          }
                          placeholder={field.placeholder || ""}
                        />
                      )}
                    </label>
                  ))}
                </div>

                <div className={styles.formFooter}>
                  {message && (
                    <span className={styles.message}>
                      {message}
                    </span>
                  )}

                  <button
                    type="button"
                    className="clubops-secondary-button"
                    onClick={() => {
                      setForm(emptyForm(fields));
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="clubops-primary-button"
                  >
                    Save {singular}
                  </button>
                </div>
              </form>
            </section>
          )}

          <section className={"clubops-card " + styles.tableCard}>
            <div className={styles.toolbar}>
              <div>
                <span className="clubops-section-label">
                  RECORDS
                </span>

                <h2>{title} List</h2>
              </div>

              <div className={styles.toolbarActions}>
                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder={"Search " + title.toLowerCase() + "..."}
                  aria-label={"Search " + title}
                />

                <button
                  type="button"
                  className="clubops-secondary-button"
                  onClick={clearAll}
                  disabled={records.length === 0}
                >
                  Clear All
                </button>
              </div>
            </div>

            {message && !showForm && (
              <div className={styles.notice}>
                {message}
              </div>
            )}

            {filteredRecords.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>0</div>

                <h3>No {title.toLowerCase()} yet</h3>

                <p>
                  Your {title.toLowerCase()} count is currently 0.
                  Use the Add button to create the first record.
                </p>
              </div>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {columns.map((column) => (
                        <th key={column.key}>
                          {column.label}
                        </th>
                      ))}

                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id}>
                        {columns.map((column) => (
                          <td key={column.key}>
                            {record[column.key] || "—"}
                          </td>
                        ))}

                        <td>
                          <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={() =>
                              removeRecord(record.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
