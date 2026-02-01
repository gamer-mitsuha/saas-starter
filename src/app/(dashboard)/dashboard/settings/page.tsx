import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-2 text-gray-600">Manage your account and preferences.</p>

      {/* Profile Section */}
      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {user.user_metadata?.full_name ?? "Not set"}
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Subscription</h2>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Free Plan</p>
              <p className="text-sm text-gray-600">
                Basic features included.
              </p>
            </div>
            <a
              href="/pricing"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-6 rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        <p className="mt-2 text-sm text-gray-600">
          Once you delete your account, there is no going back.
        </p>
        <button className="mt-4 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
          Delete Account
        </button>
      </div>
    </div>
  );
}
