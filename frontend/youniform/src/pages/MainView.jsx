// 최애선수 서비스 메인홈
import React from "react";
import styled from "styled-components";
import PlayerComp from "../components/Player/PlayerComp";
import MessageIcon from "../assets/mainview/Message_light.svg?react";
import ChatIcon from "../assets/mainview/Chat_alt_2_light.svg?react";
import HeartIcon from "../assets/mainview/Add_ring_light.svg?react";
import { useNavigate } from "react-router-dom";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  height: calc(100vh - 120px); // navbar + header
  background-color: #f8f8f8;
`;
const Container = styled.div`
/* margin-top: 3%; */
  border: 1px solid black;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
`;
const Btn = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  color: #262f66;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;
const TextContainer = styled.div`
  color: #262f66;
  font-family: "Pretendard";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const MainView = () => {
  const navigate = useNavigate();
  return (
    <Div>
      <PlayerComp />
      <Container>
        <Btn onClick={() => navigate("/news")}>
          <IconWrapper>
            <MessageIcon />
          </IconWrapper>
          <TextContainer>야구 뉴스</TextContainer>
        </Btn>
        <Btn onClick={() => console.log("chat")}>
          <IconWrapper>
            <ChatIcon />
          </IconWrapper>
          <TextContainer>응원 채팅</TextContainer>
        </Btn>
        <Btn onClick={() => navigate("/select-player")}>
          <IconWrapper>
            <HeartIcon />
          </IconWrapper>
          <TextContainer>선수 설정</TextContainer>
        </Btn>
      </Container>
    </Div>
  );
};

export default MainView;
