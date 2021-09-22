import React from "react";

import classes from "./Can.module.css";
import Button from "../UI/Button";
import { BACKEND_URL } from "../../utilities/constants";

const Can = (props) => {
  const onDeleteHandler = () => {
    fetch(BACKEND_URL + `api/cans/${props.id}`, { method: "DELETE" }).then(
      props.setCansData((data) => data.filter((el) => el.id !== props.id))
    );
  };

  return (
    <div className={classes["can-item"]}>
      <h2>{props.item}</h2>
      <div className={classes["can-buttons"]}>
        <div className={classes["edit-buttons"]}>
          <Button>-</Button>
          <p>{props.quantity}</p>
          <Button>+</Button>
        </div>
        <Button onClick={onDeleteHandler} className={classes.delete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Can;
