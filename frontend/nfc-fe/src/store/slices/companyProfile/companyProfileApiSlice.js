import { COMPANY_PROFILE } from "../../../api/apiEndPoints";

import { apiSlice } from "../../../api/apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCompany: builder.mutation({
      query: (body) => {
        const formData = new FormData();

        for (const key in body) {
          if (body[key] !== undefined && body[key] !== null) {
            if (key === "profile_image" && body[key] instanceof File) {
              formData.append("profile_image", body[key]);
            } else {
              formData.append(key, body[key]);
            }
          }
        }

        return {
          url: COMPANY_PROFILE,
          method: "POST",
          body: formData,
        };
      },
    }),
    getCompany: builder.query({
      query: () => ({
        url: COMPANY_PROFILE,
        method: "GET",
      }),
    }),
    updateCompany: builder.mutation({
      query: ({ body, id }) => {
        const formData = new FormData();

        for (const key in body) {
          if (body[key] !== undefined && body[key] !== null) {
            if (key === "profile_image" && body[key] instanceof File) {
              formData.append("profile_image", body[key]);
            } else {
              formData.append(key, body[key]);
            }
          }
        }

        return {
          url: COMPANY_PROFILE,
          method: "PATCH",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useAddCompanyMutation,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} = companyApiSlice;
