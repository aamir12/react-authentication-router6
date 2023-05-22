import { redirect } from "react-router-dom";

export function getAuthDuration() {
  const expireTime = localStorage.getItem("expireTime");
  const expireDate = new Date(expireTime);
  const currentDate = new Date();
  const duration = expireDate.getTime() - currentDate.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const duration = getAuthDuration();
  if (duration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
}

export function isLoginLoader() {
  const token = getAuthToken();
  if (token) {
    return redirect("/");
  }

  return null;
}
