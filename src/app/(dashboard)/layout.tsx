import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r bg-gray-50">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="text-lg font-bold">
            {siteConfig.name}
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <NavLink href="/dashboard" icon="📊">
            Dashboard
          </NavLink>
          <NavLink href="/dashboard/settings" icon="⚙️">
            Settings
          </NavLink>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
              {user.email?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-gray-900">
                {user.user_metadata?.full_name ?? user.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-8">{children}</div>
      </main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <span>{icon}</span>
      {children}
    </Link>
  );
}
