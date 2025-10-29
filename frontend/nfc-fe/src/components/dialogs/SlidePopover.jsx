import { Popover, Box, Button, Slide, Divider } from "@mui/material";

import { TABLEBUTTONPOPUP } from "../../constants/Table";

import {
  slidePopoverBox,
  slidePopoverButtons,
  slidePopoverPaper,
} from "./styles";

const SlidePopover = ({
  anchorEl,
  setAnchorEl,
  visible,
  setVisible,
  handleDelete,
  handleEdit,
  handleResetPassword,
  reset,
}) => {
  const handleClose = () => {
    setVisible(false);
    setAnchorEl(null);
  };

  return (
    <Popover
      open={visible}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: slidePopoverPaper,
        },
      }}
      onClose={handleClose}
    >
      <Slide
        in={visible}
        direction="left"
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <Box sx={slidePopoverBox}>
          <Button
            variant="text"
            onClick={() => {
              handleClose();
              handleEdit();
            }}
            disableRipple
            sx={{
              ...slidePopoverButtons,
              color: "text.secondary",
            }}
          >
            {TABLEBUTTONPOPUP[0]}
          </Button>

          <Divider />

          {reset && (
            <>
              <Button
                variant="text"
                onClick={() => {
                  handleClose();
                  handleResetPassword();
                }}
                disableRipple
                sx={{
                  ...slidePopoverButtons,
                  color: "text.secondary",
                }}
              >
                {TABLEBUTTONPOPUP[2]}
              </Button>

              <Divider />
            </>
          )}

          <Button
            variant="text"
            color="error"
            disableRipple
            onClick={() => {
              handleClose();
              handleDelete();
            }}
            sx={slidePopoverButtons}
          >
            {TABLEBUTTONPOPUP[1]}
          </Button>
        </Box>
      </Slide>
    </Popover>
  );
};

export default SlidePopover;
