"use client";

import { useActionState, useEffect } from "react";
import { updateProfile } from "./actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const initialState = {
  success: "",
  error: "",
};

export function ProfileForm({
  initialFullName,
  email,
}: {
  initialFullName: string;
  email: string;
}) {
  const [state, formAction, isPending] = useActionState(updateProfile, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="mt-1 text-sm text-gray-900 opacity-60 cursor-not-allowed select-none">
          {email}
        </p>
      </div>
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1 flex max-w-md gap-4">
          <input
            type="text"
            name="fullName"
            id="fullName"
            defaultValue={initialFullName}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm px-3 py-2 border transition-colors"
            placeholder="Your name"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}
