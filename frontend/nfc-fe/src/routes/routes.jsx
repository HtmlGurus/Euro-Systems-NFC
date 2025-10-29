import { Routes, Route } from "react-router-dom";

import Layout from "../layout/Layout";

import Login from "../pages/auth/Login/Login";
import EmailVerify from "../pages/auth/EmailVerify/EmailVerify";
import Dashboard from "../pages/Dashboard/Dashboard";
import Department from "../pages/Department/Department";
import Employee from "../pages/Employee/Employee";
import Admin from "../pages/Admin/Admin";
import Report from "../pages/Report/Report";
import Details from "../pages/Details/Details";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import { PATHS } from "../constants/Paths";
import Accounts from "../pages/Accounts/Accounts";

const AppRoutes = () => {
  const {
    home,
    verify_email,
    dashboard,
    department,
    employee,
    admin,
    report,
    manage_account,
    employee_detail,
  } = PATHS;

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={home} element={<Login />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path={verify_email} element={<EmailVerify />} />
        <Route>
          <Route element={<Layout />}>
            <Route path={dashboard} element={<Dashboard />} />
            <Route path={department} element={<Department />} />
            <Route path={employee} element={<Employee />} />
            <Route path={admin} element={<Admin />} />
            <Route path={report} element={<Report />} />
            <Route path={manage_account} element={<Accounts />} />
          </Route>
        </Route>
      </Route>

      <Route path={employee_detail} element={<Details />} />
    </Routes>
  );
};

export default AppRoutes;
