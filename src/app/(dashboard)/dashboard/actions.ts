"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
});

export async function createProject(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parseResult = createProjectSchema.safeParse(data);

  if (!parseResult.success) {
    return { error: parseResult.error.flatten().fieldErrors.name?.[0] || "Invalid input" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase.from("projects").insert({
    name: parseResult.data.name,
    user_id: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
