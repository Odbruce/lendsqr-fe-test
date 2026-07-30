import Papa from "papaparse";
import { User } from "@/services/api";
import { formatUserDate } from "./date";

export function downloadUsersCSV(users: User[]) {
  const data = users.map((user) => ({
    "ID": user.id,
    "Organization": user.orgName,
    "Username": user.userName,
    "Email": user.email,
    "Phone Number": user.phoneNumber,
    "Date Joined": formatUserDate(user.createdAt),
    "Status": user.status,
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", `lendsqr_users_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
