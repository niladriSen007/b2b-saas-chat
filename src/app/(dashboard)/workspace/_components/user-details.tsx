import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogoutLink, PortalLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { CreditCard, LogOutIcon, User } from "lucide-react"

const UserDetails = () => {

  const user = {
    picture: "https://github.com/shadcn.png",
    name: "shadcn chakroti"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="size-12 rounded-xl hover:rounded-lg transition-all duration-300 bg-gray-500/50 border-border/50 hover:bg-gray-500/70 hover:border-border border-2 p-0 cursor-pointer">
          <Avatar>
            <AvatarImage src={user.picture} alt={user.name} className="object-cover" />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" sideOffset={10} className="W-[200px]">
        <DropdownMenuLabel className="font-medium flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar>
            <AvatarImage src={user.picture} alt={user.name} className="object-cover" />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <p className="truncate font-medium">{user?.name}</p>
            <p className="text-muted-foreground truncate text-xs">nil@nil.com</p>
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