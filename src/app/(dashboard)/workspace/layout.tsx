import { ReactNode } from "react"
import CreateWorkspace from "./_components/create-workspace"
import UserDetails from "./_components/user-details"
import WorkspaceList from "./_components/workspace-list"
import { getQueryClient, HydrateClient } from "@/lib/query/hydration"
import { orpc } from "@/lib/orpc"

const layout = async ({ children }: {
  children: ReactNode
}) => {

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(orpc.workspace.list.queryOptions())
  return (
    <div className="flex w-full h-screen">
      <div className="flex h-full w-16 flex-col gap-4 items-center bg-secondary py-3 px-2 border-r border-border">
        <HydrateClient client={queryClient}>
          <WorkspaceList />
        </HydrateClient>
        <CreateWorkspace />
        <div className="mt-auto">
          <HydrateClient client={queryClient}>
            <UserDetails />
          </HydrateClient>
        </div>
      </div>
      {children}
    </div>
  )
}
export default layout