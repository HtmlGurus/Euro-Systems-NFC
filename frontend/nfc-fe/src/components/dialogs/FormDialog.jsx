import { forwardRef } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import FormLayout from "../FormLayout";
import {
  formDialogContent,
  formDialogHeading,
  formDialogPaper,
} from "./styles";

const Transition = forwardRef(function Transition(
  { direction, ...props },
  ref
) {
  return <Slide direction={direction} ref={ref} {...props} timeout={500} />;
});

const FormDialog = ({
  open,
  direction = "down",
  ADD,
  EDIT,
  fieldsConfig,
  schema,
  onSubmit,
  edit,
  rowDetails,
  handleClose,
  isLoading,
  preview,
  setPreview,
  previewBanner,
  setPreviewBanner,
  exposeReset,
  setSelectedDepartmentId,
  admin,
  reset,
  text,
  handleImageValidationAndCrop = () => {},
  croppingState = {},
  onCropComplete = () => {},
  performCrop = () => {},
  cancelCrop = () => {},
  setCrop = () => {},
  setZoom = () => {},
}) => {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        transition: { direction },
        paper: {
          sx: {
            ...formDialogPaper,
            height: "auto",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="lg"
    >
      <DialogTitle
        id="scroll-dialog-title"
        sx={{
          padding: "24px 0px 0px",
          marginBottom: 3,
          flexShrink: 0,
        }}
      >
        <Box textAlign={"center"}>
          <Typography variant="h5" sx={formDialogHeading}>
            {edit ? EDIT : ADD}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          ...formDialogContent,
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormLayout
          title={ADD}
          editTitle={EDIT}
          fieldsConfig={fieldsConfig}
          schema={schema}
          onSubmit={onSubmit}
          rowDetails={rowDetails}
          isLoading={isLoading}
          edit={edit}
          preview={preview}
          setPreview={setPreview}
          previewBanner={previewBanner}
          setPreviewBanner={setPreviewBanner}
          exposeReset={exposeReset}
          setSelectedDepartmentId={setSelectedDepartmentId}
          admin={admin}
          reset={reset}
          text={text}
          handleImageValidationAndCrop={handleImageValidationAndCrop}
          croppingState={croppingState}
          onCropComplete={onCropComplete}
          performCrop={performCrop}
          cancelCrop={cancelCrop}
          setCrop={setCrop}
          setZoom={setZoom}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
