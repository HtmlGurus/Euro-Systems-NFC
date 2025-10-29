import { Stack } from "@mui/material";
import GenericForm from "./GenericForm";
import { FORM } from "../constants/Form";
import { label } from "./styles";

const FormLayout = ({
  fieldsConfig,
  schema,
  onSubmit,
  edit,
  profile,
  defaultValues,
  isLoading,
  reset,
  text,
  preview,
  setPreview,
  previewBanner,
  setPreviewBanner,
  exposeReset,
  setSelectedDepartmentId,
  admin,
  handleImageValidationAndCrop,
  croppingState,
  onCropComplete,
  performCrop,
  cancelCrop,
  setCrop,
  setZoom,
}) => {
  return (
    <Stack
      sx={{
        gap: 3,
        padding: { xs: 2, sm: 3 },
        paddingTop: "0px !important",
      }}
    >
      <GenericForm
        defaultValues={defaultValues}
        fieldsConfig={fieldsConfig}
        schema={schema}
        onSubmit={onSubmit}
        inputStyles={{ label }}
        profile={profile}
        submitText={reset || profile ? text : edit ? FORM.save : FORM.add}
        isLoading={isLoading}
        edit={edit}
        preview={preview}
        setPreview={setPreview}
        previewBanner={previewBanner}
        setPreviewBanner={setPreviewBanner}
        exposeReset={exposeReset}
        setSelectedDepartmentId={setSelectedDepartmentId}
        admin={admin}
        handleImageValidationAndCrop={handleImageValidationAndCrop}
        croppingState={croppingState}
        onCropComplete={onCropComplete}
        performCrop={performCrop}
        cancelCrop={cancelCrop}
        setCrop={setCrop}
        setZoom={setZoom}
      />
    </Stack>
  );
};

export default FormLayout;
