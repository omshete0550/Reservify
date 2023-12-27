import React, { useContext, useState } from "react";
import "./login.scss";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const naviagte = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        Navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <>
      <div className="loginCont">
        <div className="LoginWrapper">
          <div className="heading">
            <h2>Welcome!</h2>
            <p>Sign In to your account</p>
          </div>

          <div className="input-group">
            <input
              type="text"
              id="username"
              className="input-field"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div className="input-group row">
            <div className="row">
              <input type="checkbox" id="remember" hidden />
              <label htmlFor="remember" className="custom-checkbox"></label>
              <label htmlFor="remember">Remember me?</label>
            </div>

            <div className="row">
              <a href="#" target="_blank">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="input-group">
            <button disabled={loading} onClick={handleClick}>
              Login <i className="fa-solid fa-arrow-right"></i>
            </button>
            {error && <span>{error.message}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
