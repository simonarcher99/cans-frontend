import Card from "../UI/Card";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";
import { useHistory } from "react-router";

import classes from "../UI/form.module.css";
import { BACKEND_URL } from "../../utilities/constants";

const SignupForm = () => {
  const history = useHistory();

  const {
    value: name,
    inputBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

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

  const {
    value: passwordConfirmation,
    inputBlurHandler: passwordConfirmationBlurHandler,
    valueChangeHandler: passwordConfirmationChangeHandler,
    reset: passwordConfirmationReset,
  } = useInput((value) => value.trim() !== "");

  const signupHandler = (event) => {
    const formData = {
      email: email,
      name: name,
      password: password,
    };

    event.preventDefault();
    fetch(BACKEND_URL + "api/user/create/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((data) => {
        nameReset();
        emailReset();
        passwordReset();
        passwordConfirmationReset();
      })
      .then((data) => history.push("/login"));
  };

  return (
    <Card>
      <form onSubmit={signupHandler}>
        <h1>Create Account</h1>
        <div className={classes["form-control"]}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Email</label>
          <input
            type="text"
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
        <div className={classes["form-control"]}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={passwordConfirmation}
            onBlur={passwordConfirmationBlurHandler}
            onChange={passwordConfirmationChangeHandler}
          />
        </div>
        <Button>Sign-Up</Button>
      </form>
    </Card>
  );
};

export default SignupForm;
