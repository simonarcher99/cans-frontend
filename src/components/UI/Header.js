import React from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Header.module.css";
import Button from "./Button";
import { authActions } from "../../store/auth-slice";

const Header = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={classes.header}>
      <h1>CanCounter</h1>
      <div className={classes["header-buttons"]}>
        {props.login && <Button>Login</Button>}
        {props.register && <Button>Register</Button>}
        {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
      </div>
    </div>
  );
};

export default Header;
