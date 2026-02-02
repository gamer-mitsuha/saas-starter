import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateProjectButton } from "@/components/create-project-button";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const planLabel = profile?.plan
    ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1)
    : "Free";

  const projectCount = projects?.length ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome back, {user?.user_metadata?.full_name ?? user?.email ?? "User"}!
      </p>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Projects" value={String(projectCount)} description="Active projects" />
        <StatCard title="Usage" value="0%" description="Of your plan limit" />
        <StatCard title="Plan" value={planLabel} description="Upgrade anytime" />
      </div>

      {projectCount === 0 ? (
        /* Empty State */
        <div className="mt-12 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
          <p className="mt-2 text-sm text-gray-600">
            Get started by creating your first project.
          </p>
          <CreateProjectButton className="mt-6" />
        </div>
      ) : (
        /* Projects List */
        <div className="mt-12">
            <div className="flex items-center justify-between">
                 <h2 className="text-lg font-medium text-gray-900">Your Projects</h2>
                 <CreateProjectButton />
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project) => (
                    <Card key={project.id} className="hover:bg-gray-50 transition-colors">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">
                                Created {new Date(project.created_at).toLocaleDateString()}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      )}
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
