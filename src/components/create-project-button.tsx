"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button, type ButtonProps } from "@/components/ui/button";

export function CreateProjectButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={className}
      onClick={() =>
        toast("🚧 Coming soon!", {
          description: "Project creation is under development.",
        })
      }
      {...props}
    >
      <Plus className="size-4" />
      Create Project
    </Button>
  );
}
