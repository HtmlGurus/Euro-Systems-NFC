const companyProfileContainer = (preview, error) => ({
  width: "143px",
  height: "143px",
  border: `2px ${preview ? "solid" : "dashed"} ${
    error ? "#DF1C41" : "rgba(0, 0, 0, 0.13)"
  }`,
  borderRadius: "50%",
  boxShadow: "inset 0px 0px 0px 11.2896px #FFFFFF",
  margin: "auto",
  padding: 0.5,
  position: "relative",
});

const profileUploadContainer = (edit) => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  cursor: !edit ? "default" : "pointer",
  position: "relative",
  opacity: !edit ? "0.7" : "1",
});

const avatar = { width: "100%", height: "100%" };

const headingBox = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#999",
  fontSize: 14,
};

const headingBoxIcon = { position: "absolute", opacity: 0.1, width: "50px" };

const heading = { position: "relative", zIndex: 1, color: "#A2A6B0" };

const filledEdit = {
  width: "39px",
  height: "39px",
  position: "absolute",
  cursor: "pointer",
  right: "10px",
  bottom: "-7px",
  borderRadius: "50%",
  backgroundColor: "#1C274C",
};

const profileContainer = (
  preview,
  error,
  isThisFieldCropping = false,
  fieldName = ''
) => ({
  width: "100%",
  height:
    fieldName === "banner_image" && isThisFieldCropping ? "178px" : "134px",
  border: `1px ${preview ? "solid" : "dashed"} ${
    error ? "#DF1C41" : "rgba(0, 0, 0, 0.13)"
  }`,
  borderRadius: 1,
});

const profileAvatar = {
  width: "100%",
  height: "100%",
  borderRadius: 0,
  padding: 0.5,

  "& img": {
    borderRadius: 1,
  },
};

export {
  companyProfileContainer,
  profileUploadContainer,
  avatar,
  headingBox,
  headingBoxIcon,
  heading,
  filledEdit,
  profileContainer,
  profileAvatar,
};
