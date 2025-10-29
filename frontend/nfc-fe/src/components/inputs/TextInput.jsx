import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  TextField,
  InputLabel,
  InputAdornment,
  Stack,
  IconButton,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Edit } from "../../assets/images/svgs";
import { container, iconButton, linkContainer } from "./styles";

const TextInput = ({
  control,
  name,
  label,
  value,
  type = "text",
  error,
  helperText,
  placeholder,
  inputStyles = {},
  gap = 1,
  profile,
  edit,
  admin,
  login,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField =
    name === "password" ||
    name === "new_password" ||
    name === "current_password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack
          gap={gap}
          sx={{
            ...inputStyles.container,
            ...container(error),
          }}
        >
          <Box sx={linkContainer}>
            <InputLabel sx={inputStyles.label}>{label}</InputLabel>
          </Box>
          <TextField
            {...field}
            type={
              isPasswordField && showPassword
                ? "text"
                : isPasswordField
                ? "password"
                : type
            }
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={helperText}
            placeholder={placeholder}
            value={isPasswordField && edit && admin ? "password" : value}
            disabled={
              isPasswordField && edit && admin
                ? true
                : profile
                ? !edit
                : disabled
            }
            slotProps={{
              input:
                (isPasswordField && login) || (isPasswordField && !edit)
                  ? {
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            disableRipple
                            sx={iconButton}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <RemoveRedEyeOutlinedIcon />
                            ) : (
                              <VisibilityOffOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : profile && edit
                  ? {
                      endAdornment: (
                        <InputAdornment position="start">
                          <Box component={"img"} src={Edit} />
                        </InputAdornment>
                      ),
                    }
                  : null,
            }}
          />
        </Stack>
      )}
    />
  );
};

export default TextInput;
