import React, { useState } from "react";

import Button from "../UI/Button";
import useInput from "../../hooks/use-input";
import { BACKEND_URL } from "../../utilities/constants";

import "./NewCanForm.css";
import classes from "./Can.module.css";

const NewCanForm = (props) => {
  const [httpError, setHttpError] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

    const handlePostData = (formData) => {
      fetch(BACKEND_URL + "api/cans", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        })
        .then((data) => data.data)
        .then((data) => props.setCansData((state) => [...state, data]))
        .catch((error) => {
          setHttpError(error.message);
          console.log(error.message);
        });
    };

    handlePostData(formData);

    itemReset();
    quantityReset();
  };

  const showFormHandler = () => {
    setShowForm(true);
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };

  const form = (
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
      {httpError && <p className="error-text">{httpError}</p>}
      <div className="form-actions">
        <Button
          className="form-button"
          onClick={() => {
            itemBlurHandler();
            quantityBlurHandler();
          }}
        >
          Submit
        </Button>
        <Button onClick={hideFormHandler}>Cancel</Button>
      </div>
    </form>
  );

  return (
    <>
      {!showForm && <Button onClick={showFormHandler}>Add Can</Button>}
      {showForm && form}
    </>
  );
};

export default NewCanForm;
