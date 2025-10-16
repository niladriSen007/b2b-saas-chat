import { KindeOrganization, KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { os } from "@orpc/server";
import { z } from "zod";
import { base } from "../middlewares/base";
import { authMiddleware } from "../middlewares/auth.middleware";
import { workspaceMiddleware } from "../middlewares/workspace.middleware";
import { createWorkspaceSchema } from "../(dashboard)/workspace/_schemas/create-workspace.schema";
import { init, Organizations } from "@kinde/management-api-js"

export const listWorkspaces = base
  .use(authMiddleware)
  .use(workspaceMiddleware)
  .route({
    method: "GET",
    path: "/workspace",
    summary: "List workspaces",
    tags: ["workspace"],
  }).input(z.void())
  .output(z.object({
    workspaces: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        avatar: z.string(),
      })
    ),
    user: z.custom<KindeUser<Record<string, unknown>>>(),
    currentWorkspace: z.custom<KindeOrganization<unknown>>()
  }))
  .handler(async ({ context, errors }) => {
    const { getUserOrganizations } = getKindeServerSession();
    const organizations = await getUserOrganizations();

    if (!organizations) {
      throw errors?.INTERNAL_SERVER_ERROR();
    }
    return {
      workspaces: organizations?.orgs?.map(org => ({
        id: org.code,
        name: org?.name ?? "My Workspace",
        avatar: org?.name?.charAt(0).toUpperCase() ?? "MW",
      })),
      user: context?.user,
      currentWorkspace: context?.workspace
    };
  });
export const createWorkspace = base
  .use(authMiddleware)
  .use(workspaceMiddleware)
  .route({
    method: "POST",
    path: "/workspace",
    summary: "Create a workspace",
    tags: ["workspace"],
  }).input(createWorkspaceSchema)
  .output(z.object({
    orgCode: z.string(),
    workspaceName: z.string()
  }))
  .handler(async ({ input, context, errors }) => {
    init();
    let data;
    try {
      data = await Organizations.createOrganization({
        requestBody: {
          name: input?.workspaceName
        }
      })
    } catch {
      throw errors?.INTERNAL_SERVER_ERROR({ message: "Failed to create organization" })
    }

    if (!data || !data.organization?.code) {
      throw errors?.INTERNAL_SERVER_ERROR({ message: "Failed to create organization" })
    }

    try {
      await Organizations.addOrganizationUsers({
        orgCode: data?.organization?.code,
        requestBody: {
          users: [{
            id: context?.user?.id!,
            roles: ["admin"]
          }]
        }
      })
    } catch {
      // If adding user to organization fails, we should delete the organization to avoid orphaned orgs
      throw errors?.INTERNAL_SERVER_ERROR({ message: "Failed to add user to organization" })
    }

    const { refreshTokens } = getKindeServerSession();
    await refreshTokens();

    return {
      orgCode: data.organization.code,
      workspaceName: input?.workspaceName
    }
  });



