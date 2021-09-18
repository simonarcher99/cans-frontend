import React from "react";

import classes from "./Header.module.css";
import Button from "./Button";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes["header-buttons"]}>
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
    </div>
  );
};

export default Header;
