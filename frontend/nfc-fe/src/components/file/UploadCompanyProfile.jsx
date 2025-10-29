import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

import { Avatar, Box, Typography } from "@mui/material";

import { FilledEdit, Upload } from "../../assets/images/svgs";

import {
  avatar,
  companyProfileContainer,
  profileUploadContainer,
  heading,
  headingBox,
  headingBoxIcon,
  filledEdit,
} from "./styles";

const UploadCompanyProfile = ({
  control,
  name,
  value,
  error,
  helperText,
  setValue,
  edit,
}) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e, onChange) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onChange(file);
    }
    e.target.value = "";
  };

  const handleRemove = (onChange) => {
    setPreview(null);
    onChange(null);
    setValue(name, null, { shouldValidate: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Box>
          <Box sx={companyProfileContainer(preview || value, error)}>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e, onChange)}
            />

            <Box
              sx={profileUploadContainer(edit)}
              onClick={edit ? handleClick : () => {}}
            >
              {preview || value ? (
                <Avatar src={preview || value} sx={avatar} />
              ) : (
                <Box sx={headingBox}>
                  <Box
                    component={"img"}
                    sx={headingBoxIcon}
                    src={Upload}
                    alt="Upload"
                  />
                  <Typography variant="body2" sx={heading}>
                    Upload File
                  </Typography>
                </Box>
              )}
            </Box>

            {edit && (
              <Box
                sx={filledEdit}
                className="center"
                onClick={edit ? handleClick : () => {}}
              >
                <Box component={"img"} src={FilledEdit} />
              </Box>
            )}
          </Box>

          {!!error && (
            <Typography color="error" fontSize={12} mt={1} textAlign={"center"}>
              {helperText}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default UploadCompanyProfile;
