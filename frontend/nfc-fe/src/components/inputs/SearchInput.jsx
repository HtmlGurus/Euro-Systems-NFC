import { useEffect, useState } from "react";
import {
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Search } from "../../assets/images/svgs";

import { searchInput } from "./styles";

const SearchInput = ({ onSearch, loading }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch?.(searchValue);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  return (
    <TextField
      placeholder="Search..."
      size="small"
      fullWidth={isSmDown}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <img src={Search} alt="Search" />
            </InputAdornment>
          ),
        },
      }}
      sx={searchInput}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      disabled={loading}
    />
  );
};

export default SearchInput;
