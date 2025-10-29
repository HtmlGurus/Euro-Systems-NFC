import { LoginBG } from "../../../assets/images/pngs";

const fullContainer = {
  height: "100%",
  width: "100%",
};

const container = {
  ...fullContainer,
  backgroundColor: "#192857",
};

const backgroundImage = {
  ...fullContainer,
  background: `url(${LoginBG}) no-repeat center center / cover`,
};

const form = {
  flexDirection: "column",
  padding: "48px 72px",
  gap: "32px",
  width: "100%",
  maxWidth: "540px",
  height: "auto",
  background: "#FFFFFF",
  borderRadius: "20px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",

  "@media only screen and (max-width:768px)": {
    padding: "32px 24px",
    width: "85%",
    maxWidth: "85%",
    gap: "24px",
  },
};

export { container, backgroundImage, form };
