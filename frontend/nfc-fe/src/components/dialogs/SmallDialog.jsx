import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { DIALOG } from "../../constants/Dialog";

import {
  smallDialogActionButton,
  smallDialogButtonIcon,
  smallDialogButtonsContainer,
  smallDialogContent,
  smallDialogCrossButtonIcon,
  smallDialogPaper,
} from "./styles";

const SmallDialog = ({
  open,
  setOpen,
  itemTitle,
  handleLogout,
  logout,
  handleDelete,
  isLoading,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      slotProps={{
        paper: {
          sx: smallDialogPaper,
        },
        backdrop: {
          sx: {
            backgroundColor: !logout && "rgb(223, 28, 65, 0.15)",
          },
        },
      }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent sx={smallDialogContent}>
        <Stack sx={smallDialogButtonsContainer}>
          <IconButton disableRipple sx={smallDialogButtonIcon}>
            {logout ? (
              <LogoutIcon color="error" fontSize="medium" />
            ) : (
              <img src={DIALOG.deleteIcon} alt="Delete" />
            )}
          </IconButton>

          <IconButton
            sx={smallDialogCrossButtonIcon}
            onClick={handleClose}
            disableRipple
          >
            <img src={DIALOG.crossIcon} alt="Cross" />
          </IconButton>
        </Stack>

        <Box>
          <Typography variant="h3">
            {logout ? DIALOG.logoutTitle : DIALOG.deleteTitle}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {logout ? DIALOG.logoutText : `${DIALOG.makesureText} ${itemTitle}`}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: 0, marginTop: 3 }}>
        {logout ? (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                handleClose();
              }}
              sx={smallDialogActionButton}
              disableRipple
            >
              {DIALOG.cancel}
            </Button>

            <Button
              variant="containedError"
              sx={smallDialogActionButton}
              onClick={() => {
                handleLogout();
              }}
              disableRipple
            >
              {DIALOG.logoutTitle}
            </Button>
          </>
        ) : (
          <Button
            variant="containedError"
            sx={{
              ...smallDialogActionButton,
              width: "100%",
            }}
            disableRipple
            disabled={isLoading}
            onClick={() => {
              handleDelete();
            }}
          >
            {DIALOG.deleteTitle}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SmallDialog;
