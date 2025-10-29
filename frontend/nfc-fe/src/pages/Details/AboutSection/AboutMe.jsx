import { Box, Typography } from "@mui/material";

import { ABOUT } from "../../../constants/Details";

import { sectionDetails, sectionDetailsBox, sectionHeading } from "../styles";

const AboutMe = ({ data, currentEmployee }) => {
  return (
    <>
      <Typography variant="h6" sx={sectionHeading}>
        {ABOUT}
      </Typography>

      <Box sx={sectionDetailsBox}>
        <Typography variant="body2" color="secondary.dark" sx={sectionDetails}>
          {currentEmployee?.about_me || "N/A"}
        </Typography>
      </Box>
    </>
  );
};

export default AboutMe;
