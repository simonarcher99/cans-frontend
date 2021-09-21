import React from "react";

import Button from "../UI/Button";
import useInput from "../../hooks/use-input";
import { BACKEND_URL } from "../../utilities/constants";

import "./NewCanForm.css";

const NewCanForm = (props) => {
  const {
    value: item,
    isValid: itemIsValid,
    hasError: itemHasError,
    inputBlurHandler: itemBlurHandler,
    valueChangeHandler: itemChangeHandler,
    reset: itemReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: quantity,
    isValid: quantityIsValid,
    hasError: quantityHasError,
    inputBlurHandler: quantityBlurHandler,
    valueChangeHandler: quantityChangeHandler,
    reset: quantityReset,
  } = useInput((value) => Number(value) > 0);

  const itemClasses = itemHasError ? "form-control invalid" : "form-control";

  const quantityClasses = quantityHasError
    ? "form-control invalid"
    : "form-control";

  let formIsValid = false;

  if (quantityIsValid && itemIsValid) {
    formIsValid = true;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const formData = { item: item, quantity: quantity };

    console.log(item, quantity);
    fetch(BACKEND_URL + "api/cans", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    itemReset();
    quantityReset();
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className={itemClasses}>
        <label>Item</label>
        <input
          value={item}
          onBlur={itemBlurHandler}
          onChange={itemChangeHandler}
        />
        {itemHasError && (
          <p className="error-text">Please input a valid item</p>
        )}
      </div>
      <div className={quantityClasses}>
        <label>Quantity</label>
        <input
          value={quantity}
          onBlur={quantityBlurHandler}
          onChange={quantityChangeHandler}
        />
        {quantityHasError && (
          <p className="error-text">Please input a quantity greater than 0</p>
        )}
      </div>
      <div className="form-actions">
        <Button className="form-button">Submit</Button>
      </div>
    </form>
  );
};

export default NewCanForm;
