import React, { useState } from "react";
import "./Login.css";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import MAIN_LOGO from "../../logo.svg";
import axios from "axios";
import { REGISTER } from "../../util/endpoints";

function Signup() {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [errorResponse, setErrorResponse] = useState(false);
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.value?.trim()) {
      let removeError = error;
      if (removeError) {
        delete removeError[e.target.name];
      }
      setError(removeError);
    }
  };

  const handleBlur = (e) => {
    if (e.target.value?.trim()) {
      let removeError = error;
      if (removeError) delete removeError[e.target.name];
      setError(removeError);
    }
  };

  const handleSignup = () => {
    let errorData = null;
    if (!user.first_name?.trim()) {
      errorData = { ...errorData, first_name: "Please Enter Name" };
    }
    if (!user.last_name?.trim()) {
      errorData = { ...errorData, last_name: "Please Enter Name" };
    }
    if (!user.email?.trim()) {
      errorData = { ...errorData, email: "Please Enter Email Id" };
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email)) {
      errorData = { ...errorData, email: "You have entered an invalid email address!" };
    }
    if (!user.password?.trim()) {
      errorData = { ...errorData, password: "Please Enter Password" };
    } else if (user.password?.length < 8) {
      errorData = { ...errorData, password: "Minimum 8 character required!" };
    }
    if (!user.phone?.trim()) {
      errorData = { ...errorData, phone: "Please Enter Number" };
    } else if (!/^\d{13}$/.test(user.phone)) {
      errorData = { ...errorData, phone: "Please Enter Valid Number" };
    }
    setError(errorData);
    if (!errorData) {
      let body = {
        user,
        device_detail: {
          device_type: "web",
          player_id: "",
        },
      };
      setLoader(true);
      axios
        .post(REGISTER, body)
        .then((res) => {
          console.log(res);
          if (res.data?.status === 200) {
            history.push("/login");
            setLoader(false);
          } else {
            setLoader(false);
            setErrorResponse(res.data?.message);
          }
        })
        .catch((err) => {
          setErrorResponse(true);
          setLoader(false);
        });
    }
  };

  return (
    <div className="login">
      {loader && (
        <div className="loader">
          <CircularProgress disableShrink />
        </div>
      )}
      <img src={MAIN_LOGO} alt="main_logo" />
      <h1>Start Your Journey With Us.</h1>
      <div class="login-error-wrapper">
        {errorResponse && (
          <Alert variant="outlined" severity="error">
            {errorResponse}
          </Alert>
        )}
      </div>
      <form action="#">
        <TextField
          className="input"
          name="first_name"
          required
          error={error?.["first_name"] ? true : false}
          helperText={error?.["first_name"]}
          onBlur={handleBlur}
          value={user.first_name || ""}
          onChange={handleChange}
          id="outlined-basic"
          label="Enter First Name"
          variant="outlined"
          type="input"
        />
        <TextField
          className="input"
          name="last_name"
          required
          error={error?.["last_name"] ? true : false}
          helperText={error?.["last_name"]}
          onBlur={handleBlur}
          value={user.last_name || ""}
          onChange={handleChange}
          id="outlined-basic"
          label="Enter Last Name"
          variant="outlined"
          type="input"
        />
        <TextField
          className="input"
          name="phone"
          required
          error={error?.["phone"] ? true : false}
          helperText={error?.["phone"]}
          value={user.phone || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          id="outlined-basic"
          label="Enter phone number"
          variant="outlined"
          type="input"
        />
        <TextField
          className="input"
          name="email"
          required
          error={error?.["email"] ? true : false}
          helperText={error?.["email"]}
          value={user.email || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          id="outlined-basic"
          label="Enter Email"
          variant="outlined"
          type="email"
        />
        <TextField
          className="input"
          required
          error={error?.["password"] ? true : false}
          helperText={error?.["password"]}
          name="password"
          value={user.password || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          id="outlined-basic"
          label="Enter Password"
          variant="outlined"
          type="password"
        />
        <p className="information">Password must be at least 8 characters long</p>
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Sign Up
        </Button>
        <h4 className="already-account">
          Already have an account?<Link to="/appointment"> Log In</Link>
        </h4>
      </form>
    </div>
  );
}

export default Signup;
