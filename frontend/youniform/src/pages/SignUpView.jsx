import React from "react";
import styled from "styled-components";
import HeaderBackButton from "@components/SignUp/HeaderBackButton";
import StepIndicator from "@components/SignUp/StepIndicator";
import SignUpFormContainer from "@components/SignUp/SignUpFormContainer";
import NextStepButton from "@components/SignUp/Step1/NextStepButton";
import useSignUpStore from "@stores/signUpStore";

const SignUpForm = styled.div`
  display: table;
  width: 100%;
  height: 92vh;
`;

const SignUpView = () => {
  const { step } = useSignUpStore();

  return (
    <SignUpForm>
      <>
        {(step == 2 || step == 3) && <HeaderBackButton />}
        <StepIndicator />
      </>
      <SignUpFormContainer />
      <NextStepButton />
    </SignUpForm>
  );
};

export default SignUpView;
