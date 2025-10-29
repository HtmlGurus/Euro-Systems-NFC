import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
  loadingAdmins: false,
};

const adminSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setLoadingAdmins: (state, action) => {
      state.loadingAdmins = action.payload;
    },
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
  },
});

export const { setLoadingAdmins, setAdmins } = adminSlice.actions;

export default adminSlice.reducer;
