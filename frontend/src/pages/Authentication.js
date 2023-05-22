import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "signup" && mode !== "login") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //server side validation error or login failed
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  //same token logic here
  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
  const expiration = new Date();
  //expiration.setMinutes(expiration.getMinutes() + 1);
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expireTime", expiration.toISOString());
  return redirect("/");
}
