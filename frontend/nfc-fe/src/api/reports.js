import { getToken } from "../utils/tokenManager";
import { EMPLOYEE_REPORTS } from "./apiEndPoints";

const baseURL =
  import.meta.env.VITE_API_BASE;

export const fetchReports = async () => {
  const token = getToken();
  if (!token) throw new Error("❌ No token found. Please login first.");

  const response = await fetch(`${baseURL}${EMPLOYEE_REPORTS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reports: ${response.status}`);
  }

  const data = await response.json();
  return data.data || [];
};
