import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  loadingEmployees: false,
  employeeById: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setLoadingEmployees: (state, action) => {
      state.loadingEmployees = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setEmployeeById: (state, action) => {
      state.employeeById = action.payload;
    },
  },
});

export const { setLoadingEmployees, setEmployees, setEmployeeById } =
  employeeSlice.actions;

export default employeeSlice.reducer;
