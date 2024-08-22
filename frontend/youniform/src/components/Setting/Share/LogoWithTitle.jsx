import React, { useState } from 'react';
import styled from 'styled-components';
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

const ChangePassword = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: center;
`;

const LoginLogo = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 5px;
`;

const ChangePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  margin-top: 3%;
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -1px;
  color: #000078;
`;

const SubTitle = styled.span`
  font-size: 14px;
  margin-bottom: 2rem;
  line-height: 1.2rem;
`;

const stateMap = {
  ChangePassword: {
    title: "비밀번호 변경",
    subtitle:
    <>
      기존 비밀번호와 변경할 <br /> 새 비밀번호를 입력해주세요.
    </>,
  },
  AlarmSetting: {
    title: "알림 설정",
  }
};

const LogoWithTitle = ({ state }) => {
  const currentState = stateMap[state];

  if (!currentState) {
    return null; // state가 잘못되었을 경우
  }

  return (
    <ChangePassword>
      <ChangePasswordContainer>
        <Title>{currentState.title}</Title>
        <SubTitle>{currentState.subtitle}</SubTitle>
      </ChangePasswordContainer>
    </ChangePassword>
  );
};

export default LogoWithTitle;
