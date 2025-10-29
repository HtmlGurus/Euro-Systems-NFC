import { Avatar, Box, Grid, useTheme, useMediaQuery } from "@mui/material";

import Title from "./Title";
import SocialIcons from "./SocialIcons";
import SwitchButtons from "./SwitchButtons";
import AboutMe from "./AboutSection/AboutMe";
import AboutCompany from "./AboutSection/AboutCompany";
import ContactDetails from "./AboutSection/ContactDetails";
import OurSolutions from "./AboutSection/OurSolutions";
import Footer from "./Footer";

import { Banner } from "../../assets/images/svgs";

import {
  mobileBottomContainer,
  mobileButtonsContainer,
  mobileIconsContainer,
  mobileImageBox,
  mobileTitleContainer,
  mobileTopContainer,
} from "./styles";
import { useState } from "react";

const DetailsInMobile = ({
  isAbout,
  setIsAbout,
  data,
  currentEmployee,
  companyProfile,
  isMobile,
}) => {
  const [imageError, setImageError] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const theme = useTheme();

  const isSmallMobile = useMediaQuery(theme.breakpoints.down(375));
  const isMediumMobile = useMediaQuery(theme.breakpoints.between(376, 428));
  const isLargeMobile = useMediaQuery(theme.breakpoints.between(429, 768));

  const bannerImage =
    currentEmployee?.department_id?.banner_image?.image_url ||
    data?.banner_image?.image_url ||
    companyProfile?.banner_image?.image_url;

  const getBannerStyles = () => {
    if (isSmallMobile) {
      return {
        width: "100%",
        height: "160px",
        objectFit: "cover",
        objectPosition: "center",
        minHeight: "140px",
      };
    } else if (isMediumMobile) {
      return {
        width: "100%",
        height: "180px",
        objectFit: "cover",
        objectPosition: "center",
        minHeight: "160px",
      };
    } else if (isLargeMobile) {
      return {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        objectPosition: "center",
        minHeight: "180px",
      };
    } else {
      return {
        width: "100%",
        height: "220px",
        objectFit: "cover",
        objectPosition: "center",
        minHeight: "200px",
      };
    }
  };

  return (
    <>
      {bannerImage && !bannerError ? (
        <Box
          component="img"
          src={bannerImage}
          alt="department banner"
          onError={() => setBannerError(true)}
          sx={getBannerStyles()}
        />
      ) : (
        <Box
          component="img"
          src={Banner}
          alt="default banner"
          sx={getBannerStyles()}
        />
      )}

      <Box padding={"26px 20px"}>
        <Box sx={mobileTopContainer}>
          <Grid
            container
            alignItems={"center"}
            sx={{
              "@media (max-width:374px)": {
                flexDirection: "column-reverse",
                gap: 1.5,
              },
            }}
          >
            <Grid
              item
              sx={{
                width: {
                  xs: "58.33%",
                },
                "@media (max-width: 374px)": {
                  width: "100%",
                },
              }}
            >
              <Box sx={mobileTitleContainer}>
                <Title data={data} currentEmployee={currentEmployee} />
              </Box>
            </Grid>

            <Grid size={5}>
              {!currentEmployee?.profile_image?.image_url || imageError ? (
                <Avatar
                  src={currentEmployee?.name}
                  alt={currentEmployee?.name}
                  sx={{ width: 60, height: 60, mx: "auto" }}
                />
              ) : (
                <Box sx={mobileImageBox}>
                  <Box
                    component="img"
                    src={currentEmployee?.profile_image?.image_url}
                    alt="Profile"
                    onError={() => setImageError(true)}
                  />
                </Box>
              )}
            </Grid>
          </Grid>

          <Box sx={mobileIconsContainer}>
            <SocialIcons currentEmployee={currentEmployee} />
          </Box>
        </Box>

        <Box sx={mobileButtonsContainer}>
          <SwitchButtons isAbout={isAbout} setIsAbout={setIsAbout} />
        </Box>

        <Box sx={mobileBottomContainer}>
          <Box marginBottom={"25px"}>
            {isAbout ? (
              <AboutMe data={data} currentEmployee={currentEmployee} />
            ) : (
              <AboutCompany data={data} currentEmployee={currentEmployee} />
            )}
          </Box>

          <Box marginBottom={isAbout ? "75px" : "5px"}>
            {isAbout ? (
              <ContactDetails
                currentEmployee={{
                  ...currentEmployee,
                  website: companyProfile?.website_link,
                }}
              />
            ) : (
              <OurSolutions isMobile={isMobile} />
            )}
          </Box>

          <Footer
            isAbout={isAbout}
            currentEmployee={currentEmployee}
            companyProfile={companyProfile}
          />
        </Box>
      </Box>
    </>
  );
};

export default DetailsInMobile;
