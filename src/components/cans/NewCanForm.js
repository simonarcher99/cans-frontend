import React from "react";

import Button from "../UI/Button";
import useInput from "../../hooks/use-input";
import { BACKEND_URL } from "../../utilities/constants";

import "./NewCanForm.css";
import { useDispatch, useSelector } from "react-redux";
import { cansActions } from "../../store/cans-slice";
import { uiActions } from "../../store/ui-slice";
import { errorActions } from "../../store/error-slice";

const NewCanForm = (props) => {
  const dispatch = useDispatch();
  const showForm = useSelector((state) => state.ui.formIsVisible);
  const httpError = useSelector((state) => state.error.httpError);
  const authToken = useSelector((state) => state.auth.token);

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
    const formData = { title: item, quantity: quantity };

    const handlePostData = (formData) => {
      fetch(BACKEND_URL + "api/can/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${authToken}`,
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
        .then((data) => {
          console.log(data);
          dispatch(cansActions.addItem(data));
        })
        .then(() => dispatch(errorActions.clearHttpError()))
        .then(() => dispatch(uiActions.toggle()))
        .catch((error) => {
          dispatch(errorActions.addHttpError({ message: error.message }));
          console.log(error);
        });
    };

    handlePostData(formData);

    itemReset();
    quantityReset();
  };

  const toggleFormHandler = () => {
    dispatch(uiActions.toggle());
    dispatch(errorActions.clearHttpError());
    itemReset();
    quantityReset();
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
        <Button
          type="button"
          className="form-button"
          onClick={toggleFormHandler}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <>
      {!showForm && (
        <div className="form-actions  add-button">
          <Button className="form-button" onClick={toggleFormHandler}>
            Add Can
          </Button>
        </div>
      )}
      {showForm && form}
    </>
  );
};

export default NewCanForm;
