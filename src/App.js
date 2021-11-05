import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import Cans from "./components/cans/Cans";
import Header from "./components/UI/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { authActions } from "./store/auth-slice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      console.log(sessionStorage.getItem("token"));
      dispatch(authActions.login({ token: sessionStorage.getItem("token") }));
    }
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn && (
          <>
            <Header />
            <Cans />
          </>
        )}
        {!isLoggedIn && <Redirect to="/login" />}
      </Route>
      {!isLoggedIn && (
        <Route path="/login">
          <LoginPage />
        </Route>
      )}
      {!isLoggedIn && (
        <Route path="/signup">
          <SignupPage />
        </Route>
      )}
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
