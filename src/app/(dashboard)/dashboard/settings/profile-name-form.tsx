"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateProfileName } from "./actions";

interface ProfileNameFormProps {
  initialName: string;
}

export function ProfileNameForm({ initialName }: ProfileNameFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await updateProfileName(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Name updated successfully");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end max-w-md">
      <div className="flex-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          name="name"
          id="name"
          defaultValue={initialName}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Your name"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
        Save
      </Button>
    </form>
  );
}
