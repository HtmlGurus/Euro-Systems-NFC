import {
  ADMIN,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
} from "../../../api/apiEndPoints";

import { apiSlice } from "../../../api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAdmin: builder.mutation({
      query: (body) => {
        const formData = new FormData();

        for (const key in body) {
          if (body[key] !== undefined && body[key] !== null) {
            if (key === "image" && body[key] instanceof File) {
              formData.append("image", body[key]);
            } else {
              formData.append(key, body[key]);
            }
          }
        }

        return {
          url: ADMIN,
          method: "POST",
          body: formData,
        };
      },
    }),
    getAdmin: builder.query({
      query: ({ page = 1, limit = 10, sort_order = "desc", search = "" }) => ({
        url: ADMIN,
        params: { page, limit, sort_order, search },
        method: "GET",
      }),
    }),
    updateAdmin: builder.mutation({
      query: ({ body, id }) => {
        const formData = new FormData();

        for (const key in body) {
          if (body[key] !== undefined && body[key] !== null) {
            if (key === "image" && body[key] instanceof File) {
              formData.append("image", body[key]);
            } else {
              formData.append(key, body[key]);
            }
          }
        }

        return {
          url: `${ADMIN}/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    deleteAdmin: builder.mutation({
      query: ({ id }) => {
        return {
          url: `${ADMIN}/${id}`,
          method: "DELETE",
        };
      },
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `${CHANGE_PASSWORD}`,
        method: "PUT",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admins/${id}/reset-password`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
} = adminApiSlice;
