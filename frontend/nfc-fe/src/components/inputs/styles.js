const input = { fontSize: "14px", lineHeight: "100%" };
const fieldset = {
  borderColor: "inherit !important",
  boxShadow: "none",
};
const root = (error) => ({
  borderColor: error ? "#DF1C41" : "#D0D5DD",

  "& input": {
    ...input,
    height: "auto",
    padding: "13.5px 16px",
  },

  "& fieldset": fieldset,
});

const container = (error) => ({
  "& .MuiOutlinedInput-root": root(error),
});

const linkContainer = {
  display: "flex",
  justifyContent: "space-between",
};

const link = {
  color: "#1570EF",
  lineHeight: "100%",
};

const searchInput = {
  width: "293px",

  "& input": {
    padding: "8.5px 11px 8.5px 0px",
    fontSize: "13px",
    lineHeight: "20px",
    letterSpacing: "-0.015em",
    color: "#525866",
  },

  "& fieldset": {
    borderColor: "#E2E4E9 !important",
  },

  "@media (max-width:374px)": {
    width: "100%",
  },
};

const iconButton = {
  padding: 0,
};

const dateInput = (error) => ({
  width: "100%",

  "& .MuiPickersInputBase-root": {
    padding: "0px 16px",
    borderColor: error ? "#DF1C41" : "#D0D5DD",
    "& fieldset": fieldset,
  },

  "& .MuiPickersSectionList-root": {
    ...input,
    padding: "13.5px 0px",
    height: "48px",
  },
});

const selectInputRoot = (error) => ({
  ...root(error),
  height: "48px",
  width: "100%",

  "& .MuiSelect-select": {
    ...input,
    minHeight: "auto !important",
  },
});

const menuItem = { fontSize: "14px", lineHeight: "100%", color: "#344054" };

const inputPlaceholder = {
  fontSize: "14px",
  lineHeight: "100%",
  color: "#98A2B3",
};

const errorText = {
  fontSize: "12px",
  lineHeight: 1.4,
  margin: "3px 14px 0px",
};

export {
  container,
  linkContainer,
  link,
  searchInput,
  iconButton,
  dateInput,
  selectInputRoot,
  menuItem,
  inputPlaceholder,
  errorText,
};
