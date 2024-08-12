import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import useSignUpStore from "@stores/signUpStore";

const Header = styled.div`
  display: flex;
  width: 90%;
  margin: 2rem auto;
  align-items: center;
  text-align: center;
`;

const SignUpText = styled.span`
  font-size: 17px;
  font-weight: 600;
  width: 88%;
`;

const HeaderBackButton = () => {
  const { step, setStep } = useSignUpStore();
  const navigate = useNavigate();

  const handleBackBtn = () => {
    const newStep = step > 1 && step < 4 ? step - 1 : undefined;
    if (newStep != undefined) {
      setStep(newStep);
      navigate(`/sign-up/step-${newStep}`);
    }
  };

  return (
    <Header>
      <ArrowBackIcon onClick={handleBackBtn} />
      <SignUpText>회원가입</SignUpText>
    </Header>
  );
};

export default HeaderBackButton;
