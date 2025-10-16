"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createWorkspaceSchema, CreateWorkspaceSchemaType } from "../_schemas/create-workspace.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { orpc } from "@/lib/orpc"
import { toast } from "sonner"

const CreateWorkspace = () => {

  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()



  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      workspaceName: "",
    },
  })

  const createWorkspaceMutation = useMutation(
    orpc?.workspace?.create?.mutationOptions({
      onSuccess: (newWorkspace) => {
        toast.success(`Workspace ${newWorkspace.workspaceName} created!`);
        queryClient.invalidateQueries({
          queryKey: orpc?.workspace?.list?.queryKey()
        })
        form.reset();
        setOpen(false);
        // Optionally, you can invalidate and refetch the workspaces list here
      },
      onError: (error) => {
        toast.error(`Error creating workspace: ${error.message}`);
      }
    })
  )

  function onSubmit(values: CreateWorkspaceSchemaType) {
    createWorkspaceMutation.mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="size-10 rounded-xl cursor-pointer transition-all duration-300 border-2
            border-dashed hover:rounded-lg border-gray-600 hover:border-gray-400
            hover:bg-primary/10">
              <Plus size="5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">
          Create Workspace
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects.
          </DialogDescription>
        </DialogHeader>
        {/* Form fields for creating a workspace can be added here */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="workspaceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workspace name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createWorkspaceMutation?.isPending}>
              {createWorkspaceMutation?.isPending ? <><Loader2 className="animate-spin"/>Creating... </> : "Create Workspace"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateWorkspace