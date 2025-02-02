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
        path: "/overview",
      },
      {
        label: "Study",
        path: "/study",
      },
    ],
  },
};
