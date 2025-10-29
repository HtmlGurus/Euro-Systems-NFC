import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Controller } from "react-hook-form";

import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import {
  errorText,
  inputPlaceholder,
  menuItem,
  selectInputRoot,
} from "./styles";

const SelectDropdown = ({
  control,
  name,
  label,
  value,
  error,
  helperText,
  placeholder,
  inputStyles = {},
  gap = 1,
}) => {
  const { departments } = useSelector((state) => state.department);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (departments) {
      setOptions(
        departments?.map((item) => {
          return { label: item?.name, value: item?.id };
        })
      );
    }
  }, [departments]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack gap={gap}>
          <InputLabel sx={inputStyles.label}>{label}</InputLabel>

          <Box>
            <Select
              {...field}
              value={value?.id || value || ""}
              displayEmpty
              renderValue={(selected) => {
                const selectedOption = options.find(
                  (opt) => opt.value === selected
                );
                return selectedOption ? (
                  selectedOption.label
                ) : (
                  <span style={inputPlaceholder}>{placeholder}</span>
                );
              }}
              slotProps={{
                root: {
                  sx: selectInputRoot(error),
                },
              }}
            >
              {options?.length ? (
                options?.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value} sx={menuItem}>
                    {opt.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem key="default" value="" disabled sx={menuItem}>
                  No departments found
                </MenuItem>
              )}
            </Select>

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

export default SelectDropdown;
