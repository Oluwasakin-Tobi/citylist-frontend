import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  let navigate = useNavigate();

  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:5001/citylist/authenticate",
        data
      );

      localStorage.setItem("userDetails", JSON.stringify(result));
      navigate("/citylist");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Incorrect Username or Password");
      } else if (err.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div className="auth-form-container">
      <h1>Welcome to City List</h1>
      <p>Kindly input your valid email and password</p>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Input email address"
          value={data.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="********"
          value={data.password}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
