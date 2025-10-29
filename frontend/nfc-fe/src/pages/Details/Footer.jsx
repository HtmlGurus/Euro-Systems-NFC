import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import { PARTNERS, VIEW } from "../../constants/Details";
import { Logo } from "../../assets/images/pngs";

import {
  footerButton,
  footerContainer,
  footerLogo,
  partnersBorder,
  partnersContainer,
  partnersItem,
} from "./styles";

const Footer = ({ isAbout, companyProfile }) => {
  const handleClick = (link) => {
    window.open(link || "https://thebitvistas.com", "_blank");
  };
  return (
    <Box sx={footerContainer}>
      {!isAbout && (
        <Button
          variant="containedSecondary"
          sx={footerButton}
          onClick={() => handleClick(companyProfile?.button_redirect_url)}
        >
          {companyProfile?.button_name || VIEW}
        </Button>
      )}

      <Box component={"img"} width="161px" height="44px" src={Logo} alt="Logo" sx={footerLogo} />

      <Stack sx={partnersContainer}>
        {PARTNERS.map((el, i) => (
          <Box key={i} display="flex" alignItems="center">
            <Typography variant="caption" sx={partnersItem}>
              {el}
            </Typography>
            {i !== PARTNERS.length - 1 && <Divider sx={partnersBorder} />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Footer;
