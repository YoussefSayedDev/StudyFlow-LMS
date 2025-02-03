import { navigationConfig } from "@/config/navigation";
import { usePathname } from "next/navigation";

export function useNavigation() {
  const pathname = usePathname(); // e.g., "/en/student/home/overview"

  const getCurrentPage = () => {
    // Split the pathname into segments
    const segments = pathname.split("/");
    // Find the main page (e.g., "home", "teachers")
    const mainPage = segments[3]; // Index 3 because [0]="", [1]="en", [2]="student", [3]=mainPage

    return navigationConfig[mainPage] || null;
  };

  const getCurrentSubPage = () => {
    const segments = pathname.split("/");
    return segments[4] || null; // Get the subpage segment
  };

  const getSubPages = () => {
    const currentPage = getCurrentPage();
    return currentPage?.subPages || [];
  };

  const buildUrl = (mainPath: string, subPath?: string) => {
    const base = `/en/student${mainPath}`;
    return subPath ? `${base}${subPath}` : base;
  };

  return {
    currentPage: getCurrentPage(),
    currentSubPage: getCurrentSubPage(),
    subPages: getSubPages(),
    buildUrl,
    isActive: (mainPath: string, subPath?: string) => {
      const segments = pathname.split("/");
      const currentMain = segments[3];
      const currentSub = segments[4];

      if (subPath) {
        return (
          currentMain === mainPath.slice(1) && currentSub === subPath.slice(1)
        );
      }
      return currentMain === mainPath.slice(1);
    },
  };
}
