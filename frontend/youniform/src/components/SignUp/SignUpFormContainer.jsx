import React from 'react';
import styled from 'styled-components';
// import { Outlet } from 'react-router-dom';
import EmailInput from './Step1/EmailInput';
import PasswordInput from './Step1/PasswordInput';

const SignUpFormBox = styled.div`
  display: table-row;
  height: 100%;
  padding-bottom: 50px;
`;

const SignUpFormContainer = () => {
  return (
    <SignUpFormBox>
      <EmailInput />
      <PasswordInput />
    </SignUpFormBox>
  );
};

export default SignUpFormContainer;
