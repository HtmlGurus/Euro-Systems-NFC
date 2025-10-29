const mainContainer = (isMobile) => ({
  height: isMobile ? "100vh" : "100%",
  backgroundColor: isMobile ? "#E9E7E7" : "#ffffff",
  overflowY: isMobile ? "auto" : "unset",
});

const desktopImageBox = {
  "& img": {
    width: "100%",
    height: { xs: "180px", md: "222px" },
    border: "1px solid #2684FC",
    borderRadius: 1,
    objectFit: "cover",
    objectPosition: "center center",
  },
};

const title = {
  letterSpacing: "-0.015em",
  color: "#000000",
  fontSize: { xs: "20px", sm: "25px" },

  "@media (max-width:375px)": {
    fontSize: "19px",
  },
};

const department = {
  letterSpacing: "-0.015em",
  color: "#606061",
  fontSize: { xs: "13px", sm: "15px" },
};

const switchButtonsContainer = {
  flexDirection: "row",
  backgroundColor: "action.disabledBackground",
  borderRadius: 1.5,
  width: {
    xs: "fit-content",
    smLarge: "285px",
    md: "341px",
  },
};

const switchButtons = {
  fontSize: {
    xs: "10px",
    smLarge: "13px",
    md: "17px",
  },
  lineHeight: {
    xs: "24px",
    sm: "26px",
    smLarge: "29px",
  },
  textWrap: "noWrap",
  fontWeight: 500,
  borderRadius: 1.5,
};

const aboutButton = (isAbout) => ({
  backgroundColor: isAbout ? "#3B5B82" : "transparent",
  color: isAbout ? "#ffffff" : "action.disabled",
  padding: {
    xs: "6px 30px",
  },

  "@media (max-width:374px)": {
    padding: "6px 14px",
  },
});

const companyButton = (isAbout) => ({
  backgroundColor: !isAbout ? "#3B5B82" : "transparent",
  color: !isAbout ? "#ffffff" : "action.disabled",
  "@media (max-width:374px)": {
    padding: "6px 15px",
  },
});

const sectionHeading = {
  color: "#000000",
  marginBottom: "20px",
  letterSpacing: "-0.015em",
};

const sectionDetailsBox = {
  // width: { xs: "100%" },
};

const sectionDetails = {
  fontSize: "12.2px",
  letterSpacing: "-0.015em",
  "@media(min-width: 320px) and (max-width: 374px)": {
    fontSize: "10.5px",
  },
  "@media(min-width: 280px) and (max-width: 319px)": {
    fontSize: "10.5px",
  },
};

const contactListContainer = {
  flexDirection: "row",
  alignItems: "center",
  gap: { xs: "18px", md: "20px" },
  "@media(max-width: 319px)": {
    gap: "13.5px",
  },
};

const contactListIcon = (el) => ({
  width: "24px",
  display: "flex",
  alignSelf: "center",
  "& img": {
    display: "flex",
    alignSelf: "center",
    margin: "auto",
    filter:
      "invert(31%) sepia(12%) saturate(1382%) hue-rotate(174deg) brightness(91%) contrast(90%)",
    width: "fit-content",
    height: el.key === "phone_number" ? "32px" : "23px",

    "@media(min-width:320px) and (max-width: 375px)": {
      height: el.key === "phone_number" ? "28.5px" : "23px",
    },

    "@media(max-width: 319px)": {
      height: el.key === "phone_number" ? "27.3px" : "20px",
    },
  },
});

const listItem = {
  color: "#48494A",
  fontSize: "12.8px",
  letterSpacing: "-0.015em",
  fontWeight: 600,
  lineHeight: "20px",
  maxWidth: "210px",
  wordBreak: "break-all",
  whiteSpace: "normal",
  overflowWrap: "anywhere",
  "@media(min-width: 300px) and (max-width: 374px)": {
    fontSize: { xs: "clamp(10.2px, 1vw, 11px)", sm: "12.2px" },
  },
  "@media(max-width: 319px)": {
    fontSize: { xs: "clamp(10px, 1vw, 11px)", sm: "12.8px" },
    lineHeight: "15px",
  },
};

const gridContainer = {
  width: { xs: "100%" },

  "@media (min-width:786px)": {
    width: "400px",
  },
};

const ourSolutions = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  backgroundColor: "rgba(39, 43, 49, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
};

const mobileTopContainer = {
  backgroundColor: "#ffffff",
  borderRadius: "9px",
  padding: "30px 18px 27px 18px",
};

const mobileBottomContainer = {
  backgroundColor: "#ffffff",
  borderRadius: "9px",
  padding: { xs: "54px 26px 50px 33px", md: "54px 29px 50px 34px" },
  "@media(max-width: 319px)": {
    padding: "54px 26px 50px 26px",
  },
};

const mobileDetailsContainer = {
  flexDirection: "row",
  marginBottom: "25px",
  justifyContent: "center",
  alignItems: "center",
};

const mobileTitleContainer = {
  width: "100%",
  textAlign: "center",
  px: 1.2,
};

const mobileImageBox = {
  mx: "auto",
  width: "135px",
  height: "135px",
  borderRadius: "50%",

  "@media (max-width:399px)": {
    width: "110px",
    height: "110px",
  },

  "@media (max-width:375px)": {
    width: "95px",
    height: "95px",
  },

  "& img": {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  },
};

const mobileIconsContainer = {
  display: "flex",
  justifyContent: "center",
  marginTop: "25px",
};

const mobileButtonsContainer = {
  display: "flex",
  justifyContent: "center",
  position: "relative",
  top: "-13px",
};

const footerContainer = {
  marginLeft: "9px",
  maxWidth: "450px",
  mx: { xs: "auto", smLarge: 0 },
};

const footerButton = {
  padding: "10px 22px",
  fontSize: "12px",
  display: "block",
  margin: { xs: "22px auto 20px", smLarge: "0px 0px 22px auto" },
};

const footerLogo = { margin: { xs: "auto", smLarge: "0px" } };

const partnersContainer = {
  marginLeft: "10px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: { xs: "center", smLarge: "normal" },
  gap: 1,
};

const partnersItem = {
  lineHeight: "24px",
  letterSpacing: "-0.015em",
  color: "#48494A",
  textTransform: "uppercase",
  mr: 1,
};

const partnersBorder = {
  width: "1px",
  height: 12,
  backgroundColor: "#48494A",
  border: "none",
};

export {
  mainContainer,
  desktopImageBox,
  title,
  department,
  switchButtonsContainer,
  switchButtons,
  aboutButton,
  companyButton,
  sectionHeading,
  sectionDetailsBox,
  sectionDetails,
  contactListContainer,
  contactListIcon,
  listItem,
  gridContainer,
  ourSolutions,
  mobileTopContainer,
  mobileBottomContainer,
  mobileDetailsContainer,
  mobileTitleContainer,
  mobileImageBox,
  mobileIconsContainer,
  mobileButtonsContainer,
  footerContainer,
  footerButton,
  footerLogo,
  partnersContainer,
  partnersItem,
  partnersBorder,
};
