import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

import InfoCard from "../../components/InfoCard";

import { DASHBOARDITEMS } from "../../constants/Dashboard";
import { useGetAllDepartmentsQuery, useGetAllEmployeesQuery } from "../../store/slices/employee/employeeApiSlice";

const Dashboard = () => {
  const { loadingDepartments } = useSelector((state) => state.department);
  const { loadingEmployees } = useSelector((state) => state.employee);

  const [loading, setLoading] = useState(
    loadingDepartments || loadingEmployees
  );
  const [items, setItems] = useState(DASHBOARDITEMS);

  const {
    data: departments,
    isSuccess: isDepartmentSuccess,
    isLoading: isDepartmentLoading,
  } = useGetAllDepartmentsQuery(
    {
    }
  );

  const {
    data: employees,
    isSuccess: isEmployeeSuccess,
    isLoading: isEmployeeLoading,
  } = useGetAllEmployeesQuery(
    {
    }
  );

  useEffect(() => {
    setLoading(loadingDepartments || loadingEmployees);
  }, [loadingDepartments, loadingEmployees]);

  useEffect(() => {
    if (
      !isDepartmentLoading &&
      isDepartmentSuccess &&
      !isEmployeeLoading &&
      isEmployeeSuccess
    ) {
      const updateItems = DASHBOARDITEMS.map((item, i) => {
        let value = 0;

        if (i === 0) {
          value = departments?.total_departments;
        } else {
          value = employees?.total_employees;
        }

        return { ...item, value };
      });

      setItems(updateItems);
    }
  }, [
    departments,
    employees,
    isDepartmentLoading,
    isDepartmentSuccess,
    isEmployeeSuccess,
    isEmployeeLoading,
  ]);

  return (
    <Box width="100%" padding={{ xs: "20px 18px", lg: "20px 24px" }}>
      <Grid container spacing={{ xs: 2, lg: 3 }}>
        {items?.map((item, index) => (
          <Grid size={{ xs: 12, mdLarge: 6 }} key={index}>
            <InfoCard {...item} loading={loading} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
