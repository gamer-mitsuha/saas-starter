"use client";

import { useTransition } from "react";
import { deleteAccount } from "@/app/(dashboard)/dashboard/settings/actions";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteAccountButton() {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteAccount();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete account. Please try again.");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </>
      )}
    </Button>
  );
}
