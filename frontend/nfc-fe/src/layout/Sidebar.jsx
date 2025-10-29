import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  useTheme,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";

import SmallDialog from "../components/dialogs/SmallDialog";

import { Logo } from "../assets/images/pngs";
import { Logout } from "../assets/images/svgs";

import { handleLogoutUser } from "../utils/auth";
import { getRole } from "../utils/tokenManager";

import { NAVITEMS } from "../constants/Sidebar";

import {
  drawerContainer,
  linkItemButton,
  linkItemIcon,
  linkListContainer,
  logoutItemButton,
  logoutItemIcon,
  permanentDrawerPaper,
  temporaryDrawerPaper,
  toolbar,
} from "./styles";

const drawerWidth = 240;
const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [logoutDialog, setLogoutDialog] = useState(false);

  const renderLinks = () => (
    <List sx={linkListContainer}>
      {NAVITEMS.LINKS.map(({ label, icon, activeIcon, path }) => {
        // Restrict Admins only to super-admin
        if (label === "Admins" && getRole() !== "super-admin") return null;

        // Restrict Account only to admin
        if (label === "Account" && getRole() !== "admin") return null;

        const isActive = location.pathname.startsWith(path);
        const isHovered = hoveredLabel === label;

        return (
          <ListItemButton
            key={label}
            component={Link}
            to={path}
            onMouseEnter={() => setHoveredLabel(label)}
            onMouseLeave={() => setHoveredLabel(null)}
            disableRipple
            sx={linkItemButton(theme, isActive)}
          >
            <ListItemIcon sx={linkItemIcon}>
              {label === "Admins" ? (
                <AdminPanelSettingsIcon
                  sx={{ color: isActive || isHovered ? "#2684FC" : "inherit" }}
                />
              ) : label === "Account" ? (
                <ManageAccountsOutlinedIcon
                  sx={{ color: isActive || isHovered ? "#2684FC" : "inherit" }}
                />
              ) : label === "Reports" ? (
                <ViewListIcon
                  sx={{ color: isActive || isHovered ? "#2684FC" : "inherit" }}
                />
              ) : (
                <img
                  src={isActive || isHovered ? activeIcon : icon}
                  alt={label}
                />
              )}
            </ListItemIcon>

            <ListItemText primary={label} />
          </ListItemButton>
        );
      })}
    </List>
  );

  const renderLogout = () => (
    <Box width={"100%"}>
      <List sx={linkListContainer}>
        <ListItemButton
          sx={logoutItemButton(theme)}
          disableRipple
          onClick={() => {
            setLogoutDialog(true);
          }}
        >
          <ListItemIcon sx={logoutItemIcon}>
            <img src={Logout} alt={NAVITEMS.LOGOUT} />
          </ListItemIcon>

          <ListItemText primary={NAVITEMS.LOGOUT} />
        </ListItemButton>
      </List>
    </Box>
  );

  const drawerContent = (
    <Box sx={drawerContainer}>
      <Box>
        <Toolbar sx={toolbar}>
          <Box component={"img"} height="45px" width="175px" src={Logo} alt="Logo" />
        </Toolbar>

        {renderLinks()}
      </Box>

      {renderLogout()}
    </Box>
  );

  const handleLogout = () => {
    handleLogoutUser(navigate);
  };

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            ...temporaryDrawerPaper,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            ...permanentDrawerPaper,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <SmallDialog
        open={logoutDialog}
        setOpen={setLogoutDialog}
        logout
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar;
