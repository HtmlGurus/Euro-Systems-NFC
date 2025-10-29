import { DEPARTMENT, DEPARTMENT_DROPDOWN } from "../../../api/apiEndPoints";
import { apiSlice } from "../../../api/apiSlice";

export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDepartment: builder.mutation({
      query: (formData) => ({
        url: DEPARTMENT,
        method: "POST",
        body: formData,
      }),
    }),

    getDepartment: builder.query({
      query: ({ page = "", limit = "", sort_order = "desc", search = "" }) => ({
        url: DEPARTMENT,
        params: { page, limit, sort_order, search },
        method: "GET",
      }),
    }),

    getDepartmentDropdown: builder.query({
      query: () => ({
        url: DEPARTMENT_DROPDOWN,
        method: "GET",
      }),
    }),

    updateDepartment: builder.mutation({
      query: (formData) => {
        const id = formData.get("id");
        if (!id) {
          throw new Error("Department ID is required for update");
        }

        return {
          url: `${DEPARTMENT}/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),

    deleteDepartment: builder.mutation({
      query: ({ id }) => ({
        url: `${DEPARTMENT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddDepartmentMutation,
  useGetDepartmentQuery,
  useLazyGetDepartmentQuery,
  useLazyGetDepartmentDropdownQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApiSlice;
