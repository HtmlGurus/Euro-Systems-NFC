import { Box, Stack } from "@mui/material";
import { SOCIALICONS } from "../../constants/Details";

const SocialIcons = ({ currentEmployee }) => {
  const filteredIcons = SOCIALICONS.filter(
    (item) => currentEmployee?.social_links?.[item.key]
  ).map((item) => ({
    ...item,
    link: currentEmployee?.social_links?.[item.key],
  }));

  if (!filteredIcons.length) return null;

  const recolorSvg = (dataUri, color) => {
    const svg = decodeURIComponent(dataUri.split(",")[1]);
    const colored = svg.replace(/fill=['"][^'"]*['"]/g, `fill='${color}'`);
    return `data:image/svg+xml,${encodeURIComponent(colored)}`;
  };

  return (
    <Stack flexDirection={"row"} gap={2.5} alignItems={"baseline"}>
      {filteredIcons.map((el, index) => (
        <Box
          key={index}
          component="a"
          href={el.link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={recolorSvg(el.icon, "#3B5B82")}
            alt={el.name}
            sx={{
              width: "fit-content",
              height: {
                xs: el.key === "youtube" ? 19.2 : 19,
                md: el.key === "youtube" ? 21.2 : 22,
              },
            }}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default SocialIcons;
