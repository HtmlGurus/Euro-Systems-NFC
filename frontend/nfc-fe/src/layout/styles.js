// LAYOUT
const layoutContainer = {
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
};

const layoutChildrenContainer = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
};

const layoutMainContainer = {
  flexGrow: 1,
  overflowY: "auto",
  height: "calc(100vh - 70px)",
};

// SIDEBAR
const linkListContainer = {
  paddingTop: "0px !important",
  paddingBottom: "0px !important",
};

const linkItemButton = (theme, isActive) => ({
  justifyContent: "flex-start",
  padding: "13px 16px",
  color: isActive ? theme.palette.action.selected : "#324054",
  backgroundColor: isActive ? "#E8EDFF" : "transparent",
  margin: "0px 24px 16px 19px",
  borderRadius: "5px",
  maxHeight: "48px",
  transition: "all 0.3s ease",

  "& span": {
    lineHeight: "22.2px",
    fontSize: "17.32px",
    fontWeight: isActive ? 500 : 300,
  },

  ":hover": {
    backgroundColor: "#E8EDFF",
    color: theme.palette.action.selected,

    "& span": {
      fontWeight: 500,
    },
  },
});

const linkItemIcon = {
  minWidth: 0,
  justifyContent: "center",
  marginRight: "6.5px",
};

const logoutItemButton = (theme) => ({
  justifyContent: "flex-start",
  padding: "13px",
  color: theme.palette.error.main,
  margin: "0px 24px 13px 19px",
  backgroundColor: "transparent !important",

  "& span": {
    lineHeight: "22.2px",
    fontSize: "17.32px",
    fontWeight: 500,
  },
});

const logoutItemIcon = {
  minWidth: 0,
  justifyContent: "center",
  marginRight: "17px",
};

const drawerContainer = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const toolbar = {
  paddingLeft: "0px !important",
  paddingRight: "0px !important",
  minHeight: "auto !important",
  margin: "8px 0px 29px 36px",
};

const temporaryDrawerPaper = {
  borderRadius: 0,
  backgroundColor: "#FFFFFF",
};

const permanentDrawerPaper = {
  transition: "width 0.3s",
  overflowX: "hidden",
  height: "100vh",
  backgroundColor: "#FFFFFF",
  border: 1,
  borderColor: "divider",
  borderRadius: 0,
};

// HEADER
const appBar = {
  borderBottom: 1,
  borderColor: "divider",
  borderRadius: 0,
  boxShadow: "none",
  backgroundColor: "#ffffff",
  top: 0,
  left: 0,
};

const headerToolbar = {
  minHeight: "69px !important",
  width: "100%",
  paddingLeft: "20px !important",
  paddingRight: "20px !important",
};

const formOpenButton = (theme) => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  background: `${theme.palette.secondary.light} !important`,
  border: 1,
  borderColor: "divider",
  padding: "6.5px 12px 6.5px 6px",
});

const avatarContainer = {
  width: "33px",
  height: "33px",
  borderRadius: "50%",
  borderColor: "#000000",
  border: 1,
  marginRight: "4.5px",

  "& img": {
    borderRadius: "50%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

const typographyOrg = {
  color: "#000000",
  fontSize: "13px",
  lineHeight: "14px",
  fontWeight: 500,
};

const typographyRole = {
  color: "#78858F",
  fontSize: "10px",
  lineHeight: "11px",
  textAlign: "left",
};

const dropdownContainer = {
  width: "18px",
  height: "18px",
  backgroundColor: "#E6EDF9",
  borderRadius: "50%",
  borderColor: "#000000",
  border: 1,
  marginRight: "4.5px",
};

export {
  // LAYOUT
  layoutContainer,
  layoutChildrenContainer,
  layoutMainContainer,
  // SIDEBAR
  linkListContainer,
  linkItemButton,
  linkItemIcon,
  logoutItemButton,
  logoutItemIcon,
  drawerContainer,
  toolbar,
  temporaryDrawerPaper,
  permanentDrawerPaper,
  // HEADER
  appBar,
  headerToolbar,
  formOpenButton,
  avatarContainer,
  typographyOrg,
  typographyRole,
  dropdownContainer,
};
