import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { CONTACTDETAILS } from "../../../constants/Details";
import { contactListContainer, contactListIcon, listItem } from "../styles";
import { Link } from "react-router-dom";

const generateVCard = (employee) => {
  return `
BEGIN:VCARD
VERSION:3.0
FN:${employee.name}
TEL;TYPE=MAIN:${employee.phone_number}
${
  employee.second_phone_number
    ? `TEL;TYPE=OTHER:${employee.second_phone_number}`
    : ""
}
EMAIL:${employee.email}
END:VCARD
  `.trim();
};

const handleSaveContact = (employee) => {
  const vcard = generateVCard(employee);
  const blob = new Blob([vcard], { type: "text/vcard" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${employee.name}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const ContactDetails = ({ currentEmployee }) => {
  const displayDetails = CONTACTDETAILS.map((item) => ({
    icon: item.icon,
    key: item.key,
    details: currentEmployee[item.key] || "",
  }));

  return (
    <Stack
      sx={{
        gap: { xs: 3, sm: 3 },
        "@media(max-width: 374px)": {
          gap: 2.5,
        },
      }}
    >
      {displayDetails.map((el, i) => (
        <React.Fragment key={i}>
          <Stack sx={contactListContainer}>
            {/* Icon */}
            <Box sx={contactListIcon(el)}>
              <Box component="img" src={el.icon} alt="icon" />
            </Box>

            {/* Content Wrapper */}
            <Stack
              sx={{
                width: "calc(100% - 40px)",
                "@media(max-width: 375px)": {
                  width: "100%",
                },
              }}
            >
              {el.key === "phone_number" ? (
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  gap={0.8}
                  sx={{
                    "@media(max-width: 375px)": {
                      gap: 0.6,
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1.5}
                    sx={{
                      "@media(max-width: 319px)": {
                        gap: 1,
                      },
                    }}
                  >
                    <Stack>
                      <Typography
                        sx={{
                          ...listItem,
                          "@media(max-width: 325px)": {
                            fontSize: 9.5,
                          },
                        }}
                      >
                        {el.details}
                      </Typography>
                    </Stack>
                    <Button
                      variant="containedSecondary"
                      size="small"
                      onClick={() => handleSaveContact(currentEmployee)}
                      sx={{
                        maxWidth: "fit-content",
                        padding: "6px 12px",
                        fontSize: { xs: "clamp(8px, 2.1vw, 11px)", sm: "12px" },
                        textWrap: "nowrap",
                        "@media(max-width: 319px)": {
                          fontSize: "clamp(7px, 0.5vw, 11px)",
                          padding: "6px 4px",
                        },
                      }}
                    >
                      Save Contact
                    </Button>
                  </Stack>
                </Stack>
              ) : el.key === "website" ? (
                <Link to={`${el.details}`} style={{ width: "fit-content" }}>
                  <Typography sx={listItem}>{el.details}</Typography>
                </Link>
              ) : el.key === "landline" ? (
                <Typography
                  sx={{
                    ...listItem,
                    "@media(max-width: 325px)": {
                      fontSize: 9.5,
                    },
                  }}
                >
                  {currentEmployee.second_phone_number || "NA"}
                </Typography>
              ) : (
                <Typography sx={listItem}>{el.details}</Typography>
              )}
            </Stack>
          </Stack>
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default ContactDetails;
