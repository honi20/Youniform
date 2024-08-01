import React from 'react';
import styled from 'styled-components';
import SignUpForm from './SignUpForm';

const SignUpFormBox = styled.div`
  display: table-row;
  height: 100%;
`;

const SignUpFormContainer = () => {
  return (
    <SignUpFormBox>
      <SignUpForm />
    </SignUpFormBox>
  );
}

export default SignUpFormContainer;