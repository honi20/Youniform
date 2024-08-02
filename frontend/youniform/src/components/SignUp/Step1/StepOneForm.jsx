import React from 'react'
import styled from 'styled-components';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

const InputForm = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 18px;
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
  return (
    <InputForm>
      <SignUpText>회원가입</SignUpText>
      <EmailInput />
      <PasswordInput />
    </InputForm>
  )
}

export default StepOneForm
