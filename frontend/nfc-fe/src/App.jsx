import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import AppRoutes from "./routes/routes";

import { setNavigator } from "./utils/navigateService";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <Box height={"100%"}>
      <AppRoutes />
    </Box>
  );
};

export default App;
