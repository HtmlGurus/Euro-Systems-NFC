import {
  Dashboard,
  DashboardActive,
  Department,
  DepartmentActive,
  Employee,
  EmployeeActive,
  Report,
  ReportActive,
} from "../assets/images/svgs";

const NAVITEMS = {
  LINKS: [
    {
      label: "Dashboard",
      icon: Dashboard,
      activeIcon: DashboardActive,
      path: "/dashboard",
    },
    {
      label: "Departments",
      icon: Department,
      activeIcon: DepartmentActive,
      path: "/departments",
    },
    {
      label: "Employees",
      icon: Employee,
      activeIcon: EmployeeActive,
      path: "/employees",
    },
    {
      label: "Admins",
      path: "/admins",
    },
    {
      label: "Account",
      path: "/manage-account",
    },
    {
      label: "Reports",
      icon: Report,
      activeIcon: ReportActive,
      path: "/reports",
    },
  ],
  LOGOUT: "Logout",
};

const HEADER = {
  cooperative: "Cooperatives",
  admin: "Admin",
};

export { NAVITEMS, HEADER };
