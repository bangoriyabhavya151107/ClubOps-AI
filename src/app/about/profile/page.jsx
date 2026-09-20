"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    availability: "",
    bio: "",
    profile_image: "",
    skills: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const supabase = (
      await import("@/lib/supabase/client")
    ).createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!data) return;

    setProfile({
      ...data,
      skills: Array.isArray(data.skills)
        ? data.skills.join(", ")
        : "",
    });
  }

  function update(name, value) {
    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function save(e) {
    e.preventDefault();

    const supabase = (
      await import("@/lib/supabase/client")
    ).createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        department: profile.department,
        availability: profile.availability,
        bio: profile.bio,
        profile_image:
          profile.profile_image,
        skills: String(
          profile.skills || ""
        )
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Profile saved successfully."
    );
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">

          <div className="clubops-welcome">
            <div>
              <span>ACCOUNT</span>
              <h2>My Profile</h2>
              <p>
                Your profile is stored in Supabase.
              </p>
            </div>
          </div>

          <section className="clubops-panel">

            <form
              onSubmit={save}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",
                gap: 15,
              }}
            >

              <Field
                label="Full name"
                value={profile.full_name}
                onChange={(v) =>
                  update("full_name", v)
                }
              />

              <Field
                label="Email"
                value={profile.email}
                disabled
              />

              <Field
                label="Phone"
                value={profile.phone || ""}
                onChange={(v) =>
                  update("phone", v)
                }
              />

              <Field
                label="Role"
                value={profile.role}
                disabled
              />

              <Field
                label="Department"
                value={
                  profile.department || ""
                }
                onChange={(v) =>
                  update(
                    "department",
                    v
                  )
                }
              />

              <Field
                label="Availability"
                value={
                  profile.availability ||
                  ""
                }
                onChange={(v) =>
                  update(
                    "availability",
                    v
                  )
                }
              />

              <Field
                label="Skills"
                value={
                  profile.skills || ""
                }
                onChange={(v) =>
                  update(
                    "skills",
                    v
                  )
                }
              />

              <Field
                label="Profile image URL"
                value={
                  profile.profile_image ||
                  ""
                }
                onChange={(v) =>
                  update(
                    "profile_image",
                    v
                  )
                }
              />

              <label
                style={{
                  display: "grid",
                  gap: 7,
                  gridColumn:
                    "1 / -1",
                  color:
                    "#374151",
                  fontSize: 10,
                  fontWeight: 800,
                }}
              >
                Bio

                <textarea
                  value={
                    profile.bio || ""
                  }
                  onChange={(e) =>
                    update(
                      "bio",
                      e.target.value
                    )
                  }
                  rows={5}
                  style={{
                    padding: 12,
                    border:
                      "1px solid #dfe3ea",
                    borderRadius: 9,
                  }}
                />
              </label>

              <div
                style={{
                  gridColumn:
                    "1 / -1",
                  display: "flex",
                  justifyContent:
                    "flex-end",
                  alignItems:
                    "center",
                  gap: 15,
                }}
              >
                {message && (
                  <span
                    style={{
                      color:
                        "#15803d",
                      fontSize: 10,
                    }}
                  >
                    {message}
                  </span>
                )}

                <button
                  className="clubops-primary-button"
                  type="submit"
                >
                  Save Profile
                </button>
              </div>

            </form>
          </section>
        </section>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled = false,
}) {
  return (
    <label
      style={{
        display: "grid",
        gap: 7,
        color: "#374151",
        fontSize: 10,
        fontWeight: 800,
      }}
    >
      {label}

      <input
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        style={{
          height: 42,
          padding: "0 11px",
          border:
            "1px solid #dfe3ea",
          borderRadius: 8,
        }}
      />
    </label>
  );
}