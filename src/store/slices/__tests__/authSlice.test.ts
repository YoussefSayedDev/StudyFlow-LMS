import { authService } from "@/services/authService";
import authReducer, {
  fetchUserAccount,
  signInUser,
  signUpUser,
} from "../authSlice";

// import configureMockStore from "redux-mock-store";
import { Role, User } from "@/types";

// Create a mock Redux store
const mockStore = configureMockStore();

// Mock the authService.signIn method
jest.mock("@/services/authService", () => ({
  authService: {
    signIn: jest.fn(), // Mock the signIn method
  },
}));

// mock a fake user
const mockUser: User = {
  id: "1",
  username: "testUser",
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  role: Role.Student,
  phoneNumber: "123456789",
};

describe("authSlice", () => {
  describe("signInUser", () => {
    it("should dispatch the signInUser.pending action when the API call is pending", async () => {
      const store = mockStore();
    });
  });
});
