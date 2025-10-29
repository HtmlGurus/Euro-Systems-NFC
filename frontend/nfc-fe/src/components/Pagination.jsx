import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { LeftArrow, RightArrow } from "../assets/images/svgs";

import { PAGINTAION } from "../constants/Pagination";

import { getPageNumbers } from "../utils/getPageNumbers";

import {
  pageChangeButton,
  pageChangeHeading,
  pageRowDropdown,
  pageRowHeading,
  paginationContainer,
  paginationNumber,
} from "./styles";

const Pagination = ({
  rowsPerPage,
  setRowsPerPage,
  setPage,
  page,
  totalRows,
  totalPages,
  loading,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");
  const maxVisiblePages = isSmallScreen ? 3 : 5; // You can customize thi

  return (
    <Stack sx={paginationContainer}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Typography sx={pageRowHeading}>{PAGINTAION.row}</Typography>

        <Select
          size="small"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          sx={pageRowDropdown}
          disabled={loading}
        >
          {PAGINTAION.count.map((num) => (
            <MenuItem
              key={num}
              value={num}
              sx={{
                ...pageRowHeading,
                fontWeight: 500,
              }}
            >
              {num}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || loading}
          disableRipple
          sx={{
            ...pageChangeButton,
            marginRight: "4px !important",
          }}
        >
          <img src={LeftArrow} alt="Arrow" />
          <Typography sx={pageChangeHeading}>{PAGINTAION.prev}</Typography>
        </IconButton>

        {getPageNumbers(page, totalPages, maxVisiblePages).map((p, i) =>
          typeof p === "number" ? (
            <Button
              key={i}
              size="small"
              variant={page === p ? "outlined" : "text"}
              onClick={() => setPage(p)}
              disableRipple
              sx={paginationNumber(page, p)}
            >
              {p}
            </Button>
          ) : (
            <Typography
              key={i}
              variant="body2"
              px={1}
              sx={{ ...pageChangeHeading, marginLeft: "0px !important" }}
            >
              ...
            </Typography>
          )
        )}

        <IconButton
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || loading}
          disableRipple
          sx={{
            ...pageChangeButton,
            marginLeft: "12px !important",
          }}
        >
          <Typography sx={pageChangeHeading}>{PAGINTAION.next}</Typography>

          <img src={RightArrow} alt="Arrow" />
        </IconButton>
      </Stack>

      <Typography sx={pageRowHeading}>
        {PAGINTAION.showing} {(page - 1) * rowsPerPage + 1} -{" "}
        {Math.min(page * rowsPerPage, totalRows)} {PAGINTAION.of} {totalRows}
      </Typography>
    </Stack>
  );
};

export default Pagination;
