"use client";

import { useTransition } from "react";
import { createPortalSession } from "@/app/(dashboard)/dashboard/settings/actions";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";

export function ManageSubscriptionButton() {
  const [isPending, startTransition] = useTransition();

  const handleManage = async () => {
    startTransition(async () => {
      try {
        const url = await createPortalSession();
        window.location.href = url;
      } catch (error) {
        console.error(error);
        toast.error("Failed to open billing portal. Please try again.");
      }
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleManage}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Opening...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Manage Subscription
        </>
      )}
    </Button>
  );
}
