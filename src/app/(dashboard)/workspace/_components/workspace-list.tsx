import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const orgs = [
  {
    id: "1",
    name: "Teamflow 1",
    avatar: "TF"
  },
  {
    id: "2",
    name: "Teamflow 2",
    avatar: "TF"
  },
  {
    id: "3",
    name: "Teamflow 3",
    avatar: "TF"
  }
]

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
  const index = parseInt(id) % colorCombinations.length;
  return colorCombinations[index];
}
const WorkspaceList = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {
          orgs.map((org) => (
            <Tooltip key={org.id}>
              <TooltipTrigger asChild>
                <Button size="icon" className={`size-10 rounded-md cursor-pointer transition-all duration-300 ${getWorkSpaceColor(org.id)}`}>
                  <span className="text-sm font-semibold">
                    {org.avatar}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {org.name}
              </TooltipContent>
            </Tooltip>
          ))
        }
      </div>
    </TooltipProvider>
  )
}
export default WorkspaceList
