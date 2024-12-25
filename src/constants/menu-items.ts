import { Menu } from "@/types/interfaces";
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
import { FaBookOpenReader, FaRegMessage } from "react-icons/fa6";
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
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaChalkboardTeacher,
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: PiStudent,
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: RiParentLine,
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaBookOpenReader,
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: FaChalkboard,
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaUserFriends,
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: FaQuestionCircle,
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: MdOutlineAssignment,
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: LuClipboardCheck,
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FiUserCheck,
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: BsCalendar2Date,
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FaRegMessage,
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: TfiAnnouncement,
        label: "Announcements",
        href: "/list/announcements",
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
