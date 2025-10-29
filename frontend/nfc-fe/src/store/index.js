import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth/authSlice";
import departmentSlice from "./slices/department/departmentSlice";
import employeeSlice from "./slices/employee/employeeSlice";
import companyProfileSlice from "./slices/companyProfile/companyProfileSlice";
import adminSlice from "./slices/admin/adminSlice";

import { apiSlice } from "../api/apiSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  department: departmentSlice,
  employee: employeeSlice,
  company: companyProfileSlice,
  admin: adminSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export { store };
