import { redirect } from "react-router-dom";

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expireTime");
  return redirect("/auth?mode=login");
}
