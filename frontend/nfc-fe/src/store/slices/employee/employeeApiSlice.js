import {
  EMPLOYEE,
  EMPLOYEE_REPORTS,
  GET_ALL_DEPARTMENTS,
  GET_ALL_EMPLOYEES,
} from "../../../api/apiEndPoints";

import { apiSlice } from "../../../api/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEmployee: builder.mutation({
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
          url: EMPLOYEE,
          method: "POST",
          body: formData,
        };
      },
    }),
    getEmployee: builder.query({
      query: ({ page = 1, limit = 10, sort_order = "desc", search = "" }) => ({
        url: EMPLOYEE,
        params: { page, limit, sort_order, search },
        method: "GET",
      }),
    }),
    getEmployeeById: builder.query({
      query: (id) => ({
        url: `${EMPLOYEE}/${id}`, 
        method: "GET",
      }),
    }),

    updateEmployee: builder.mutation({
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
          url: `${EMPLOYEE}/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    deleteEmployee: builder.mutation({
      query: ({ id }) => {
        return {
          url: `${EMPLOYEE}/${id}`,
          method: "DELETE",
        };
      },
    }),
    getAllEmployees: builder.query({
      query: () => {
        return {
          url: GET_ALL_EMPLOYEES,
          method: "GET",
        };
      },
    }),
    getAllDepartments: builder.query({
      query: () => {
        return {
          url: GET_ALL_DEPARTMENTS,
          method: "GET",
        };
      },
    }),
    getAllReports: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: EMPLOYEE_REPORTS,
        params: { page, limit, search },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useGetEmployeeQuery,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetAllDepartmentsQuery,
  useGetAllEmployeesQuery,
  useGetAllReportsQuery,
} = employeeApiSlice;
