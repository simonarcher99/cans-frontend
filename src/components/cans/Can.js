import React from "react";

import classes from "./Can.module.css";
import Button from "../UI/Button";
import { BACKEND_URL } from "../../utilities/constants";
import { cansActions } from "../../store/cans-slice";
import { useDispatch } from "react-redux";

const Can = (props) => {
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    fetch(BACKEND_URL + `api/cans/${props.id}`, { method: "DELETE" }).then(
      dispatch(cansActions.deleteItem(props.id))
    );
  };

  const onDecrease = () => {
    const data = { quantity: String(Number(props.quantity - 1)) };
    fetch(BACKEND_URL + `api/cans/${props.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(
      dispatch(cansActions.decreaseItem(props.id))
    );
  };

  const onIncrease = () => {
    const data = { quantity: String(Number(props.quantity) + 1) };
    fetch(BACKEND_URL + `api/cans/${props.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(
      dispatch(cansActions.increaseItem(props.id))
    );
  };

  return (
    <>
      <div className={classes.hr}></div>
      <div className={classes["can-item"]}>
        <h2>{props.item}</h2>
        <div className={classes["can-buttons"]}>
          <div className={classes["edit-buttons"]}>
            <Button onClick={onDecrease}>-</Button>
            <p>{props.quantity}</p>
            <Button onClick={onIncrease}>+</Button>
          </div>
          <Button onClick={onDeleteHandler} className={classes.delete}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default Can;
