import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DeleteAccountButton } from "@/components/delete-account-button";
import { ProfileForm } from "./profile-form";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const planLabel = profile?.plan
    ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1)
    : "Free";

  const fullName = profile?.full_name ?? user.user_metadata?.full_name ?? "";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-2 text-gray-600">Manage your account and preferences.</p>

      {/* Profile Section */}
      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
        <ProfileForm initialFullName={fullName} email={user.email || ""} />
      </div>

      {/* Subscription Section */}
      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Subscription</h2>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{planLabel} Plan</p>
              <p className="text-sm text-gray-600">
                {profile?.plan === "pro"
                  ? "You have access to all features."
                  : "Basic features included."}
              </p>
            </div>
            {profile?.plan !== "pro" && (
              <a
                href="/pricing"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Upgrade to Pro
              </a>
            )}
            {profile?.plan === "pro" && (
               <button
               className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
             >
               Manage Subscription
             </button>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-6 rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        <p className="mt-2 text-sm text-gray-600">
          Once you delete your account, there is no going back.
        </p>
        <div className="mt-4">
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}
