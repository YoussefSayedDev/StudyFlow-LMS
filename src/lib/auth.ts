import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { api } from "./api";
import { StudentDetails } from "./useOnboardingStore";

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

interface SignInData {
  username: string;
  password: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

interface SignUpResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
}

interface SignInResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
  studentDetails?: StudentDetails;
  // teacherDetails?: TeacherDetails;
  // parentDetails?: ParentDetails;
}

const signUp = async (data: SignUpData) => {
  const response = await api.post<ApiResponse<SignUpResponse>>(
    "/auth/sign-up",
    data,
  );
  return response.data.data;
};

export const useSignUp = () => {
  const saveSignUp = useAuthStore((state) => state.signUp);

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      saveSignUp(data); // Save user info & token
    },
  });
};

const signIn = async (data: { username: string; password: string }) => {
  const response = await api.post<ApiResponse<SignInResponse>>(
    "/auth/sign-in",
    data,
  );

  window.localStorage.setItem("user", JSON.stringify(response.data.data))

  console.log("response.data.data from signIn fn:", response.data.data)
  return response.data.data;
};

export const useSignIn = () => {

  const router = useRouter();
  const saveSignIn = useAuthStore((state) => state.signIn);

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      saveSignIn(data); // Save user info & token

      router.push(`/en/student/home`);
    },
  });
};
