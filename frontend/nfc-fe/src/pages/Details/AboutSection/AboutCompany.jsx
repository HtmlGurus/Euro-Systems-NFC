import { Box, Typography } from "@mui/material";

import { COMPANY } from "../../../constants/Details";

import { sectionDetails, sectionDetailsBox, sectionHeading } from "../styles";

const AboutCompany = ({ data }) => {
  return (
    <>
      <Typography variant="h6" sx={sectionHeading}>
        {COMPANY}
      </Typography>

      <Box sx={sectionDetailsBox}>
        <Typography variant="body2" color="secondary.dark" sx={sectionDetails}>
          {data?.details ||
            `Founded in 2007 by Mr. Mohamed Fiaz Khazi. Euro Systems is a systems solution provider in the Doors and windows, Architectural systems, Outdoor shading, Interior shades, Acoustic solutions and aluminum and glazing industry.`}
        </Typography>
      </Box>
    </>
  );
};

export default AboutCompany;
