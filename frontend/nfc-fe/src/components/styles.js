const submitButton = {
  padding: "18px 0px",
  height: "auto",
};

// CARD
const cardContainer = (loading) => ({
  display: "flex",
  gap: { xs: 3, sm: 5.5 },
  p: loading ? 0 : { xs: "18px 21px", xl: "18px 29px" },
  borderRadius: 1,
  border: 1,
  borderColor: "divider",
  width: { xs: "100%", xl: "85%" },
  height: { xs: "171px", xl: "171px" },
  justifyContent: "space-between",
  boxShadow: "none",
  transition: "box-shadow 0.3s ease-in-out",
  backgroundColor: "#ffffff",
  cursor: "pointer",

  ":hover": {
    boxShadow:
      "124px 126px 71px rgba(0, 0, 0, 0.01), 70px 71px 60px rgba(0, 0, 0, 0.02), 31px 32px 44px rgba(0, 0, 0, 0.04), 8px 8px 24px rgba(0, 0, 0, 0.04), 0px 0px 0px rgba(0, 0, 0, 0.04)",
  },

  "@media (max-width:475px)": {
    flexDirection: "column-reverse",
    height: loading ? "220px" : "auto",
    alignItems: "center",
  },
});

const leftBoxContainer = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  placeItems: "baseline",

  "@media (max-width:475px)": {
    alignItems: "center",
    width: "100%",
  },
};

const leftBoxIconContainer = {
  borderRadius: "50%",
  width: { xs: "65px", xl: "75px" },
  height: { xs: "65px", xl: "75px" },
  mb: 1,

  "@media (max-width:375px)": {
    margin: "0px auto 8px",
  },
};

const leftBoxSubtitle = {
  lineHeight: "100%",
  fontWeight: 400,
  color: "#1C1C1E",
  letterSpacing: "-0.01em",
  marginTop: "8px",
};

const rightBoxContainer = {
  width: "232px",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@media (max-width:475px)": {
    height: "100px",
  },
};

const rightBoxCount = {
  fontSize: { xs: "75px", lg: "89px" },
  color: "action.selected",
};

// TABLE
const tableBoxContainer = {
  padding: { xs: "26px 22px", sm: "30px 28px", md: "37px 40px" },
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const tableStackContainer = {
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "space-between",
  alignItems: { xs: "stretch", sm: "center" },
  marginBottom: 2,
  gap: 2,
};

const tableContainer = {
  backgroundColor: "background.default",
  border: "none",
  borderRadius: 0,
  flex: 1,
};

const tableHeaderCell = {
  color: "text.secondary",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "16px",
};

const tableBodyCell = {
  borderColor: "divider",
  color: "text.primary",
  whiteSpace: "nowrap",
};

const actionButton = {
  padding: "7.5px 20px",
  lineHeight: "20px",
  fontSize: "14px",
  letterSpacing: "-0.015em",
  fontWeight: 400,

  ":hover": {
    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
  },
};

const checkbox = {
  backgroundColor: "transparent !important",

  "& svg": {
    width: "19px",
    height: "19px",
  },
};

// PAGINATION
const paginationContainer = {
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 4,
  borderBottom: 1,
  borderColor: "divider",
  gap: 2,
};

const pageRowHeading = {
  fontSize: "12px",
  color: "#868C98",
};

const pageRowDropdown = {
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 500,
  color: "#868C98",

  "& fieldset": {
    borderColor: "#E2E8F0 !important",
  },
};

const pageChangeButton = {
  color: "#868C98",
  gap: 1.625,
  border: 1,
  borderColor: "#E2E8F0",
  borderRadius: "6px",
  background: "#ffffff",
  padding: "5px 11px",
};

const pageChangeHeading = {
  fontSize: "12px",
  fontWeight: 500,
};

const paginationNumber = (page, p) => {
  return {
    fontSize: "12px",
    color: page === p ? "#09090B" : "#868C98",
    minWidth: "31px",
    background: page === p ? "#EEEEF1" : "tranparent",
    borderRadius: "6px",
    border: "none",
    padding: "8px 10px",
    fontWeight: 500,

    ":hover": {
      background: "#EEEEF1",
      color: "#09090B",
    },
  };
};

// FORM
const label = {
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
  color: "#525866",
};

const formLayoutButton = {
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "24px",
  padding: "13px 12px",
  textTransform: "capitalize",
};

// MENU
const menuPaper = {
  boxShadow: "none",
  border: 1,
  borderColor: "divider",
  width: { xs: "85%", smLarge: "450px" },
  height: "700px",
  mt: 1,
  ml: -1,
  filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
  scrollbarWidth: "none",

  "&::-webkit-scrollbar": {
    display: "none",
  },
};

export {
  submitButton,
  // CARD
  cardContainer,
  leftBoxContainer,
  leftBoxIconContainer,
  leftBoxSubtitle,
  rightBoxContainer,
  rightBoxCount,
  // TABLE
  tableBoxContainer,
  tableStackContainer,
  tableContainer,
  tableHeaderCell,
  tableBodyCell,
  actionButton,
  checkbox,
  // PAGINATION
  paginationContainer,
  pageRowHeading,
  pageRowDropdown,
  pageChangeButton,
  pageChangeHeading,
  paginationNumber,
  // FORM
  label,
  formLayoutButton,
  // MENU
  menuPaper,
};
