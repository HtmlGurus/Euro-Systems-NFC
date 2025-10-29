import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyProfile: null,
  loadingCompanyProfile: false,
};

const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState,
  reducers: {
    setLoadingCompanyProfile: (state, action) => {
      state.loadingCompanyProfile = action.payload;
    },
    setCompanyProfile: (state, action) => {
      state.companyProfile = action.payload;
    },
  },
});

export const { setCompanyProfile, setLoadingCompanyProfile } =
  companyProfileSlice.actions;

export default companyProfileSlice.reducer;
