import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : `${process.env.NEXT_PUBLIC_CORS_PROXY_DEV}${process.env.NEXT_PUBLIC_API_URL_DEV}`;

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (sginupData: SignUpData) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: sginupData,
      }),
    }),
  }),
});

export const { useSignupMutation } = apiSlice;
