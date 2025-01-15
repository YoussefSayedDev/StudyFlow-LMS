import { BiSun } from "react-icons/bi";
import Logo from "../Logo";
import Profile from "../Profile";
import ThemeButton from "./ThemeButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-background p-2 backdrop-blur-sm">
      <Logo />
      <div className="flex items-center gap-5">
        <ThemeButton />
        <Profile />
      </div>
    </header>
  );
}
