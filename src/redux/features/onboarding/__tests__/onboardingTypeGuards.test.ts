import { ParentDetails, StudentDetails, TeacherDetails } from "@/types";
import { isStudentDetails, isTeacherDetails } from "..";
import {
  mockParentDetails,
  mockStudentDetails,
  mockTeacherDetails,
} from "./setup";

describe("Onboarding Type Guards", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  describe("isStudentDetails", () => {
    it("should return true for valid student details", () => {
      // Act
      const result = isStudentDetails(mockStudentDetails);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for teacher details", () => {
      // Act
      const result = isStudentDetails(mockTeacherDetails);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for parent details", () => {
      // Act
      const result = isStudentDetails(mockParentDetails);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for null", () => {
      // Act
      const result = isStudentDetails(null);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("isTeacherDetails", () => {
    it("should return true for valid teacher details", () => {
      // Act
      const result = isTeacherDetails(mockTeacherDetails);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for student details", () => {
      // Act
      const result = isTeacherDetails(mockStudentDetails);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for parent details", () => {
      // Act
      const result = isTeacherDetails(mockParentDetails);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for null", () => {
      // Act
      const result = isTeacherDetails(null);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("isParentDetails", () => {
    it("should return true for valid parent details", () => {
      // Act
      const result = isTeacherDetails(mockParentDetails);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for student details", () => {
      // Act
      const result = isTeacherDetails(mockStudentDetails);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for teacher details", () => {
      // Act
      const result = isTeacherDetails(mockTeacherDetails);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for null", () => {
      // Act
      const result = isTeacherDetails(null);

      // Assert
      expect(result).toBe(false);
    });
  });
});
