import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Avatar,
  Box,
  InputLabel,
  Stack,
  Typography,
  Button,
  Slider,
} from "@mui/material";
import Cropper from "react-easy-crop";

import uploadIcon from "../../assets/images/svgs/upload.svg";
import { FORM } from "../../constants/Form";

import {
  heading,
  headingBox,
  headingBoxIcon,
  profileAvatar,
  profileContainer,
  profileUploadContainer,
} from "./styles";
import { errorText } from "../inputs/styles";
import { useCallback } from "react";
import { toast } from "sonner";

const UploadProfile = ({
  control,
  name,
  value,
  label,
  error,
  helperText,
  inputStyles,
  preview,
  setPreview,
  edit,
  fieldName,
  onCropRequest,
  croppingState,
  onCropComplete,
  performCrop,
  cancelCrop,
  setCrop,
  setZoom,
}) => {
  const inputRef = useRef();
  const containerRef = useRef();
  const zoomRef = useRef(croppingState?.zoom || 1);
  const frameRef = useRef(null);
  const [cropBoxHeight, setCropBoxHeight] = useState(300);
  const [containerSize, setContainerSize] = useState({
    width: 200,
    height: 200,
  });

  const handleZoomChange = useCallback(
    (_, newValue) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      const clampedValue = Math.min(Math.max(newValue, 0.5), 4);

      zoomRef.current = parseFloat(clampedValue.toFixed(2));

      frameRef.current = requestAnimationFrame(() => {
        setZoom(zoomRef.current);
      });
    },
    [setZoom]
  );

  const handleClick = () => {
    inputRef.current.click();
  };

  const validateFile = (file, fieldName) => {
    const maxSize = 2 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        `${fieldName}: Invalid file type. Allowed: JPEG, PNG, WebP`
      );
    }

    if (file.size > maxSize) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      throw new Error(
        `${fieldName}: File too large. Current: ${sizeInMB}MB, Maximum: 2MB`
      );
    }

    return true;
  };

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateContainerSize();

    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, [preview, croppingState]);

  useEffect(() => {
    if (croppingState?.image) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const containerWidth = containerRef.current?.clientWidth || 600;

        let calculatedHeight = containerWidth / aspectRatio;

        const minHeight = 300;
        const maxHeight = Math.min(window.innerHeight * 0.6, 500);

        calculatedHeight = Math.min(
          Math.max(calculatedHeight, minHeight),
          maxHeight
        );

        setCropBoxHeight(calculatedHeight);
      };
      img.src = croppingState.image;
    }
  }, [croppingState?.image, containerSize]);

  const handleFileChange = async (e, onChange) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateFile(file, fieldName || name);

      if (fieldName === "banner_image") {
        // keep track of old preview before overwriting
        const oldPreview = preview;

        try {
          await validateBannerForMobile(file);
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
          onChange(file);
          toast.success("Banner image validated successfully!");
        } catch {
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
          onCropRequest(file, fieldName, onChange);

          // restore old preview if crop canceled
          // handled in cancelCrop below
          cancelCrop.oldPreview = oldPreview;
        }
      } else {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        onChange(file);
      }
    } catch (error) {
      toast.error(error.message);
    }
    e.target.value = "";
  };

  const isThisFieldCropping =
    croppingState?.isCropping && croppingState?.fieldName === fieldName;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: fieldValue } }) => (
        <Stack sx={{ order: 2, gap: 1 }}>
          <InputLabel sx={inputStyles?.label}>{label}</InputLabel>

          <Box
            sx={profileContainer(
              preview || fieldValue,
              error,
              isThisFieldCropping,
              fieldName
            )}
            ref={containerRef}
          >
            {isThisFieldCropping ? (
              <Box sx={{ width: "100%", py: 2, px: 0.5, height: "auto" }}>
                <Typography variant="h6" gutterBottom align="center">
                  Crop{" "}
                  {fieldName === "banner_image"
                    ? "Banner Image"
                    : "Profile Image"}
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "130px",
                    bgcolor: "grey.100",
                    mt: 1,
                    mb: 2.5,
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Cropper
                    image={croppingState.image}
                    crop={croppingState.crop}
                    zoom={croppingState.zoom}
                    aspect={croppingState.cropConfig.aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </Box>

                <Box sx={{ mb: 0, px: 4 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }} align="center">
                    Zoom: {Math.round(croppingState.zoom * 100)}%
                  </Typography>
                  <Slider
                    value={croppingState.zoom}
                    onChange={handleZoomChange}
                    min={0.5}
                    max={4}
                    step={0.01}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
                    sx={{
                      color: "primary.main",
                      transition: "none",
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        transition:
                          "transform 0.05s cubic-bezier(0.22, 1, 0.36, 1)",
                      },
                      "& .MuiSlider-rail, & .MuiSlider-track": {
                        transition: "none",
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    pb: "20px",
                  }}
                >
                  <Button variant="outlined" size="medium" onClick={cancelCrop}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={performCrop}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, onChange)}
                />

                <Box sx={profileUploadContainer} onClick={handleClick}>
                  {preview || fieldValue ? (
                    <Avatar
                      src={
                        typeof fieldValue === "string" ? fieldValue : preview
                      }
                      alt="Uploaded Preview"
                      sx={{
                        ...profileAvatar,
                        width: "100%",
                        height: "132px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Box sx={headingBox}>
                      <Box sx={headingBoxIcon}>
                        <img
                          src={uploadIcon}
                          alt="Upload"
                          width={40}
                          height={40}
                        />
                      </Box>
                      <Typography sx={heading}>{FORM.upload}</Typography>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>

          {error && <Typography sx={errorText}>{helperText}</Typography>}
        </Stack>
      )}
    />
  );
};

export default UploadProfile;
