import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  loadingDepartments: false,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setLoadingDepartments: (state, action) => {
      state.loadingDepartments = action.payload;
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
});

export const { setLoadingDepartments, setDepartments } =
  departmentSlice.actions;

export default departmentSlice.reducer;
