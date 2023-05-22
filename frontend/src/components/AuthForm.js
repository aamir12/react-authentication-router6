import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import { useEffect, useRef } from "react";

function AuthForm() {
  //searchParams is used to get the query params
  //setSearchParams is used to set the value of query params
  //const [searchParams,setSearchParams] = useSearchParams()
  const [searchParams] = useSearchParams();
  const data = useActionData();
  const navigation = useNavigation();
  const emailRef = useRef();
  const passwordRef = useRef();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  let errors = null;
  if (data && data.errors) {
    errors = (
      <ul>
        {Object.values(data.errors).map((err) => (
          <li key={err}>{err}</li>
        ))}
      </ul>
    );
  }

  useEffect(() => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }, [isLogin]);

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {errors}
        {data && data.message && <p> {data.message} </p>}

        <p>
          <label htmlFor="email">Email</label>
          <input id="email" ref={emailRef} type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input
            id="password"
            ref={passwordRef}
            type="password"
            name="password"
            required
          />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`} type="button">
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
