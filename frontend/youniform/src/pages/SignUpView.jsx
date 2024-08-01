import React from 'react';
import styled from 'styled-components';
import SignUpFormContainer from '../components/SignUp/SignUpFormContainer';
import NextStepButton from '../components/SignUp/NextStepButton';

const SignUpForm = styled.div`
  display: table;
  width: 100%;
  height: 92vh;
`;

const SignUpView = () => {
  return (
    <SignUpForm>
      <SignUpFormContainer />
      <NextStepButton />
    </SignUpForm>
  );
}

export default SignUpView;