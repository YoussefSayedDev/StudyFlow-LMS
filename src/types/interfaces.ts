import { IconType } from "react-icons";

interface MenuItem {
  icon: IconType;
  label: string;
  href: string;
  visible: string[];
}

export interface Menu {
  title: string;
  items: MenuItem[];
}
