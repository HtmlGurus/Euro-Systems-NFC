import { Box, Grid, Typography } from "@mui/material";
import { OURSOLUTION, OURSOLUTIONS } from "../../../constants/Details";
import { gridContainer, listItem, sectionHeading } from "../styles";

const OurSolutions = ({ isMobile }) => {
  return (
    <>
      <Typography variant="h6" sx={sectionHeading}>
        {OURSOLUTION}
      </Typography>

      <Grid container spacing={{ xs: 2, lg: 2.2 }} sx={gridContainer}>
        {OURSOLUTIONS.map((el, i) => (
          <Grid size={{ xs: 12, smLarge: 6 }} key={i}>
            <Box
              display="flex"
              alignItems="center"
              gap={{ xs: 1.625, lg: 2.625 }}
            >
              {isMobile ? (
                <Box
                  component="img"
                  src={el.iconMobile}
                  alt={el.details}
                  sx={{
                    width: "54px",
                    height: "54px",
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src={el.icon}
                  alt={el.details}
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              )}
              <Typography
                sx={{
                  ...listItem,
                  "@media(max-width: 374px)": {
                    fontSize: 11,
                  },
                }}
              >
                {el.details}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OurSolutions;
