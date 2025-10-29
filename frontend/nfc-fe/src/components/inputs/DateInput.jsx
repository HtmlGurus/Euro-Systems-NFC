import { Controller } from "react-hook-form";

import { Box, InputLabel, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { dateInput, errorText } from "./styles";

const DateInput = ({
  control,
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  inputStyles = {},
  gap = 1,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack gap={gap}>
          <InputLabel sx={inputStyles.label}>{label}</InputLabel>

          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                value={value ? value : null}
                onChange={(val) => onChange(val)}
                slotProps={{
                  textField: {
                    sx: dateInput(error),
                  },
                }}
              />
            </LocalizationProvider>

            {!!error && (
              <Typography color="error" sx={errorText}>
                {helperText}
              </Typography>
            )}
          </Box>
        </Stack>
      )}
    />
  );
};

export default DateInput;
