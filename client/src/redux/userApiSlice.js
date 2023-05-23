import { apiSlice } from './apiSlice';
import { AUTH_URL} from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/emailVerification/${data}`,
        method: 'PUT',
        body: data
      })
    })
    // updateUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${AUTH_URL}/profile`,
    //     method: 'PUT',
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  // useUpdateUserMutation,
} = userApiSlice;