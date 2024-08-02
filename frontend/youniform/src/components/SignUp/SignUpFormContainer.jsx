import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const SignUpFormBox = styled.div`
  display: table-row;
  height: 100%;
  padding-bottom: 50px;
`;

const SignUpFormContainer = () => {
  return (
    <SignUpFormBox>
      <Outlet />
    </SignUpFormBox>
  );
};

export default SignUpFormContainer;