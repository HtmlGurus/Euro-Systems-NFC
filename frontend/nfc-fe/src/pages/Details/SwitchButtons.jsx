import { Button, Stack } from "@mui/material";

import { SWITCHBUTTONS } from "../../constants/Details";

import {
  aboutButton,
  companyButton,
  switchButtons,
  switchButtonsContainer,
} from "./styles";

const SwitchButtons = ({ isAbout, setIsAbout }) => {
  const { about, company } = SWITCHBUTTONS;

  return (
    <Stack sx={switchButtonsContainer}>
      <Button
        startIcon={
          <img
            src={isAbout ? about.activeIcon : about.inActiveIcon}
            alt="About"
          />
        }
        variant="containedSecondary"
        sx={{
          ...switchButtons,
          ...aboutButton(isAbout),
        }}
        onClick={() => setIsAbout(true)}
      >
        {about.title}
      </Button>

      <Button
        startIcon={
          <img
            src={isAbout ? company.inActiveIcon : company.activeIcon}
            alt="About"
          />
        }
        variant="containedSecondary"
        sx={{
          ...switchButtons,
          ...companyButton(isAbout),
        }}
        onClick={() => setIsAbout(false)}
      >
        {company.title}
      </Button>
    </Stack>
  );
};

export default SwitchButtons;
