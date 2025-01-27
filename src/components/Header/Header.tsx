import { cn } from "@/lib/utils";
import Logo from "../Logo";
import Account from "./Account";
import NotificationIcon from "./NotificationIcon";
import SearchInput from "./SearchInput";

export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn("bg-background", className)}>
      <div className="container mx-auto flex w-full items-center justify-between p-2 px-4 py-2 backdrop-blur-sm">
        <h1 className="text-3xl font-bold">Welcome back, Youssef!</h1>
        <div className="hidden items-center gap-3 md:flex">
          <SearchInput />
          <NotificationIcon />
          <Account />
        </div>
      </div>
    </header>
  );
}
