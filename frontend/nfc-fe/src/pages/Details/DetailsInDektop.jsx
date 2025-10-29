import { Avatar, Box, Stack } from "@mui/material";

import Title from "./Title";
import SocialIcons from "./SocialIcons";
import SwitchButtons from "./SwitchButtons";
import AboutMe from "./AboutSection/AboutMe";
import ContactDetails from "./AboutSection/ContactDetails";
import AboutCompany from "./AboutSection/AboutCompany";
import OurSolutions from "./AboutSection/OurSolutions";
import Footer from "./Footer";

import { desktopImageBox } from "./styles";
import { useState } from "react";

const DetailsInDektop = ({
  isAbout,
  setIsAbout,
  data,
  currentEmployee,
  companyProfile,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Stack
      flexDirection={"row"}
      gap={{ xs: 2.625 }}
      maxWidth={"1024px"}
      mx={"auto"}
      justifyContent={"center"}
      padding={{ xs: "30px 28px", lg: "35px 34px" }}
      display={{ xs: "none", sm: "flex" }}
    >
      <Stack>
        {!currentEmployee?.profile_image?.image_url || imageError ? (
          <Avatar
            src={currentEmployee?.name}
            alt={currentEmployee?.name}
            sx={{ width: 60, height: 60 }}
          />
        ) : (
          <Box sx={desktopImageBox}>
            <Box
              component="img"
              src={currentEmployee?.profile_image?.image_url}
              alt="Profile"
              onError={() => setImageError(true)}
            />
          </Box>
        )}
      </Stack>
      <Stack
        justifyContent={"space-between"}
        p={1}
        spacing={{ xs: 4, md: 5 }}
        sx={{
          width: { sm: "calc(100% - 300px)" },
          height: "100%",
        }}
      >
        <Title data={data} currentEmployee={currentEmployee} />
        <SocialIcons currentEmployee={currentEmployee} />
        <Stack pt={1.5}>
          <SwitchButtons isAbout={isAbout} setIsAbout={setIsAbout} />
        </Stack>
        <Stack spacing={3}>
          {isAbout ? (
            <AboutMe data={data} currentEmployee={currentEmployee} />
          ) : (
            <AboutCompany data={data} currentEmployee={currentEmployee} />
          )}
          {isAbout ? (
            <ContactDetails
              currentEmployee={{
                ...currentEmployee,
                website: companyProfile?.website_link,
              }}
            />
          ) : (
            <OurSolutions />
          )}
        </Stack>
        <Footer
          isAbout={isAbout}
          currentEmployee={currentEmployee}
          companyProfile={companyProfile}
        />
      </Stack>
    </Stack>
  );
};

export default DetailsInDektop;
