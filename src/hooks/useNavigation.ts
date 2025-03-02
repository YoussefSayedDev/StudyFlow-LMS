import { navigationConfig } from "@/lib/config/navigation";
import { role } from "@/lib/data";
import { usePathname } from "next/navigation";

export function useNavigation() {
  const pathname = usePathname(); // e.g., "/en/student/home/overview"
  const locale = pathname.split("/")[1]; // Get the locale from the pathname

  // Function to get the current page
  const getCurrentPage = () => {
    // Split the pathname into segments
    const segments = pathname.split("/"); // e.g., ["", "en", "student", "home"]

    // Find the main page (e.g., "home", "teachers")
    const mainPage = segments[3]; // Index 3 because [0]="", [1]="en", [2]="student", [3]=mainPage

    return navigationConfig[mainPage] || null; // Return the main page object
  };

  // Function to get the current subpage
  const getCurrentSubPage = () => {
    // Split the pathname into segments
    const segments = pathname.split("/"); // e.g., ["", "en", "student", "home"]

    return segments[4] || null; // Return the subpage
  };

  // Function to get the subpages of the current page
  const getSubPages = () => {
    // Get the current page
    const currentPage = getCurrentPage();

    return currentPage?.subPages || []; // Return the subpages of the current page
  };

  // Function to build the URL for a subpage
  const buildUrl = (mainPath: string, subPath?: string) => {
    // Get base URL
    const base = `/${locale}/${role}${mainPath}`;

    // If there is a subpage, add it to the base URL
    return subPath ? `${base}${subPath}` : base;
  };

  return {
    currentPage: getCurrentPage(),
    currentSubPage: getCurrentSubPage(),
    subPages: getSubPages(),
    buildUrl,
    isActive: (mainPath: string, subPath?: string) => {
      /*
      Example:
        mainPath: /home && subPath: /tasks
        path: /en/student/home/tasks
        segments: ["", "en", "student", "home", "task"]
        currentMain: home
        currentSub: tasks
      */
      const segments = pathname.split("/"); // e.g., ["", "en", "student", "home"]
      const currentMain = segments[3]; // home
      const currentSub = segments[4]; // overview

      if (subPath) {
        // If the subPath after removing the leading slash is empty, and the currentSub is empty, it means the user is on the main page
        if (subPath.slice(1) === "") return !currentSub;
        // otherwise check if the subPath matches the current subPath
        else
          return (
            currentMain === mainPath.slice(1) && currentSub === subPath.slice(1)
          );
      }
      // Return true if the currentMain is equal to the mainPath
      return currentMain === mainPath.slice(1);
    },
  };
}
