import { useNavigate } from "react-router-dom";

import { Box, Card, Skeleton, Typography } from "@mui/material";

import {
  cardContainer,
  leftBoxContainer,
  leftBoxIconContainer,
  leftBoxSubtitle,
  rightBoxContainer,
  rightBoxCount,
} from "./styles";

const InfoCard = ({
  icon,
  heading1,
  heading2,
  value,
  path,
  bg = "rgba(38, 132, 252, 0.15)",
  valueBg = "rgba(38, 132, 252, 0.08)",
  loading = false,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card elevation={2} sx={cardContainer(loading)}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Card>
    );
  }

  return (
    <Card
      elevation={2}
      sx={cardContainer(loading)}
      onClick={() => navigate(path)}
    >
      {/* Left Column */}
      <Box sx={leftBoxContainer}>
        <Box
          sx={{
            backgroundColor: bg,
            ...leftBoxIconContainer,
          }}
          className="center"
        >
          <img src={icon} />
        </Box>

        <Typography variant="h4" color="#1C1C1E" lineHeight={"100%"}>
          {heading1}
        </Typography>

        <Typography variant="subtitle2" sx={leftBoxSubtitle}>
          {heading2}
        </Typography>
      </Box>

      {/* Right Column */}
      <Box
        sx={{
          backgroundColor: valueBg,
          ...rightBoxContainer,
        }}
      >
        <Typography variant="h1" sx={rightBoxCount}>
          {value}
        </Typography>
      </Box>
    </Card>
  );
};

export default InfoCard;
