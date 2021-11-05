import React from "react";

import AuthForm from "../components/Forms/AuthForm";
import Header from "../components/UI/Header";

const AuthPage = () => {
  return (
    <>
      <Header register={true} />
      <AuthForm />
    </>
  );
};

export default AuthPage;
