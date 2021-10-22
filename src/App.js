import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Cans from "./components/cans/Cans";
import Header from "./components/UI/Header";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Header />
        <Cans />
      </Route>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
