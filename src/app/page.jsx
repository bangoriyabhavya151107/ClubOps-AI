import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="text-2xl font-bold">
            ClubOps AI
          </Link>

          <div className="flex gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-slate-700 px-5 py-2 hover:bg-slate-800"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">

        <p className="mb-4 text-blue-400">
          AI-Powered College Club Management
        </p>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight">
          Run Your College Events Smarter with AI
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Manage events, tasks, volunteers, meetings and club operations
          from one intelligent platform.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-7 py-3 font-semibold hover:bg-blue-700"
          >
            Create Account
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-slate-700 px-7 py-3 font-semibold hover:bg-slate-800"
          >
            Login
          </Link>

        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">

        <Feature
          title="Event Management"
          description="Manage college events, deadlines and activities from one place."
        />

        <Feature
          title="AI Assistant"
          description="Use AI to plan events and automate operational tasks."
        />

        <Feature
          title="Team Management"
          description="Manage coordinators, volunteers and responsibilities."
        />

      </section>

    </main>
  );
}

function Feature({ title, description }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-3 text-xl font-semibold">
        {title}
      </h2>

      <p className="text-slate-400">
        {description}
      </p>
    </div>
  );
}