import { Stack, Typography } from "@mui/material";

import { department, title } from "./styles";

const Title = ({ data, currentEmployee }) => {
  return (
    <Stack spacing={1} width={"100%"}>
      <Typography variant="h2" sx={title}>
        {currentEmployee?.name || "N/A"}
      </Typography>

      <Typography sx={department}>
        {currentEmployee?.designation || "N/A"}
      </Typography>
    </Stack>
  );
};

export default Title;
