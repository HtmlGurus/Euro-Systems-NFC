import { PATHS } from "../constants/Paths";

const TOKEN = localStorage.getItem("token");
const USER_TYPE = localStorage.getItem("role");

const handleLogoutUser = (navigate) => {
  localStorage.clear();

  navigate(PATHS.home);
};

const isAuthenticated = () => {
  return TOKEN;
};

export { handleLogoutUser, isAuthenticated, TOKEN, USER_TYPE };
