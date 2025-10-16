import { z } from "zod"

export const createWorkspaceSchema = z.object({
  workspaceName: z.string().min(2).max(50),
})

export type CreateWorkspaceSchemaType = z.infer<typeof createWorkspaceSchema>