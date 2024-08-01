import React from 'react';
import styled from 'styled-components';
import StepIndicator from './StepIndicator';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

const SignUpFormContainer = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-bottom: 50px;
`;

const SignUpText = styled.div`
  font-size: 1.7rem;
  font-weight: 800;
  color: #262F66;
  text-align: center;
  margin-top: 2.2rem;
  margin-bottom: 3.5rem;
  letter-spacing: -1px;
`;

const InputForm = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 18px;
`;

const SignUpForm = () => {
  return (
    <SignUpFormContainer>
      <StepIndicator />
      <SignUpText>회원가입</SignUpText>
      <InputForm>
        <EmailInput />
        <PasswordInput />
      </InputForm>
    </SignUpFormContainer>
  );
}

export default SignUpForm;
