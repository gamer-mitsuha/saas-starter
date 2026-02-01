import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome back, {user?.user_metadata?.full_name ?? user?.email ?? "User"}!
      </p>

      {/* Stats Grid - Customize for your product */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Projects" value="0" description="Active projects" />
        <StatCard title="Usage" value="0%" description="Of your plan limit" />
        <StatCard title="Plan" value="Free" description="Upgrade anytime" />
      </div>

      {/* Empty State */}
      <div className="mt-12 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
        <p className="mt-2 text-sm text-gray-600">
          Get started by creating your first project.
        </p>
        <button className="mt-6 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Create Project
        </button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
