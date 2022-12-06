import { useState } from "react";
import { SiteLogo, FormText } from "../components/common";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="form my-[15vh] w-1/4" onSubmit={onSubmit}>
        <SiteLogo />
        <h1>Admin Login</h1>
        <FormText
          type="text"
          name="username"
          value={values.username}
          labelText="Username"
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
