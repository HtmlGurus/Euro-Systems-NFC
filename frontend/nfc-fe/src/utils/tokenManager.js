let inMemoryToken = null;

const setToken = (token) => {
  inMemoryToken = token;
  localStorage.setItem("accessToken", token);
};

const setRole = (role) => {
  localStorage.setItem("role", role);
};

const setUser = (user) => {
  localStorage.setItem("user", user);
};

const getToken = () => {
  return inMemoryToken || localStorage.getItem("accessToken");
};

const getRole = () => {
  return localStorage.getItem("role");
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const clearToken = () => {
  inMemoryToken = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
};

export { setToken, getToken, setRole, getRole, setUser, getUser, clearToken };
