const slidePopoverPaper = {
  overflow: "visible",
  boxShadow: "none",
  p: 0,
  backgroundColor: "transparent",
  border: "none",
  marginLeft: -1.5,
  marginTop: 2,
};

const slidePopoverBox = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  p: "12px 14px",
  width: 165,
  backgroundColor: "#ffffff",
  borderRadius: 2,
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
};

const slidePopoverButtons = {
  fontSize: "14px",
  p: 0,
  backgroundColor: "transparent",
  width: "fit-content",
  alignSelf: "center",
  fontWeight: 400,
};

const slidePopoverEditButton = {
  color: "text.secondary",
};

const formDialogPaper = {
  boxShadow: "none",
  border: 1,
  borderColor: "divider",
  width: "100%",
  maxWidth: { xs: "85%", smLarge: "450px" },
  maxHeight: "700px",
  margin: 0,
  filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
};

const formDialogHeading = {
  letterSpacing: "-0.015em",
  textTransform: "uppercase",
};

const formDialogContent = {
  padding: 0,
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const smallDialogPaper = {
  boxShadow: "none",
  border: 1,
  borderColor: "divider",
  width: "100%",
  maxWidth: { xs: "85%", md: "400px" },
  margin: 0,
  filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
  padding: 3,
};

const smallDialogContent = { padding: 0 };

const smallDialogButtonsContainer = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "14px",
};

const smallDialogButtonIcon = {
  padding: "6px 0px 0px",
  marginLeft: "6px",
  cursor: "default",
};

const smallDialogCrossButtonIcon = {
  padding: 0,
  backgroundColor: "#F7F9FB",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
};

const smallDialogActionButton = { fontWeight: 400, padding: "12px 16px" };

export {
  slidePopoverPaper,
  slidePopoverBox,
  slidePopoverButtons,
  slidePopoverEditButton,
  formDialogPaper,
  formDialogHeading,
  formDialogContent,
  smallDialogPaper,
  smallDialogContent,
  smallDialogButtonsContainer,
  smallDialogButtonIcon,
  smallDialogCrossButtonIcon,
  smallDialogActionButton,
};
