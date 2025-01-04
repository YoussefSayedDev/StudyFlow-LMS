import Image from "next/image";
import { FaRegBell } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatarImage from "@/assets/images/avatar.png";

const Profile = () => {
  return (
    <div>
      <div className="md:hidden">
        <MobileProfile />
      </div>
      <div className="hidden md:block">
        <DesktopProfile />
      </div>
    </div>
  );
};

const MobileProfile = () => {
  return (
    <div className="flex h-[40px] items-center gap-2 rounded-md border border-border bg-sidebar-background px-2 py-2">
      <div className="flex items-center gap-2">
        <div className="relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-border">
          <IoChatboxEllipsesOutline
            size={20}
            className="text-muted-foreground"
          />
          <span className="absolute right-0 top-0 flex size-3.5 items-center justify-center rounded-full bg-primary text-[10px] text-white ring">
            2
          </span>
        </div>
        <div className="relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-border">
          <FaRegBell size={18} className="text-muted-foreground" />
          <span className="absolute right-0 top-0 flex size-3.5 items-center justify-center rounded-full bg-primary text-[10px] text-white ring">
            4
          </span>
        </div>
      </div>
      <div className="group flex cursor-pointer items-center gap-2 rounded-md p-1 transition-all duration-300 hover:bg-border">
        <Image
          className="size-8 rounded-full"
          src={avatarImage}
          alt="avatar"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

const DesktopProfile = () => {
  return (
    <div className="hidden h-[50px] items-center gap-6 rounded-md border border-border bg-sidebar-background px-4 py-2 md:flex">
      <div className="flex items-center gap-4">
        <div className="relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-border">
          <IoChatboxEllipsesOutline
            size={22}
            className="text-muted-foreground"
          />
          <span className="absolute right-0 top-0 flex size-3.5 items-center justify-center rounded-full bg-primary text-[10px] text-white ring">
            2
          </span>
        </div>
        <div className="relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-border">
          <FaRegBell size={20} className="text-muted-foreground" />
          <span className="absolute right-0 top-0 flex size-3.5 items-center justify-center rounded-full bg-primary text-[10px] text-white ring">
            4
          </span>
        </div>
      </div>
      <div className="group flex cursor-pointer items-center gap-2 rounded-md p-1 transition-all duration-300 hover:bg-border">
        <Image
          className="size-8 rounded-full"
          src={avatarImage}
          alt="avatar"
          width={40}
          height={40}
        />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold leading-3 text-foreground">
            Youssef
          </span>
          <span className="text-[9px] text-muted-foreground">Admin</span>
        </div>
        <MdKeyboardArrowDown className="text-muted-foreground" size={24} />
      </div>
    </div>
  );
};

export default Profile;
