import React from "react";

import classes from "./Can.module.css";
import Button from "../UI/Button";
import { BACKEND_URL } from "../../utilities/constants";
import { cansActions } from "../../store/cans-slice";
import { useDispatch, useSelector } from "react-redux";

const Can = (props) => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);

  const onDeleteHandler = () => {
    fetch(BACKEND_URL + `api/can/${props.id}`, {
      method: "DELETE",
      headers: { Authorization: `Token ${authToken}` },
    }).then(dispatch(cansActions.deleteItem(props.id)));
  };

  const onDecrease = () => {
    if (props.quantity < 1) {
      return;
    }
    const data = { quantity: String(Number(props.quantity - 1)) };
    fetch(BACKEND_URL + `api/can/${props.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    }).then(dispatch(cansActions.decreaseItem(props.id)));
  };

  const onIncrease = () => {
    const data = { quantity: String(Number(props.quantity) + 1) };
    fetch(BACKEND_URL + `api/can/${props.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${authToken}`,
      },
    }).then(dispatch(cansActions.increaseItem(props.id)));
  };

  const decreaseButtonClass =
    props.quantity === 0
      ? classes["can-button-disabled"]
      : classes["can-button-decrease"];

  return (
    <>
      <div className={classes.hr}></div>
      <div className={classes["can-item"]}>
        <h2>{props.item}</h2>
        <div className={classes["can-buttons"]}>
          <div className={classes["edit-buttons"]}>
            <Button className={decreaseButtonClass} onClick={onDecrease}>
              -
            </Button>
            <p>{props.quantity}</p>
            <Button
              className={classes["can-button-increase"]}
              onClick={onIncrease}
            >
              +
            </Button>
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
