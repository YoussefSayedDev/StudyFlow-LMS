type NavigationConfig = {
  [key: string]: {
    label: string;
    path: string;
    subPages?: {
      label: string;
      path: string;
    }[];
  };
};

export const navigationConfig: NavigationConfig = {
  home: {
    label: "Home",
    path: "/home",
    subPages: [
      {
        label: "Overview",
        path: "/",
      },
      {
        label: "Tasks",
        path: "/tasks",
      },
      {
        label: "Study",
        path: "/study",
      },
      {
        label: "Notes",
        path: "/notes",
      },
      {
        label: "Questions",
        path: "/questions",
      },
    ],
  },
  teachers: {
    label: "Teachers",
    path: "/teachers",
    subPages: [
      {
        label: "My Teachers",
        path: "/",
      },
      {
        label: "Search Teachers",
        path: "/search-teachers",
      },
      {
        label: "Analytics",
        path: "/analytics",
      },
    ],
  },
};
