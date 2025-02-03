import { Menu } from "@/types";
import { BsCalendar2Date } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import {
  FaChalkboard,
  FaChalkboardTeacher,
  FaHome,
  FaQuestionCircle,
  FaUserFriends,
  FaUserGraduate,
} from "react-icons/fa";
import { FaBookOpenReader, FaChildren, FaRegMessage } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { MdOutlineAssignment, MdOutlinePlayLesson } from "react-icons/md";
import { PiExam, PiStudent } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { TfiAnnouncement } from "react-icons/tfi";

export const menuItems: Menu[] = [
  {
    title: "MENU",
    items: [
      {
        icon: FaHome,
        label: "Home",
        href: "/home",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaChalkboardTeacher,
        label: "Teachers",
        href: "/teachers",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: PiStudent,
        label: "Students",
        href: "/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaChildren,
        label: "Children",
        href: "/children",
        visible: ["parent"],
      },
      {
        icon: RiParentLine,
        label: "Parents",
        href: "/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaBookOpenReader,
        label: "Subjects",
        href: "/subjects",
        visible: ["admin"],
      },
      {
        icon: FaChalkboard,
        label: "Classes",
        href: "/classes",
        visible: ["admin", "teacher", "parent"],
      },
      {
        icon: FaUserFriends,
        label: "Lessons",
        href: "/lessons",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaQuestionCircle,
        label: "Exams",
        href: "/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: MdOutlineAssignment,
        label: "Assignments",
        href: "/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: LuClipboardCheck,
        label: "Results",
        href: "/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FiUserCheck,
        label: "Attendance",
        href: "/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: BsCalendar2Date,
        label: "Events",
        href: "/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaRegMessage,
        label: "Messages",
        href: "/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: TfiAnnouncement,
        label: "Announcements",
        href: "/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: CgProfile,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: IoSettingsOutline,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: IoLogOutOutline,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];
