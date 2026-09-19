"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {

  const supabase = createClient();
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadDashboard() {

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      if (error) {
        console.error(error);
        router.push("/login");
        return;
      }

      setProfile(data);
      setLoading(false);
    }

    loadDashboard();

  }, []);

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <header className="border-b border-slate-800">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              ClubOps AI
            </h1>

            <p className="text-sm text-slate-400">
              Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Logout
          </button>

        </div>

      </header>


      {/* Dashboard */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Welcome, {profile?.full_name}
          </h2>

          <p className="mt-2 text-slate-400">
            Your role:{" "}
            <span className="font-semibold text-blue-400">
              {profile?.role}
            </span>
          </p>

        </div>


        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-3">

          <DashboardCard
            title="Total Events"
            value="0"
          />

          <DashboardCard
            title="Tasks"
            value="0"
          />

          <DashboardCard
            title="Volunteers"
            value="0"
          />

        </div>


        {/* AI */}

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <p className="text-sm font-semibold text-blue-400">
            AI COMMAND CENTER
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            AI features coming next
          </h3>

          <p className="mt-3 max-w-2xl text-slate-400">
            In Day 2, Gemini will be connected to real database actions
            such as event creation, task creation and volunteer assignment.
          </p>

        </div>


        {/* Role information */}

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h3 className="text-xl font-bold">
            Your Access
          </h3>

          {profile?.role === "ADMIN" && (
            <p className="mt-3 text-slate-400">
              You have administrative access to the platform.
            </p>
          )}

          {profile?.role === "COORDINATOR" && (
            <p className="mt-3 text-slate-400">
              You can manage club operations, events, tasks and volunteers.
            </p>
          )}

          {profile?.role === "VOLUNTEER" && (
            <p className="mt-3 text-slate-400">
              You can view relevant events and manage your assigned tasks.
            </p>
          )}

        </div>

      </section>

    </main>
  );
}


function DashboardCard({ title, value }) {

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <p className="text-slate-400">
        {title}
      </p>

      <p className="mt-3 text-4xl font-bold">
        {value}
      </p>

    </div>
  );
}