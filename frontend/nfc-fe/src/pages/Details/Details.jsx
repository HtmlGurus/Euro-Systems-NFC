import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import DetailsInDektop from "./DetailsInDektop";
import DetailsInMobile from "./DetailsInMobile";

import { useGetEmployeeByIdQuery } from "../../store/slices/employee/employeeApiSlice";

import { mainContainer } from "./styles";
import { useGetCompanyQuery } from "../../store/slices/companyProfile/companyProfileApiSlice";

const Details = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(768));

  const { id } = useParams();

  const {
    data: employeeData,
    isError,
    error,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetEmployeeByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const { data: profileData } = useGetCompanyQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [isAbout, setIsAbout] = useState(true);

  return (
    <Box sx={mainContainer(isMobile)}>
      {isLoading || isFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress
            sx={{
              color: "#3B5B82",
            }}
          />
        </Box>
      ) : isError && error?.data?.error !== "Invalid or expired token" ? (
        <Typography color="error">
          {error?.data?.error ||
            "Something went wrong while fetching employee details."}
        </Typography>
      ) : (
        <>
          {isMobile
            ? employeeData?.employee && (
                <DetailsInMobile
                  isAbout={isAbout}
                  setIsAbout={setIsAbout}
                  companyProfile={profileData?.company_profile}
                  currentEmployee={employeeData?.employee}
                  isMobile={isMobile}
                />
              )
            : employeeData?.employee && (
                <DetailsInDektop
                  isAbout={isAbout}
                  setIsAbout={setIsAbout}
                  currentEmployee={employeeData?.employee}
                  companyProfile={profileData?.company_profile}
                />
              )}
        </>
      )}
    </Box>
  );
};

export default Details;
