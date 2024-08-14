import React, { useState } from "react";
import styled from "styled-components";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import NextStepButton from "./NextStepButton";
import useSignUpStore from "@stores/signUpStore";

const InputForm = styled.div`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 18px;
`;

const StepIndicatorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => (props.$step !== 4 ? "15%" : "3%")};
`;

const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#262F66" : "#e0e0e0")};
  color: ${(props) => (props.$active ? "#fff" : "#9e9e9e")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: background-color 0.4s ease-in-out;
`;

const StepBar = styled.div`
  width: 23px;
  height: 1px;
  background-image: linear-gradient(to right, ${"#a1a1a1"} 50%, transparent 50%);
  background-size: 8px 2px;
  background-repeat: repeat-x;
  margin: 0 8px;
`;

const SignUpText = styled.div`
  font-size: 1.7rem;
  font-weight: 800;
  color: #262F66;
  text-align: center;
  margin-top: 2.2rem;
  margin-bottom: 2rem;
  letter-spacing: -1px;
`;

const StepOneForm = () => {
  
  const [emailInput, setEmailInput] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const step = 1;

  const handleNextStep = () => {
    // if (isVerified && isPasswordVerified && isPasswordMatch) {
      // 다음 스텝으로 진행
      console.log("다음 스텝으로 진행합니다.");
    // }
  };

  return (
    <InputForm>
      <StepIndicatorBox $step={step}>
        {[1, 2, 3, 4].map((num, index) => (
          <React.Fragment key={index}>
            <StepCircle $active={num === step}>{num}</StepCircle>
            {num < 4 && <StepBar $active={num < step} />}
          </React.Fragment>
        ))}
      </StepIndicatorBox>
      <SignUpText>회원가입</SignUpText>
      <EmailInput 
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        setStatusMsg={setStatusMsg}
        statusMsg={statusMsg}
      />
      <PasswordInput
        isPasswordVerified={isPasswordVerified}
        isPasswordMatch={isPasswordMatch}
        setIsPasswordVerified={setIsPasswordVerified}
        setIsPasswordMatch={setIsPasswordMatch}
      />
      <NextStepButton
        step="1"
        isPasswordVerified={isPasswordVerified}
        isPasswordMatch={isPasswordMatch}
      />
    </InputForm>
  );
}

export default StepOneForm;
