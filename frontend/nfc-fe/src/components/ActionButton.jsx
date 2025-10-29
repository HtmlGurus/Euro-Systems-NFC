import { Button } from "@mui/material";

import { actionButton } from "./styles";

const ActionButton = ({ icon, onClick, text, loading }) => {
  return (
    <Button
      variant="containedInfo"
      endIcon={<img src={icon} alt={text} />}
      onClick={onClick}
      disableRipple
      sx={actionButton}
      disabled={loading}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
