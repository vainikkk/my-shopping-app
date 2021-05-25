import React, { useState } from "react";
import "./Login.css";
import { Button, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import MAIN_LOGO from "../../logo.svg";
import { useDispatch } from "react-redux";
import axios from "axios";
import { LOGIN } from "../../util/endpoints";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    let body = {
      device_detail: {
        device_type: "web",
        player_id: "",
      },
      user: {
        email: username,
        password: password,
      },
    };
    setLoader(true);
    axios
      .post(LOGIN, body)
      .then((res) => {
        if (res.data.status === 200) {
          setLoader(false);
          dispatch({ type: "LOGIN" });
          localStorage.setItem("token", res.data?.authToken);
          history.push("/");
        } else {
          setLoader(false);
          setError(res.data?.message);
        }
      })
      .catch((e) => {
        setError("Something wrong");
        setLoader(false);
      });
  };

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  return (
    <div className="login">
      {loader && (
        <div className="loader">
          <CircularProgress disableShrink />
        </div>
      )}
      <img src={MAIN_LOGO} alt="main_logo" />
      <h1>Welcome!</h1>
      <div className="login-error-wrapper">
        {error && (
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        )}
      </div>
      <form>
        <TextField
          className="input"
          id="outlined-basic"
          label="Enter Email"
          variant="outlined"
          type="email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(false);
          }}
        />
        <TextField
          className="input"
          id="outlined-basic"
          label="Enter Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
        />

        <Button variant="contained" color="primary" type="submit" onClick={handleLogin} disabled={!validateForm()}>
          Login
        </Button>
        <Link to="/signup">
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
