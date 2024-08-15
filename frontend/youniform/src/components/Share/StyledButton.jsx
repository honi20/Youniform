import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 80%;
  width: 35%;
  text-align: center;
  color: #090909;
  padding: 0.7em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  cursor: pointer;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  }
`;

const ButtonComponent = () => {
  return (
    <StyledButton>LOGOUT</StyledButton>
  );
};

export default ButtonComponent;