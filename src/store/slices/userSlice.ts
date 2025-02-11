// import { FormData, User } from "@/types";

// interface UserState {
//   user: User | null;
//   isAuthenticated: boolean;
//   error: string | null;
//   loading: boolean;
// }

// const initialState: UserState = {
//   user: null,
//   error: null,
//   loading: false,
// };

// export const generalInfo = createAsyncThunk(
//   "user/generalInfo",
//   async (credentials: FormData["generalInfo"], { rejectWithValue }) => {
//     try {
//       const generalInfo = await authService.generalInfo(credentials);

//       return {
//         generalInfo,
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue("Failed to fetch general info");
//     }
//   },
// );

// export const parentInfo = createAsyncThunk(
//   "user/parentInfo",
//   async (credentials: FormData["parentInfo"], { rejectWithValue }) => {
//     try {
//       const parentInfo = await authService.parentInfo(credentials);

//       return {
//         parentInfo,
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue("Failed to fetch parent info");
//     }
//   },
// );

// export const studentInfo = createAsyncThunk(
//   "user/studentInfo",
//   async (credentials: FormData["studentInfo"], { rejectWithValue }) => {
//     try {
//       const studentInfo = await authService.studentInfo(credentials);

//       return {
//         studentInfo,
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue("Failed to fetch student info");
//     }
//   },
// );

// export const teacherInfo = createAsyncThunk(
//   "user/teacherInfo",
//   async (credentials: FormData["teacherInfo"], { rejectWithValue }) => {
//     try {
//       const teacherInfo = await authService.teacherInfo(credentials);

//       return {
//         teacherInfo,
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue("Failed to fetch teacher info");
//     }
//   },
// );

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     signOut: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       authService.logout();
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(generalInfo.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(generalInfo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.generalInfo;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(generalInfo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.isAuthenticated = false;
//       })
//       .addCase(parentInfo.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(parentInfo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.parentInfo;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(parentInfo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.isAuthenticated = false;
//       })
//       .addCase(studentInfo.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(studentInfo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.studentInfo;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(studentInfo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.isAuthenticated = false;
//       })
//       .addCase(teacherInfo.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(teacherInfo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.teacherInfo;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(teacherInfo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const { signOut, clearError } = userSlice.actions;
// export default userSlice.reducer;
