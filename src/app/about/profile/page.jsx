```jsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Club Admin",
    email: "admin@example.com",
    phone: "+91 98765 43210",
    role: "Administrator",
    club: "ClubOps AI Club",
    bio: "Club administrator responsible for managing club operations, members and events.",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(event) {
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

              <p>
                Manage your personal information and club profile.
              </p>
            </div>
          </div>

          <div className="profile-layout">
            {/* Profile card */}
            <aside className="profile-summary-card">
              <div className="profile-large-avatar">
                CA
              </div>

              <h2>{profile.fullName}</h2>

              <p>{profile.email}</p>

              <span className="profile-role">
                {profile.role}
              </span>

              <div className="profile-divider" />

              <div className="profile-summary-row">
                <span>Club</span>
                <strong>{profile.club}</strong>
              </div>

              <div className="profile-summary-row">
                <span>Status</span>
                <strong className="profile-active">
                  Active
                </strong>
              </div>
            </aside>

            {/* Edit form */}
            <section className="clubops-card profile-form-card">
              <div className="clubops-card-heading">
                <div>
                  <span className="clubops-section-label">
                    PERSONAL INFORMATION
                  </span>

                  <h2>Profile Details</h2>

                  <p>
                    Update the information associated with your
                    ClubOps account.
                  </p>
                </div>
              </div>

              <form
                className="clubops-form"
                onSubmit={handleSubmit}
              >
                <div className="clubops-form-grid">
                  <div className="clubops-form-field">
                    <label htmlFor="fullName">
                      Full Name
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="clubops-form-field">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="clubops-form-field">
                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                    />
                  </div>

                  <div className="clubops-form-field">
                    <label htmlFor="role">
                      Role
                    </label>

                    <input
                      id="role"
                      name="role"
                      value={profile.role}
                      disabled
                    />
                  </div>

                  <div className="clubops-form-field clubops-form-full">
                    <label htmlFor="club">
                      Club Name
                    </label>

                    <input
                      id="club"
                      name="club"
                      value={profile.club}
                      onChange={handleChange}
                      placeholder="Enter your club name"
                    />
                  </div>

                  <div className="clubops-form-field clubops-form-full">
                    <label htmlFor="bio">
                      About
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      rows="5"
                      value={profile.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>

                <div className="clubops-form-footer">
                  {saved && (
                    <span className="clubops-save-message">
                      ✓ Profile updated
                    </span>
                  )}

                  <button
                    type="submit"
                    className="clubops-primary-button"
                  >
                    Save Changes
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
```
