import React from "react";
import styled, { keyframes } from "styled-components";
import * as Font from "@/typography"; // 기존의 폰트 스타일을 가져오는 경로를 확인하세요.

// 에러 아이콘 애니메이션
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

// 스타일 정의
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 80px;
  color: ${(props) => props.theme.error};
  animation: ${bounce} 1s infinite;
`;

const ErrorMessage = styled.div`
  ${Font.Large}
  font-weight: 600;
  color: ${(props) => props.theme.error};
  margin-top: 20px;
`;

const ErrorDescription = styled.div`
  ${Font.Medium}
  color: ${(props) => props.theme.text};
  margin-top: 10px;
`;

const BackLink = styled.a`
  ${Font.Small}
  color: ${(props) => props.theme.primary};
  margin-top: 20px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const Error = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorMessage>{message}</ErrorMessage>
      {/* <ErrorDescription>
        We couldn't find what you're looking for. Please try again later.
      </ErrorDescription> */}
      <BackLink href="/">Go Back to Home</BackLink>
    </ErrorContainer>
  );
};

export default Error;
