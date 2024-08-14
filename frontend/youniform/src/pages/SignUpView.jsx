import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import HeaderBackButton from "@components/SignUp/HeaderBackButton";
import StepIndicator from "@components/SignUp/StepIndicator";
import useSignUpStore from "@stores/signUpStore";
import NextStepButton from "../components/SignUp/Step1/NextStepButton";

const SignUpForm = styled.div`
  display: table;
  width: 100%;
  height: 92vh;
`;

const SignUpView = () => {
  const { step, setStep } = useSignUpStore();
  const navigate = useNavigate();

  useEffect(() => {
    const storedStep = localStorage.getItem("step");
    // if (isRefreshing) {
    //   setStep(1);
    //   localStorage.setItem("step", "1");
    //   navigate("/sign-up/step-1");
    // } else if (storedStep) {
    //   const currentStep = parseInt(storedStep, 10);
    //   if (currentStep > 0 && currentStep <= 4) {
    //     setStep(currentStep);
    //     navigate(`/sign-up/step-${currentStep}`);
    //   } else {
    //     setStep(1);
    //     localStorage.setItem("step", "1");
    //     navigate("/sign-up/step-1");
    //   }
    // } else {
    //   setStep(1);
    //   localStorage.setItem("step", "1");
    //   navigate("/sign-up/step-1");
    // }
  }, [navigate, setStep]);

  return (
    <SignUpForm>
      <Outlet />
    </SignUpForm>
  );
};

export default SignUpView;
