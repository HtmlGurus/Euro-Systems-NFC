import { Avatar, Box, Typography } from "@mui/material";

import { avatar, email, name } from "./styles";

export const adminTableColumns = [
  {
    id: "adminNames",
    label: "Name of Admins",
    render: (row) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          src={
            row.image || row?.profile_image?.image_url || "/default-avatar.png"
          }
          alt={row.name}
          sx={avatar}
        />
        <Box>
          <Typography variant="subtitle2" sx={name}>
            {row.name}
          </Typography>

          <Typography sx={email}>{row.email}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: "phone_number",
    label: "Phone Number",
  },
];
