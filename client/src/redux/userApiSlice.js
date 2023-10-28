import { apiSlice } from "./apiSlice";
import { AUTH_URL, USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/google-login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    googleRegister: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/google-register`,
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/emailVerification/${data}`,
        method: "PUT",
        body: data,
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/findAll`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGoogleRegisterMutation,
  useVerifyEmailMutation,
  useProfileMutation,
  useGetUsersQuery,
} = userApiSlice;
