import React from 'react';
import styled from 'styled-components';
import useAlertStore from '@stores/alertStore';
import useUserStore from '@stores/userStore';
import AlarmIcon from "@assets/Modal/AlarmIcon.svg?react";

const Modal = styled.div`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px 20px;
  border-radius: 15px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
  svg, img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #262F66;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #1f274f;
  }
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #262F66;
  background-color: white;
  border: 1px solid #262F66;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const SSEAlertModal = () => {
  const { currentAlert, clearCurrentAlert } = useAlertStore();
  const { user } = useUserStore();  // 유저 정보를 가져옴

  if (!currentAlert || !user) return null;

  // 알림 조건 확인
  if (
    (currentAlert.type === 'ANNOUNCEMENT' && !user.playPushAlert) ||
    (currentAlert.type === 'POST_COMMENT' && !user.pushAlert)
  ) {
    return null; // 조건이 맞지 않으면 모달을 띄우지 않음
  }

  const handleActionClick = () => {
    if (currentAlert.type === 'POST_COMMENT') {
      window.location.href = `http://localhost:5173/post/${currentAlert.pk}`;
    } else if (currentAlert.type === 'FRIEND_REQUEST') {
      window.location.href = `http://localhost:5173/my-page/friend-list`;
    }
    clearCurrentAlert();
  };

  // 알림 타입에 따른 아이콘, 제목과 내용 구성
  const renderContent = () => {
    switch (currentAlert.type) {
      case 'PLAYER_APPEARANCE':
        return {
          icon: <AlarmIcon />,
          title: '최애 선수 등장',
          content: `${currentAlert.content}`,
        };
      case 'POST_COMMENT':
        return {
          icon: <img src={currentAlert.senderProfileUrl || "https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/no_profile.png"} alt="Profile" />,
          title: '포스트 댓글',
          content: `${currentAlert.senderNickname || "Youniform"}님이 댓글을 남겼습니다.`,
          actionButton: <ActionButton onClick={handleActionClick}>보러가기</ActionButton>,
        };
      case 'FRIEND_REQUEST':
        return {
          icon: <img src={currentAlert.senderProfileUrl || "https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/no_profile.png"} alt="Profile" />,
          title: '친구 요청',
          content: `${currentAlert.senderNickname || "Youniform"}님이 친구 요청을 보냈습니다.`,
          actionButton: <ActionButton onClick={handleActionClick}>보러가기</ActionButton>,
        };
      case 'ANNOUNCEMENT':
        return {
          icon: <AlarmIcon />,
          title: '최강야구 방송 시작',
          content: `${currentAlert.content}`,
        };
      default:
        return {
          icon: <AlarmIcon />,
          title: '알림',
          content: `${currentAlert.content}`,
        };
    }
  };

  const { icon, title, content, actionButton } = renderContent();

  return (
    <Modal $isVisible={!!currentAlert}>
      <ModalContent>
        <IconContainer>{icon}</IconContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <ButtonContainer>
          {actionButton}
          <ConfirmButton onClick={clearCurrentAlert}>확인</ConfirmButton>
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};

export default SSEAlertModal;
