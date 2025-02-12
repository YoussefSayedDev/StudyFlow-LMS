// import { RootState } from "@/store/store";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "/api",
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.accessToken;
//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     completeOnboarding: builder.mutation({
//       query: () => ({
//         url: "/onboarding/complete",
//         method: "POST",
//       }),
//     }),
//     // Add other endpoints
//   }),
// });

// export const { useCompleteOnboardingMutation } = api;
