"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getAvatar } from "@/lib/get-avatar"
import { orpc } from "@/lib/orpc"
import { LogoutLink, PortalLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { useSuspenseQuery } from "@tanstack/react-query"
import { CreditCard, LogOutIcon, User } from "lucide-react"

const UserDetails = () => {

  const { data: { user } } = useSuspenseQuery(orpc.workspace.list.queryOptions())
  if (!user) return null
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="size-12 rounded-xl hover:rounded-lg transition-all duration-300 bg-gray-500/50 border-border/50 hover:bg-gray-500/70 hover:border-border border-2 p-0 cursor-pointer">
          <Avatar>
            <AvatarImage src={getAvatar(user?.picture, user?.email!)} alt={user?.username!} className="object-cover" />
            <AvatarFallback>{user?.given_name?.at(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" sideOffset={10} className="W-[200px]">
        <DropdownMenuLabel className="font-medium flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar>
            <AvatarImage  src={getAvatar(user?.picture, user?.email!)} alt={user?.username!} className="object-cover" />
            <AvatarFallback>{user?.given_name?.at(0)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <p className="truncate font-medium">{user?.given_name}</p>
            <p className="text-muted-foreground truncate text-xs">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <PortalLink>
              <User />
              Account
            </PortalLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <PortalLink>
              <CreditCard />
              Billing
            </PortalLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <LogoutLink>
              <LogOutIcon />
              Log out
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserDetails