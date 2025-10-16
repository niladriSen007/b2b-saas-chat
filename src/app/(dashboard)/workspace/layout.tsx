import { ReactNode } from "react"
import CreateWorkspace from "./_components/create-workspace"
import UserDetails from "./_components/user-details"
import WorkspaceList from "./_components/workspace-list"

const layout = ({ children }: {
  children: ReactNode
}) => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex h-full w-16 flex-col gap-4 items-center bg-secondary py-3 px-2 border-r border-border">
        <WorkspaceList />
        <CreateWorkspace />
        <div className="mt-auto">
          <UserDetails />
        </div>
      </div>
      {children}
    </div>
  )
}
export default layout