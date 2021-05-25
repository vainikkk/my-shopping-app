import React from "react";
import { Button, IconButton } from "@material-ui/core";
import "./Navbar.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import logo from "../../logo.svg";
import { useDispatch } from "react-redux";

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = localStorage.getItem("token");
  const handleSignOut = () => {
    localStorage.clear();
    dispatch({ type: "LOG_OUT" });
    history.push("/");
  };
  return (
    <div className="navbar">
      <div className="navbar_left">
        <Link to="/">
          <div className="navbar_logo">
            <img src={logo} alt="Canvase logo" />
          </div>
        </Link>
      </div>
      <div className="navbar_right">
        <NavLink exact to="/">
          <Button className="navbar_button">Home</Button>
        </NavLink>
        {!user && (
          <Button className="navbar_button" onClick={() => history.push("/login")}>
            Login
          </Button>
        )}
        {user && (
          <Button className="navbar_button" onClick={handleSignOut}>
            Log Out
          </Button>
        )}
      </div>
      <div className="navbar_right_hide">
        <IconButton className="navbar_button_hide" onClick={handleSignOut}>
          E
        </IconButton>
      </div>
    </div>
  );
}

export default Navbar;
