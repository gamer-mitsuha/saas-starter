"use server";

import { createAdminClient, createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getStripe } from "@/lib/stripe";
import { siteConfig } from "@/config/site";

export async function updateProfileName(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  if (!name || name.trim().length < 2) {
    return { error: "Name must be at least 2 characters" };
  }

  // Update public profile
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ full_name: name })
    .eq("id", user.id);

  if (profileError) {
    console.error("Error updating profile:", profileError);
    return { error: "Failed to update profile" };
  }

  // Update auth user metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: { full_name: name },
  });

  if (authError) {
    console.error("Error updating auth metadata:", authError);
  }

  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function createPortalSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    throw new Error("No Stripe customer found");
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${siteConfig.url}/dashboard/settings`,
  });

  return session.url;
}

export async function deleteAccount() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(user.id);

  if (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete account");
  }

  redirect("/login");
}
