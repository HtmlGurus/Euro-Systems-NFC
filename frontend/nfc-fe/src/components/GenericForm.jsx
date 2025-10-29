import { Controller, FormProvider } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";

import TextInput from "./inputs/TextInput";
import UploadCompanyProfile from "./file/UploadCompanyProfile";
import UploadProfile from "./file/UploadProfile";
import DateInput from "./inputs/DateInput";
import SelectDropdown from "./inputs/SelectDropdown";
import TextareaInput from "./inputs/TextareaInput";

import { useCustomForm } from "../hooks/useCustomForm";

import { submitButton } from "./styles";
import { useEffect } from "react";

const styles = {
  width: "100%",
  height: "100%",
};

const GenericForm = ({
  schema,
  fieldsConfig,
  onSubmit,
  submitText,
  defaultValues = {},
  gap,
  inputStyles,
  profile,
  isLoading,
  login,
  edit,
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
  const methods = useCustomForm(schema, defaultValues);
  const { control, handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    if (exposeReset) exposeReset(reset);
  }, [exposeReset, reset]);

  return (
    <FormProvider {...methods}>
      <form
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={
          login ? handleSubmit((data) => onSubmit(data, methods)) : null
        }
      >
        {/* Form fields container - will scroll if needed */}
        <Stack gap={4} sx={{ flex: 1, overflow: "auto", mb: 2 }}>
          <Stack gap={1.5}>
            {fieldsConfig.map((field) => (
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                render={({ field: controllerField, fieldState }) => {
                  const commonProps = {
                    ...controllerField,
                    label: field.label,
                    disabled: field.disabled,
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    placeholder: field.placeholder,
                    value: controllerField.value ?? "",
                    inputStyles,
                  };

                  switch (field.type) {
                    case "file":
                      return (
                        <>
                          {profile ? (
                            <UploadCompanyProfile
                              {...commonProps}
                              setValue={setValue}
                              edit={edit}
                            />
                          ) : (
                            <UploadProfile
                              {...commonProps}
                              setValue={setValue}
                              edit={edit}
                              preview={
                                field.name === "banner_image"
                                  ? previewBanner
                                  : preview
                              }
                              setPreview={
                                field.name === "banner_image"
                                  ? setPreviewBanner
                                  : setPreview
                              }
                              fieldName={field.name}
                              onCropRequest={handleImageValidationAndCrop}
                              croppingState={croppingState}
                              onCropComplete={onCropComplete}
                              performCrop={performCrop}
                              cancelCrop={cancelCrop}
                              setCrop={setCrop}
                              setZoom={setZoom}
                            />
                          )}
                        </>
                      );

                    case "dropdown":
                      return (
                        <SelectDropdown
                          {...commonProps}
                          setSelectedDepartmentId={setSelectedDepartmentId}
                        />
                      );

                    case "date":
                      return <DateInput {...commonProps} setValue={setValue} />;

                    case "textarea":
                      return (
                        <TextareaInput
                          {...commonProps}
                          setValue={setValue}
                          profile={profile}
                          edit={edit}
                        />
                      );

                    default:
                      return (
                        <TextInput
                          type={field.type}
                          {...commonProps}
                          gap={gap}
                          profile={profile}
                          edit={edit}
                          admin={admin}
                          login={login}
                        />
                      );
                  }
                }}
              />
            ))}
          </Stack>
        </Stack>

        <Box sx={{ flexShrink: 0, mt: "auto" }}>
          <Button
            variant="containedPrimary"
            type={login ? "submit" : "button"}
            disableRipple
            sx={submitButton}
            disabled={isLoading}
            onClick={
              !login ? handleSubmit((data) => onSubmit(data, methods)) : null
            }
            fullWidth
          >
            {submitText}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default GenericForm;
