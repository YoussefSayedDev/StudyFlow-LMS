"use client";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { AppDispatch, RootState } from "@/redux/store/store";
// import { logout } from "@/store/slices/dummyAuth/authSlice";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function LogoutButton() {
  // const dispatch = useDispatch<AppDispatch>();
  // const user = useSelector((state: RootState) => state.auth.user);
  return (
    <DropdownMenuItem
      onClick={(e) => {
        // dispatch(logout());
        console.log("Logout done");
      }}
    >
      <LogOut />
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
