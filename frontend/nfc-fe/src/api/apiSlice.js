import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { toast } from "sonner";

import { logOut } from "../store/slices/auth/authSlice";

import { navigate } from "../utils/navigateService";
import { handleLogoutUser } from "../utils/auth";
import { getToken } from "../utils/tokenManager";

const baseURL = import.meta.env.VITE_API_BASE;

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "omit",
  prepareHeaders: (headers, { getState }) => {
    const token = getToken();

    if (token) {
      headers?.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const is401 = result?.error?.status === 401;
  const isTokenError = ["Invalid or expired token", "Invalid token"].includes(
    result?.error?.data?.error
  );

  if (is401 && isTokenError) {
    toast.error("Your session has expired. Please log in again.", {
      id: "global-error",
    });

    api.dispatch(logOut());
    handleLogoutUser(navigate);
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
});
