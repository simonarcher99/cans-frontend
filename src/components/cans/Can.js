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
      props.setCansData((data) =>
        data.map((item) => {
          if (item.id === props.id) {
            return {
              quantity: String(Number(item.quantity) - 1),
              id: item.id,
              item: item.item,
            };
          } else {
            return { ...item };
          }
        })
      )
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
      props.setCansData((data) =>
        data.map((item) => {
          if (item.id === props.id) {
            return {
              quantity: String(Number(item.quantity) + 1),
              id: item.id,
              item: item.item,
            };
          } else {
            return { ...item };
          }
        })
      )
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
