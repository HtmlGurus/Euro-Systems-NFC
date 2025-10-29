import { Avatar, Box, Typography } from "@mui/material";

import { avatar, email, name } from "./styles";

export const employeeTableColumns = [
  {
    id: "employeeNames",
    label: "Name of Employees",
    render: (row) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          src={row?.profile_image?.image_url || "/default-avatar.png"}
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
    id: "department",
    label: "Department",
    render: (row) => {
      const departmentName =
        typeof row.department_id === "object"
          ? row.department_id?.name
          : row.department_id;
      return departmentName || "N/A";
    },
  },
  {
    id: "phone_number",
    label: "Phone Number",
  },
  {
    id: "age",
    label: "Age",
  },
  {
    id: "joining_date",
    label: "Joining Date",
    render: (row) => {
      const date = new Date(row?.joining_date);
      const formatted = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        timeZone: "UTC",
      });
      return formatted;
    },
  },
];
