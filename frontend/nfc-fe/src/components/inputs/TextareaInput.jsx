import { Controller } from "react-hook-form";
import {
  Box,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";

import { Edit } from "../../assets/images/svgs";

import { container, linkContainer } from "./styles";

const TextareaInput = ({
  control,
  name,
  label,
  value,
  error,
  helperText,
  placeholder,
  inputStyles = {},
  gap = 1,
  minRows = 4,
  maxRows = 4,
  profile,
  edit,
}) => {
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
            multiline
            minRows={minRows}
            maxRows={maxRows}
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={helperText}
            placeholder={placeholder}
            value={value}
            disabled={profile ? !edit : false}
            slotProps={{
              input: profile &&
                edit && {
                  endAdornment: (
                    <InputAdornment position="start">
                      <Box>
                        <Box component={"img"} src={Edit} />
                      </Box>
                    </InputAdornment>
                  ),
                },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                alignItems: "flex-start !important",
                scrollbarWidth: "none",

                "& textarea": {
                  fontSize: "14px",
                  lineHeight: "100%",

                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                },
              },
            }}
          />
        </Stack>
      )}
    />
  );
};

export default TextareaInput;
