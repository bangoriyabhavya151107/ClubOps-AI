"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import styles from "@/components/clubops/ManagementPage.module.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    bio: "",
  });
  const [saved, setSaved] = useState(false);

  function update(name, value) {
    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
    setSaved(false);
  }

  function save(event) {
    event.preventDefault();
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
              <h2>My Profile</h2>
              <p>Manage your profile information.</p>
            </div>
          </div>

          <div className={styles.profileGrid}>
            <aside className={styles.profileSummary}>
              <div className={styles.avatar}>
                {profile.name ? profile.name.charAt(0).toUpperCase() : "0"}
              </div>

              <h3>{profile.name || "Your Name"}</h3>

              <p>{profile.email || "No email added"}</p>

              <div className={styles.zero}>
                Profile fields start empty. Add your information and save.
              </div>
            </aside>

            <section className={styles.profileForm}>
              <div className="clubops-card-heading">
                <div>
                  <span className="clubops-section-label">
                    PERSONAL INFORMATION
                  </span>

                  <h2>Profile Details</h2>

                  <p>
                    Enter only the information you want to keep here.
                  </p>
                </div>
              </div>

              <form
                className={styles.profileFormBody}
                onSubmit={save}
              >
                <div className={styles.profileFormGrid}>
                  <div className={styles.profileField}>
                    <label htmlFor="profile-name">
                      Full name
                    </label>

                    <input
                      id="profile-name"
                      value={profile.name}
                      onChange={(event) =>
                        update("name", event.target.value)
                      }
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className={styles.profileField}>
                    <label htmlFor="profile-email">
                      Email
                    </label>

                    <input
                      id="profile-email"
                      type="email"
                      value={profile.email}
                      onChange={(event) =>
                        update("email", event.target.value)
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className={styles.profileField}>
                    <label htmlFor="profile-phone">
                      Phone
                    </label>

                    <input
                      id="profile-phone"
                      value={profile.phone}
                      onChange={(event) =>
                        update("phone", event.target.value)
                      }
                      placeholder="Enter your phone"
                    />
                  </div>

                  <div className={styles.profileField}>
                    <label htmlFor="profile-role">
                      Role
                    </label>

                    <input
                      id="profile-role"
                      value={profile.role}
                      onChange={(event) =>
                        update("role", event.target.value)
                      }
                      placeholder="Enter your role"
                    />
                  </div>

                  <div
                    className={
                      styles.profileField + " " + styles.full
                    }
                  >
                    <label htmlFor="profile-bio">
                      Bio
                    </label>

                    <textarea
                      id="profile-bio"
                      value={profile.bio}
                      onChange={(event) =>
                        update("bio", event.target.value)
                      }
                      placeholder="Tell your club members about yourself"
                    />
                  </div>
                </div>

                <div className={styles.saveBar}>
                  {saved && (
                    <span className={styles.success}>
                      Profile saved for this session.
                    </span>
                  )}

                  <button
                    type="submit"
                    className="clubops-primary-button"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
