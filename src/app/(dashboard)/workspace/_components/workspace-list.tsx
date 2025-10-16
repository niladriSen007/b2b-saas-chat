"use client"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { orpc } from "@/lib/orpc";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useSuspenseQuery } from "@tanstack/react-query";


const colorCombinations = [
  "bg-blue-500 hover:bg-blue-600 text-white",
  "bg-emerald-500 hover:bg-emerald-700 text-white",
  "bg-purple-500 hover:bg-purple-600 text-white",
  "bg-amber-500 hover:bg-amber-600 text-white",
  "bg-rose-500 hover:bg-rose-600 text-white",
  "bg-indigo-500 hover:bg-indigo-600 text-white",
  "bg-cyan-500 hover:bg-cyan-600 text-white",
  "bg-pink-500 hover:bg-pink-600 text-white",
];

const getWorkSpaceColor = (id: string) => {
  const numericId = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = numericId % colorCombinations.length;
  return colorCombinations[index];
}
const WorkspaceList = () => {

  const { data: {
    workspaces,
    currentWorkspace
  } } = useSuspenseQuery(orpc.workspace.list.queryOptions())

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {
          workspaces?.map((org) => {
            const isCurrentActive = currentWorkspace?.orgCode === org.id
            return (
              <Tooltip key={org.id}>
                <TooltipTrigger asChild>
                  <LoginLink orgCode={org.id}>
                    <Button size="icon" className={`size-10 rounded-md cursor-pointer transition-all duration-300 ${getWorkSpaceColor(org.id)} 
                    ${isCurrentActive && "border-4 border-green-500 animate-pulse "}
                    `}>
                      <div className="text-sm font-semibold m-2">
                        {org.avatar}
                      </div>
                    </Button>
                  </LoginLink>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {org.name} {isCurrentActive && "(Current)"}
                </TooltipContent>
              </Tooltip>
            )
          })
        }
      </div>
    </TooltipProvider>
  )
}
export default WorkspaceList
