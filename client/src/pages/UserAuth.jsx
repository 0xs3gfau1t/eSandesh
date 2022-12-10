import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useNavigate } from "react-router-dom";

import { SiteLogo, FormText } from "../components/common";

const initialState = {
  email: "",
  password: "",
  name: "",
};

function UserAuth() {
  const [values, setValues] = useState(initialState);
  const [isLogin, setIsLogin] = useState(true);

  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.status == "authenticated") {
      navigate("/");
    }
  }, [session]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!values.email || !values.password) console.log("Incomplete");
      else
        signIn("user", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
    } else {
      if (!values.email || !values.password || !values.name)
        console.log("Incomplete");
      else signIn("register-user", { ...values, redirect: false });
    }
  };

  const toggle = (e) => {
    e.preventDefault();
    setIsLogin((old) => !old);
    setValues(initialState);
  };

  return (
    <div>
      <form className="form my-[15vh] w-1/4" onSubmit={onSubmit}>
        <SiteLogo />
        <h1>User {isLogin ? "Login" : "Register"}</h1>
        {!isLogin && (
          <FormText
            name="name"
            type="text"
            labelText="Name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormText
          type="email"
          name="email"
          value={values.email}
          labelText="Email"
          handleChange={handleChange}
        />

        <FormText
          name="password"
          type="password"
          labelText="Password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="bg-darkblue text-white py-2">
          {isLogin ? "Login" : "Register"}
        </button>
        {isLogin ? (
          <span>
            Need an account?
            <button onClick={toggle}>Register</button>
          </span>
        ) : (
          <span>
            Already a user?
            <button onClick={toggle}>SignIn</button>
          </span>
        )}

        <button onClick={() => signIn("facebook", { redirect: false })}>
          {isLogin ? "Login" : "Register"} with Facebook.
        </button>
      </form>
    </div>
  );
}

export default UserAuth;
