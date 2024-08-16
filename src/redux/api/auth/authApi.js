import { baseApi } from "../apiSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userRegister: build.mutation({
      query: (data) => ({
        url: "/auth/register/",
        method: "POST",
        body: data,
      }),
    }),
    userLogin: build.mutation({
      query: (data) => ({
        url: "/auth/login/",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: build.mutation({
      query: (data) => ({
        url: "/auth/verify-email/",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useVerifyEmailMutation,
} = authApi;
