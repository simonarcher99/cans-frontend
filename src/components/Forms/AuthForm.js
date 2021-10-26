import React from "react";
import { authActions } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/use-input";
import Button from "../UI/Button";
import { TOKEN_URL } from "../../utilities/constants";

const AuthForm = () => {
  const dispatch = useDispatch();

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    reset: emailReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== "");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    fetch(TOKEN_URL, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.token);
        dispatch(authActions.login({ token: data.token }));
      })
      .then((data) => {
        emailReset();
        passwordReset();
      });
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label>Email</label>
        <input
          value={email}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
        />
      </div>
      <button type="submit" onClick={onSubmitHandler}>
        Login
      </button>
    </form>
  );
};

export default AuthForm;
