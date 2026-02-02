"use server";

import { createAdminClient, createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const fullName = formData.get("fullName") as string;

  if (!fullName || fullName.length < 2) {
    return { error: "Name must be at least 2 characters long" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating profile:", error);
    return { error: "Failed to update profile" };
  }

  revalidatePath("/dashboard/settings");
  return { success: "Profile updated successfully" };
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
