import { cn } from "@/lib/utils";
import Logo from "../Logo";
import Account from "./Account";
import NotificationIcon from "./NotificationIcon";
import SearchInput from "./SearchInput";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "flex items-center justify-between bg-background p-2 backdrop-blur-sm",
        className,
      )}
    >
      <Logo />
      <div className="hidden items-center gap-3 px-4 py-2 md:flex">
        <SearchInput />
        <NotificationIcon />
        <Account />
      </div>
    </header>
  );
}
