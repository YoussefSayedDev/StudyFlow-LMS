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
    key: "main",
    items: [
      {
        icon: FaHome,
        key: "home",
        href: "/home",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaChalkboardTeacher,
        key: "teachers",
        href: "/teachers",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: PiStudent,
        key: "students",
        href: "/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaChildren,
        key: "children",
        href: "/children",
        visible: ["parent"],
      },
      {
        icon: RiParentLine,
        key: "parents",
        href: "/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaBookOpenReader,
        key: "subjects",
        href: "/subjects",
        visible: ["admin"],
      },
      {
        icon: FaChalkboard,
        key: "classes",
        href: "/classes",
        visible: ["admin", "teacher", "parent"],
      },
      {
        icon: FaUserFriends,
        key: "lessons",
        href: "/lessons",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaQuestionCircle,
        key: "exams",
        href: "/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: MdOutlineAssignment,
        key: "assignments",
        href: "/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: LuClipboardCheck,
        key: "results",
        href: "/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FiUserCheck,
        key: "attendance",
        href: "/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: BsCalendar2Date,
        key: "events",
        href: "/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaRegMessage,
        key: "messages",
        href: "/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: TfiAnnouncement,
        key: "announcements",
        href: "/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    key: "other",
    items: [
      {
        icon: CgProfile,
        key: "profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: IoSettingsOutline,
        key: "settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: IoLogOutOutline,
        key: "logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];
