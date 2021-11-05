import SignupForm from "../components/Forms/SignupForm";
import Header from "../components/UI/Header";

const SignupPage = () => {
  return (
    <>
      <Header login={true} />
      <SignupForm />
    </>
  );
};

export default SignupPage;
