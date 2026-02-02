"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button, type ButtonProps } from "@/components/ui/button";
import { createProject } from "@/app/(dashboard)/dashboard/actions";

export function CreateProjectButton({ className, ...props }: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
        const result = await createProject(formData);
        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Project created successfully");
            setIsOpen(false);
        }
    } catch {
        toast.error("Something went wrong");
    } finally {
        setLoading(false);
    }
  }

  return (
    <>
      <Button
        className={className}
        onClick={() => setIsOpen(true)}
        {...props}
      >
        <Plus className="size-4" />
        Create Project
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in zoom-in-95 duration-200">
           <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
             <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Create New Project</h2>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                   Project Name
                 </label>
                 <input
                   autoFocus
                   name="name"
                   id="name"
                   required
                   className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                   placeholder="My Awesome Project"
                 />
               </div>
               <div className="flex justify-end gap-2">
                 <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} disabled={loading}>
                   Cancel
                 </Button>
                 <Button type="submit" disabled={loading}>
                   {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                   Create
                 </Button>
               </div>
             </form>
           </div>
        </div>
      )}
    </>
  );
}
