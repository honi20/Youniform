import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import NotificationToggle from "@components/Setting/NotificationToggle";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from "react-router-dom";
import useUserStore from "@stores/userStore";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  ${Font.Medium}
  margin-bottom: 45px;
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  height: 70%;
  width: 80%;
  margin: 0 auto;
  padding: 20px 0;
`;

const SubTitle = styled.span`
  font-size: 16px;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  cursor: pointer;
`;

const PushAlarm = () => {
  const { pushAlert, playPushAlert, setPushAlert, setPlayPushAlert, accessToken } = useUserStore();

  const [postNotifications, setPostNotifications] = useState(pushAlert);
  const [liveNotifications, setLiveNotifications] = useState(playPushAlert);

  useEffect(() => {
    setPostNotifications(pushAlert);
    setLiveNotifications(playPushAlert);
  }, [pushAlert, playPushAlert]);

  const handlePostToggle = async () => {
    const newValue = !postNotifications;
    setPostNotifications(newValue);
    setPushAlert(newValue); // Zustand 상태 업데이트

    try {
      await axios.patch(`${API_URL}/users/profile/alert`, { pushAlert: newValue }, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
        },
      });
      console.log("게시글 소식 받기 상태가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.log("게시글 소식 받기 상태 업데이트 실패:", error);
    }
  };

  const handleLiveToggle = async () => {
    const newValue = !liveNotifications;
    setLiveNotifications(newValue);
    setPlayPushAlert(newValue); // Zustand 상태 업데이트

    try {
      await axios.patch(`${API_URL}/users/play/alert`, { pushAlert: newValue }, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
        },
      });
      console.log("실시간 방송 소식 받기 상태가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.log("실시간 방송 소식 받기 상태 업데이트 실패:", error);
    }
  };

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('./player');
  };

  return (
    <Container>
      <Title>알림 설정</Title>
      <ContentWrapper>
        <NotificationToggle
          label="게시글 소식 받기"
          enabled={postNotifications}
          onToggle={handlePostToggle}
        />
        <NotificationToggle
          label="실시간 방송 소식 받기"
          enabled={liveNotifications}
          onToggle={handleLiveToggle}
        />
        <SubContainer onClick={handleNavigation}>
          <SubTitle>최애 등장 알림 설정</SubTitle>
          <ArrowRightIcon />
        </SubContainer>
      </ContentWrapper>
    </Container>
  );
};

export default PushAlarm;
