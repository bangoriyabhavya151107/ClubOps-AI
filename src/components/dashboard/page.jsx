"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setUser(user);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Profile error:", error);
      }

      setRole(profile?.role || "member");
    } catch (error) {
      console.error(error);
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="full-page-loading">
        <div className="loading-spinner"></div>
        <h2>Loading ClubOps AI...</h2>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar role={role} />

      <main className="dashboard-main">
        <Header user={user} role={role} />

        <DashboardContent
          user={user}
          role={role}
        />
      </main>
    </div>
  );
}