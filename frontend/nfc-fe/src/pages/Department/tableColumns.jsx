import { Avatar, Box, Typography } from "@mui/material";

import { avatar, email, name } from "./styles";

export const departmentTableColumns = [
  {
    id: "department",
    label: "Department",
    render: (row) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          src={row?.image?.image_url || "/default-avatar.png"}
          alt={row?.name}
          sx={avatar}
        />
        <Box>
          <Typography variant="subtitle2" sx={name}>
            {row?.name}
          </Typography>

          <Typography sx={email}>{row?.email}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: "employee_count",
    label: "No of employees",
    render: (row) => row?.employee_count ?? 0,
  },
  {
    id: "created_at",
    label: "Created Time",
    render: (row) =>
      new Date(row?.created_at).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
  },
];
