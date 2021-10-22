import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

import { TOKEN_URL } from "../utilities/constants";

const AuthPage = () => {
  const email = "test@test.com";
  const password = "password";

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
    });

  return <h1>This is the login page</h1>;
};

export default AuthPage;
