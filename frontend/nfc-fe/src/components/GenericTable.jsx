import { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import SearchInput from "./inputs/SearchInput";
import ActionButton from "./ActionButton";
import Pagination from "./Pagination";

import { actionButton, TABLEACTIONBUTTONS } from "../constants/Table";

import { Action } from "../assets/images/svgs";

import {
  checkbox,
  tableBodyCell,
  tableBoxContainer,
  tableContainer,
  tableHeaderCell,
  tableStackContainer,
} from "./styles";
import { useLocation } from "react-router-dom";

const GenericTable = ({
  columns,
  rows,
  totalRows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  totalPages,
  loading = false,
  clickHandler,
  employee = false,
  message,
}) => {
  const [selected, setSelected] = useState([]);
  const location = useLocation();
  const isAllSelected = rows.length > 0 && selected.length === rows.length;
  const handleSelectAll = (checked) => {
    setSelected(checked ? rows.map((row) => row.id) : []);
  };
  const handleSelectRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    setSelected([]);
  }, [rows]);

  return (
    <Box sx={tableBoxContainer}>
      <Stack sx={tableStackContainer}>
        <SearchInput onSearch={clickHandler.onSearch} loading={loading} />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          {actionButton.map((el, index) => {
            return (
              <ActionButton
                icon={el.icon}
                text={el.name}
                key={index}
                onClick={
                  index === 0
                    ? clickHandler.onSortClick
                    : clickHandler.onAddClick
                }
                loading={loading}
              />
            );
          })}
        </Stack>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} variant="outlined" sx={tableContainer}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F6F8FA" }}>
              {/*!employee && (
                <TableCell padding="checkbox" sx={tableHeaderCell}>
                  <Checkbox
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    sx={checkbox}
                    disableRipple
                    disabled={totalRows === 0}
                  />
                </TableCell>
              ) */}
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{
                    ...tableHeaderCell,
                    ...(["employee_count", "created_at"].includes(col.id) && {
                      textAlign: "center",
                    }),
                  }}
                >
                  {col.label}
                </TableCell>
              ))}

              <TableCell
                sx={{
                  ...tableHeaderCell,
                  ...(location.pathname !== "/employees" && {
                    textAlign: "center",
                  }),
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {/*!employee && (
                      <TableCell padding="checkbox" sx={tableBodyCell}>
                        <Skeleton
                          variant="rectangular"
                          width={20}
                          height={20}
                        />
                      </TableCell>
                    )*/}

                    {columns.map((col) => (
                      <TableCell key={col.id} sx={tableBodyCell}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}

                    <TableCell sx={tableBodyCell}>
                      <Skeleton
                        variant="circular"
                        width={24}
                        height={24}
                        sx={{
                          ...(location.pathname !== "/employees" && {
                            mx: "auto",
                          }),
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : rows?.map((row) => (
                  <TableRow key={row.id}>
                    {/*!employee && (
                      <TableCell padding="checkbox" sx={tableBodyCell}>
                        <Checkbox
                          checked={selected.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                          sx={checkbox}
                          disableRipple
                        />
                      </TableCell>
                    )*/}

                    {columns.map((col) => (
                      <TableCell
                        key={col.id}
                        sx={{
                          ...tableBodyCell,
                          ...(["employee_count", "created_at"].includes(
                            col.id
                          ) && {
                            textAlign: "center",
                          }),
                        }}
                      >
                        {col.render ? col.render(row) : row[col.id]}
                      </TableCell>
                    ))}

                    {employee ? (
                      <TableCell sx={tableBodyCell}>
                        {TABLEACTIONBUTTONS.map((el, index) => {
                          return (
                            <IconButton
                              sx={{
                                padding: 0,
                                margin:
                                  index === 1
                                    ? { xs: "0px 8px", mdLarge: "0px 12px" }
                                    : 0,
                                borderRadius: index !== 2 ? "50%" : 1,
                                width: index !== 2 ? "23px" : "auto",
                                height: index !== 2 ? "23px" : "auto",
                                backgroundColor:
                                  index !== 2 &&
                                  "rgba(230, 237, 249, 1) !important",
                              }}
                              onClick={(e) => {
                                clickHandler.onActionClick(e, row, index);
                              }}
                              key={index}
                            >
                              <img
                                src={el.icon}
                                alt="Action"
                                style={{
                                  width: index !== 2 && "18px",
                                }}
                              />
                            </IconButton>
                          );
                        })}
                      </TableCell>
                    ) : (
                      <TableCell
                        sx={{
                          ...tableBodyCell,
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <IconButton
                          sx={{
                            padding: 1,
                            borderRadius: 1,
                          }}
                          onClick={(e) => clickHandler.onActionClick(e, row)}
                        >
                          <img src={Action} alt="Action" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}

            {!loading && rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (employee ? 1 : 2)}
                  align="center"
                  sx={{ py: 4, fontSize: 16, color: "#888" }}
                >
                  {message}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        totalRows={totalRows}
        totalPages={totalPages}
        loading={loading}
      />
    </Box>
  );
};

export default GenericTable;
