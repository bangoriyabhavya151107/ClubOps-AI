import { createClient } from "@/lib/supabase/client";

export async function getWorkspace() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("You are not logged in.");
  }

  const { data: workspace, error: workspaceError } =
    await supabase.rpc("ensure_user_workspace");

  if (workspaceError) {
    console.error("Workspace initialization error:", workspaceError);

    throw new Error(
      workspaceError.message ||
        "Unable to initialize your club workspace."
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  const { data: membership, error: membershipError } = await supabase
    .from("club_members")
    .select("club_id, role, status, joined_at")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("joined_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (membershipError) {
    throw membershipError;
  }

  const clubId =
    membership?.club_id ||
    workspace?.club?.id ||
    null;

  if (!clubId) {
    throw new Error(
      "Your account is not connected to a club workspace."
    );
  }

  return {
    user,
    profile,
    clubId,
    club: workspace?.club || null,
    membership,
    role:
      profile?.role ||
      membership?.role ||
      "VOLUNTEER",
  };
}

export function normalizeRole(role) {
  return String(role || "VOLUNTEER").toUpperCase();
}

export function initials(name = "") {
  const result = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return result || "U";
}

export function formatDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatTime(value) {
  if (!value) {
    return "";
  }

  const [hours, minutes] = String(value)
    .split(":")
    .map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return value;
  }

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatMoney(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}