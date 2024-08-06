import React from "react";
import styled, { keyframes } from "styled-components";
import * as Font from "@/typography";
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid ${(props) => props.theme.primary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
`;

const LoadingMessage = styled.div`
  ${Font.Small}
  font-weight: 300;
  margin-top: 10px;
`;
const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingMessage>Loading...</LoadingMessage>
    </LoadingContainer>
  );
};

export default Loading;
