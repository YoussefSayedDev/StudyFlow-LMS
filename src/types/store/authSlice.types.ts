import { boolean } from "zod";
import { UserRole } from "../entities/User.types";

export interface User {
  id: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  hasCompletedOnboarding: boolean;
  languageCode: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Request/Response types
export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}
