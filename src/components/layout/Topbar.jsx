"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import {
  getWorkspace,
  initials,
  normalizeRole,
} from "@/lib/clubops";

function getRoleLabel(role) {
  switch (normalizeRole(role)) {
    case "ADMIN":
      return "Administrator";

    case "COORDINATOR":
      return "Coordinator";

    case "VOLUNTEER":
      return "Volunteer";

    default:
      return "Club Member";
  }
}

export default function Topbar() {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const {
          data: {
            user,
          },
        } = await supabase.auth.getUser();

        if (!user) {
          return;
        }

        const { data } =
          await supabase
            .from("profiles")
            .select(
              "full_name,email,role,profile_image"
            )
            .eq("id", user.id)
            .maybeSingle();

        if (mounted) {
          setProfile(data);
        }
      } catch (error) {
        console.error(
          "Topbar profile error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const role =
    normalizeRole(
      profile?.role ||
        "VOLUNTEER"
    );

  const roleLabel =
    getRoleLabel(role);

  return (
    <header className="clubops-topbar">
      <div>
        <span>
          CLUBOPS AI
        </span>

        <h1>
          Operations Workspace
        </h1>

        <p>
          Manage your club from one place.
        </p>
      </div>

      <div className="clubops-top-user">
        <Link href="/profile">
          {profile?.profile_image ? (
            <img
              src={profile.profile_image}
              alt={
                profile.full_name ||
                "Profile"
              }
            />
          ) : (
            <strong>
              {loading
                ? "…"
                : initials(
                    profile?.full_name
                  )}
            </strong>
          )}

          <div>
            <b>
              {loading
                ? "Loading..."
                : profile?.full_name ||
                  "Club Member"}
            </b>

            <small>
              {loading
                ? "Loading role..."
                : roleLabel}
            </small>
          </div>
        </Link>
      </div>
    </header>
  );
}