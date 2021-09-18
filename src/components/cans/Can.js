import React from "react";

import classes from "./Can.module.css";
import Button from "../UI/Button";

const Can = (props) => {
  return (
    <div>
      <h2>{props.item}</h2>
      <p>{props.quantity}</p>
      <div>
        <Button>+</Button>
        <Button>-</Button>
      </div>
    </div>
  );
};

export default Can;
