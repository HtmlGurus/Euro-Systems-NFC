import { EMAIL_VERIFICATION, LOGIN, VERIFY_EMAIL } from "../../../api/apiEndPoints";
import { apiSlice } from "../../../api/apiSlice";

import { logOut, setCredentials } from "./authSlice";

import { handleLogoutUser } from "../../../utils/auth";
import { navigate } from "../../../utils/navigateService";
import { setRole, setToken, setUser } from "../../../utils/tokenManager";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: LOGIN,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          setToken(data.token);
          setRole(data.admin.role);
          setUser(JSON.stringify(data.admin));

          dispatch(setCredentials({ user: data.admin, token: data.token }));
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
    logout: builder.mutation({
      queryFn: async (_, { dispatch }) => {
        dispatch(logOut());
        handleLogoutUser(navigate);
        return { data: { success: true } };
      },
    }),
    verifyEmail: builder.mutation({
      query: (code) => {
        return {
          url: VERIFY_EMAIL,
          method: "POST",
          body: code,
        };
      },
    }),
    resendVerificationEmail: builder.mutation({
      query: () => {
        return {
          url: EMAIL_VERIFICATION,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
} = authApiSlice;
