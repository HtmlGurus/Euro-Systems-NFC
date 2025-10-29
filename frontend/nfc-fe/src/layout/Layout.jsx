import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Header from "./Header";

import { useGetCompanyQuery } from "../store/slices/companyProfile/companyProfileApiSlice";

import {
  setCompanyProfile,
  setLoadingCompanyProfile,
} from "../store/slices/companyProfile/companyProfileSlice";

import { getToken } from "../utils/tokenManager";

import {
  layoutChildrenContainer,
  layoutContainer,
  layoutMainContainer,
} from "./styles";
import { USER_TYPE } from "../utils/auth";

const drawerWidth = 240;

const Layout = () => {
  const token = getToken();

  const {
    data: company,
    isSuccess: isCompanySuccess,
    isLoading: isCompanyLoading,
  } = useGetCompanyQuery(null, {
    skip: !token,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingCompanyProfile(isCompanyLoading));

    if (isCompanySuccess) {
      dispatch(setCompanyProfile(company?.company_profile || null));
    }
  }, [isCompanySuccess, isCompanyLoading, company]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const callAfterCompanyCreation = () => {
    refetchDepartment();
    refetchEmployee();
  };

  return (
    <Box sx={layoutContainer}>
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        sx={{
          ...layoutChildrenContainer,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Header
          onMenuClick={handleDrawerToggle}
          refetch={callAfterCompanyCreation}
        />

        <Box component="main" sx={layoutMainContainer}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
