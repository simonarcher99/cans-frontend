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
    <div>
      <h2>{props.item}</h2>
      <p>{props.quantity}</p>
      <div>
        <Button>+</Button>
        <Button>-</Button>
        <Button onClick={onDeleteHandler}>Delete</Button>
      </div>
    </div>
  );
};

export default Can;
