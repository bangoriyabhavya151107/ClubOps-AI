"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { initials } from "@/lib/clubops";

export default function Topbar() {
  const supabase = createClient();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("full_name,email,role,profile_image")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(data);
    }

    load();
  }, []);

  return (
    <header className="clubops-topbar">
      <div>
        <span>CLUBOPS AI</span>
        <h1>Operations Workspace</h1>
        <p>
          Manage your club from one place.
        </p>
      </div>

      <div className="clubops-top-user">
        <Link href="/profile">
          {profile?.profile_image ? (
            <img
              src={profile.profile_image}
              alt=""
            />
          ) : (
            <strong>
              {initials(profile?.full_name)}
            </strong>
          )}

          <div>
            <b>
              {profile?.full_name || "Club Member"}
            </b>

            <small>
              {profile?.role || "VOLUNTEER"}
            </small>
          </div>
        </Link>
      </div>
    </header>
  );
}