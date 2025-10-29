import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import Pagination from "../../components/Pagination";
import { useGetAllReportsQuery } from "../../store/slices/employee/employeeApiSlice";
import SearchInput from "../../components/inputs/SearchInput";

const Report = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: reports,
    isLoading,
    isError,
  } = useGetAllReportsQuery(
    { page, limit: rowsPerPage, search: searchTerm },
    { refetchOnMountOrArgChange: true }
  );

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
    setPage(1);
  };

  if (isLoading)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (isError) {
    return (
      <Typography
        sx={{
          height: "100vh",
          color: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Failed to load reports.
      </Typography>
    );
  }

  if (!reports || !reports.data || reports.data.length === 0)
    return <Typography sx={{ m: 3 }}>No reports available.</Typography>;

  const displayedReports = reports?.data || [];
  const totalRows = reports?.pagination?.total_count || 0;
  const totalPages = reports?.pagination?.total_pages || 1;

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          flex: 1,
          minHeight: 0,
        }}
      >
        <SearchInput onSearch={handleSearch} loading={isLoading} />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pr: 5,
            minHeight: 0,
            scrollBehavior: "smooth",
            pb: 3,
            pt: 5,
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
          >
            {displayedReports.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <Card
                  sx={{
                    textAlign: "center",
                    borderRadius: "11px",
                    p: 2,
                    boxShadow: "none",
                    width: "238px",
                    height: "208px",
                    border: "1px solid #CCC8C8",
                    bgcolor: "#F6F8FA",
                  }}
                >
                  <Avatar
                    src={
                      member.profile_image?.image_url || "/default-avatar.png"
                    }
                    alt={member.name}
                    sx={{
                      width: "95px",
                      height: "92px",
                      mx: "auto",
                      border: "2px solid #eee",
                    }}
                  />
                  <CardContent sx={{ padding: 0 }}>
                    <Typography
                      fontWeight="500"
                      fontSize="25px"
                      noWrap
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%", // Ensures it respects container width
                      }}
                      title={member.name} // Shows full name on hover
                    >
                      {member.name}
                    </Typography>

                    <Typography
                      fontSize="15px"
                      fontWeight="400"
                      color="#606061"
                    >
                      {member.designation}
                    </Typography>
                    <Typography
                      fontSize="15px"
                      fontWeight="400"
                      color="#606061"
                    >
                      Num of Views:
                      <Typography
                        component="span"
                        color="#2684FC"
                        fontWeight="600"
                        pl="5px"
                      >
                        {member.view_count}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box sx={{ mt: 3, width: "100%" }}>
        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={(limit) => {
            setRowsPerPage(limit);
            setPage(1);
          }}
          totalRows={totalRows}
          totalPages={totalPages}
          loading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default Report;
