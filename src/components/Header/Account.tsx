"use client";
import LanguegesButton from "@/components/Header/buttons/LanguagesButton";
import LogoutButton from "@/components/Header/buttons/LogoutButton";
import ThemeButton from "@/components/Header/buttons/ThemeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/store/authStore";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  Settings,
  User,
  Users,
} from "lucide-react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Account() {
  const user = useAuthStore((state) => state.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <div className="group flex cursor-pointer items-start gap-2 rounded-md p-1 transition-all duration-300 hover:bg-primary md:hidden">
            <MobileAvatar />
          </div>
          <div className="group hidden cursor-pointer items-start gap-2 rounded-md p-1 transition-all duration-300 hover:bg-primary md:flex">
            <DesktopAvatar />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6 w-60">
        <DropdownMenuLabel>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/public/avatar.png" />
              <AvatarFallback>YE</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-between">
              <h4 className="text-lg font-semibold">{user?.userName}</h4>
              <span className="text-xs">Admin</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>
          <ThemeButton />
          <LanguegesButton />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DesktopAvatar() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <Avatar className="size-8">
        <AvatarImage src="/avatar.png" width={40} height={40} />
        <AvatarFallback>YE</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold leading-3 text-foreground transition-colors duration-300 group-hover:text-primary-foreground">
          {user?.userName}
        </span>
        <span className="text-[9px] text-muted-foreground">Admin</span>
      </div>
      <MdKeyboardArrowDown
        className="text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground"
        size={24}
      />
    </>
  );
}

function MobileAvatar() {
  return (
    <>
      <Avatar className="size-8">
        <AvatarImage src="/avatar.png" width={30} height={30} />
        <AvatarFallback>YE</AvatarFallback>
      </Avatar>
    </>
  );
}
