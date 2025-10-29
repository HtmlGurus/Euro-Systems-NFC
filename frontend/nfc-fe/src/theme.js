import { createTheme } from "@mui/material/styles";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    smLarge: 680,
    md: 900,
    mdS: 1000,
    mdLarge: 1025,
    lg: 1200,
    xl: 1536,
  },
};

const palette = {
  mode: "light",

  primary: {
    main: "#375DFB",
    dark: "#213795",
    light: "#64b5f6",
    contrastText: "#FFFFFF",
  },

  secondary: {
    main: "#3B5B82",
    light: "#F6F8FA",
    dark: "#2C2B2B",
    contrastText: "#FFFFFF",
  },

  error: {
    main: "#DF1C41",
    contrastText: "#FFFFFF",
  },

  info: {
    main: "#1570EF",
    contrastText: "#FFFFFF",
  },

  success: {
    main: "#4caf50",
    contrastText: "#FFFFFF",
  },

  warning: {
    main: "#ff9800",
    contrastText: "#000000",
  },

  text: {
    primary: "#0A0D14",
    secondary: "#525866",
    disabled: "#A8ABB3",
  },

  background: {
    default: "#FFFFFF",
    paper: "#FAFAFA",
  },

  action: {
    selected: "#2684FC",
    disabled: "#A8ABB3",
    disabledBackground: "#D9D9D9",
  },

  divider: "#E2E4E9",
};

const typography = {
  fontFamily: "Poppins, sans-serif",

  h1: {
    fontSize: "1.75rem",
    lineHeight: "100%",
    fontWeight: 600,
  },

  h2: {
    fontSize: "1.5625rem",
    lineHeight: "24px",
    fontWeight: 500,
  },

  h3: {
    fontSize: "1.5rem",
    lineHeight: "32px",
    fontWeight: 500,
  },

  h4: {
    fontSize: "1.3125rem",
    lineHeight: "normal",
    fontWeight: 600,
  },

  h5: {
    fontSize: "1.125rem",
    lineHeight: "24px",
    fontWeight: 500,
  },

  h6: {
    fontSize: "1.0825rem",
    lineHeight: "16.6px",
    fontWeight: 600,
  },

  subtitle1: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
  },

  subtitle2: {
    fontSize: "0.8125rem",
    lineHeight: 1.6,
  },

  body1: {
    fontSize: "1rem",
    lineHeight: 1.6,
  },

  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
  },

  button: {
    fontSize: "1rem",
    fontWeight: 600,
    textTransform: "none",
    lineHeight: "100%",
  },

  caption: {
    fontSize: "0.75rem",
    lineHeight: 1.4,
  },

  overline: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    lineHeight: 1.4,
  },

  tableName: {
    fontSize: "0.825rem",
    lineHeight: "19.6px",
    fontWeight: 400,
  },
};

const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: "none",
        boxShadow: "none",
      },

      containedPrimary: {
        background:
          "linear-gradient(180deg, #375DFB -74.48%, #213795 137.83%), #1570EF",
        color: "#FCFCFD",

        "&:hover": {
          background:
            "linear-gradient(180deg, #2F4FDB -74.48%, #1B2D7F 137.83%), #1259D6",
        },

        "&.Mui-disabled": {
          background:
            "linear-gradient(180deg, rgba(55, 93, 251, 0.4) -74.48%, rgba(33, 55, 149, 0.4) 137.83%), rgba(21, 112, 239, 0.4)",
          color: "rgba(252, 252, 253, 0.5)",
        },
      },

      containedSecondary: {
        backgroundColor: "#3B5B82",
        color: "#FFFFFF",
      },

      containedError: {
        backgroundColor: "#DF1C41",
        color: "#FFFFFF",

        "&:hover": {
          backgroundColor: "#C21736",
          color: "#FFFFFF",
        },

        "&.Mui-disabled": {
          backgroundColor: "#F4B7C2",
          color: "#FFFFFF",
        },
      },

      containedInfo: {
        backgroundColor: "#F6F8FA",
        border: "1px solid #E2E4E9",
        color: "#2684FC",
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: "#344054",
        fontSize: "1rem",
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        color: "#344054",
      },
      input: {
        "&::placeholder": {
          color: "#98A2B3",
          opacity: 1,
        },
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: "outlined",
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        borderColor: "#D0D5DD",
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
      },
    },
  },

  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: "16px",
        paddingRight: "16px",
        [`@media (min-width:${breakpoints.values.md}px)`]: {
          paddingLeft: "24px",
          paddingRight: "24px",
        },
      },
    },
  },
};

const shape = {
  borderRadius: 8,
};

const shadows = [
  "none",
  "0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)",
  "0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)",
  "0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)",
  ...Array(22).fill("0px 4px 20px rgba(0,0,0,0.1)"),
];

const theme = createTheme({
  breakpoints,
  palette,
  typography,
  components,
  shape,
  shadows,
});

export default theme;
