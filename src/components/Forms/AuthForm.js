import React from "react";
import { authActions } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Button from "../UI/Button";
import { TOKEN_URL } from "../../utilities/constants";
import Card from "../UI/Card";
import classes from "../UI/form.module.css";
import { errorActions } from "../../store/error-slice";

const AuthForm = () => {
  const httpError = useSelector((state) => state.error.httpError);
  const dispatch = useDispatch();

  const {
    value: email,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    reset: emailReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: password,
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
      .then((res) => {
        const json = res.json();
        if (res.ok) {
          return json;
        }
        return json.then((data) => {
          throw new Error(data.non_field_errors);
        });
      })
      .then((data) => {
        console.log(data.token);
        dispatch(authActions.login({ token: data.token }));
      })
      .then((data) => {
        emailReset();
        passwordReset();
        dispatch(errorActions.clearHttpError());
      })
      .catch((error) => {
        dispatch(errorActions.addHttpError({ message: error.message }));
        console.log(error);
        passwordReset();
      });
  };
  return (
    <Card>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <h1>Login</h1>
        <div className={classes["form-control"]}>
          <label>Email</label>
          <input
            value={email}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
          />
        </div>
        {httpError && <p className={classes["error-text"]}>{httpError}</p>}
        <div className={classes["form-actions"]}>
          <Button
            className={classes["form-button"]}
            type="submit"
            onClick={onSubmitHandler}
          >
            Login
          </Button>
          <div>
            <p>
              Don't have an account?{" "}
              <Link className={classes.link} to="/signup">
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
