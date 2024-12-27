import { IoIosMore } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

interface UserCardProps {
  type: "student" | "teacher" | "parent" | "staff";
}

const UserCard = ({ type }: UserCardProps) => {
  return (
    <figure className="flex flex-1 cursor-pointer flex-col gap-3 rounded-lg bg-accent p-3 transition-transform duration-300 hover:scale-105">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground">
          <span className="capitalize">{type}</span>s
        </h3>
        <IoIosMore className="size-5" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>1234</span>
        <span className="flex size-7 items-center justify-center rounded-full border border-primary">
          <MdOutlineKeyboardDoubleArrowUp className="size-5 rotate-45" />
        </span>
      </div>
    </figure>
  );
};

export default UserCard;
