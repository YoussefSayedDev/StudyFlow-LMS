import { navigationConfig } from "@/config/navigation";
import { renderHook } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { useNavigation } from "../useNavigation";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock the configuration and role
jest.mock("@/config/navigation", () => ({
  navigationConfig: {
    home: {
      path: "/home",
      label: "Home",
      icon: "HomeIcon",
      subPages: [
        { path: "/overview", label: "" },
        { path: "/tasks", label: "Tasks" },
      ],
    },
  },
}));

jest.mock("@/lib/data", () => ({
  role: "student",
}));

describe("useNavigation", () => {
  const mockPathname = (path: string): void => {
    (usePathname as jest.Mock).mockReturnValue(path);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCurrentPage", () => {
    it("should return the current page configuration", () => {
      mockPathname("/en/student/home/overview");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.currentPage).toEqual(navigationConfig.home);
    });

    it("should return null for invalid page", () => {
      mockPathname("/en/student/invalid/overview");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.currentPage).toBeNull();
    });
  });

  describe("getCurrentSubPage", () => {
    it("should return the current subpage", () => {
      mockPathname("/en/student/home/overview");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.currentSubPage).toBe("overview");
    });

    it("should return null when no subpage exists", () => {
      mockPathname("/en/student/home");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.currentSubPage).toBeNull();
    });
  });

  describe("getSubPages", () => {
    it("should return subpages for the current page", () => {
      mockPathname("/en/student/home/overview");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.subPages).toEqual(navigationConfig.home.subPages);
    });
  });

  describe("buildUrl", () => {
    it("should build URL with main path only", () => {
      mockPathname("/en/student/home/overview");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.buildUrl("/home")).toBe("/en/student/home");
    });

    it("should build URL with main path and subpath", () => {
      mockPathname("/en/student/home/overview");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.buildUrl("/home", "/tasks")).toBe(
        "/en/student/home/tasks",
      );
    });
  });

  describe("isActive", () => {
    it("should return true for matching main path without subpath", () => {
      mockPathname("/en/student/home");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.isActive("/home", "")).toBe(true);
    });

    it("should return true for matching main path and subpath", () => {
      mockPathname("/en/student/home/tasks");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.isActive("/home", "/tasks")).toBe(true);
    });

    it("should return false for non-matching paths", () => {
      mockPathname("/en/student/home/tasks");

      const { result } = renderHook(() => useNavigation());

      expect(result.current.isActive("/home", "/overview")).toBe(false);
    });
  });
});
