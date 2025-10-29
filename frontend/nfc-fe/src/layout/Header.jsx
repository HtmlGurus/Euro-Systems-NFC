import { useState } from "react";
import { useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  Button,
  useTheme,
  Stack,
  Skeleton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import DropdownMenuForm from "../components/DropdownMenu";

import { ColoredDownArrow } from "../assets/images/svgs";
import { User } from "../assets/images/pngs";

import { HEADER } from "../constants/Sidebar";

import {
  appBar,
  avatarContainer,
  dropdownContainer,
  formOpenButton,
  headerToolbar,
  typographyOrg,
  typographyRole,
} from "./styles";

const Header = ({ onMenuClick, refetch }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { companyProfile, loadingCompanyProfile } = useSelector(
    (state) => state.company
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const role = localStorage.getItem("role");

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1} sx={appBar}>
        <Toolbar sx={headerToolbar}>
          {isMobile && (
            <IconButton edge="start" onClick={onMenuClick}>
              <Menu />
            </IconButton>
          )}

          {role === "super-admin" && (
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={formOpenButton(theme)}
              disabled={loadingCompanyProfile}
            >
              <Box sx={avatarContainer} className="center">
                {loadingCompanyProfile ? (
                  <Skeleton variant="circular" width="100%" height="100%" />
                ) : (
                  <img
                    src={companyProfile?.profile_image["image_url"] || User}
                    alt="User"
                  />
                )}
              </Box>

              <Stack flexDirection={"column"} mr={"10px"}>
                <Typography sx={typographyOrg}>
                  {loadingCompanyProfile ? (
                    <Skeleton variant="text" width="75px" />
                  ) : (
                    companyProfile?.company_name || HEADER.cooperative
                  )}
                </Typography>

                <Typography sx={typographyRole}>
                  {loadingCompanyProfile ? (
                    <Skeleton variant="text" width="50px" />
                  ) : (
                    HEADER.admin
                  )}
                </Typography>
              </Stack>

              <Box sx={dropdownContainer} className="center">
                <img src={ColoredDownArrow} alt="User" />
              </Box>
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <DropdownMenuForm
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        refetch={refetch}
        companyProfile={companyProfile}
      />
    </>
  );
};

export default Header;
