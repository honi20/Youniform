import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import ShareIcon from "@assets/Modal/ShareIcon.svg?react";
import KakaoLogo from "@assets/Modal/KakaoLogo.png";
import X from "@assets/Modal/XLogo.png";
import { TwitterShareButton } from "react-share";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 400px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  border-radius: 1rem 1rem 0 0;
  width: 100.5%;
  height: 32%;
  background-color: white;
  justify-content: space-around;
  padding: 5%;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 70px;
`;

const TitleText = styled.span`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const ShareOptions = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const animateBackground = keyframes`
  0% {
    background-color: white;
  }
  100% {
    background-color: #c6c6c6;
  }
`;

const IconCircle = styled.div`
  display: flex;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid #d9d9d9;
  overflow: hidden;
  cursor: pointer;
  background-color: ${(props) => (props.$copied ? "#120078" : "white")};
  ${(props) =>
    props.$copied &&
    css`
      animation: ${animateBackground} 0.5s forwards;
    `}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SubText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Btn = styled.div`
  display: flex;
  width: 85%;
  height: 15%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: white;
  background-color: #00005c;
  cursor: pointer;
`;

const ShareModal = ({ diary, isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("클립보드 복사 실패:", err);
      });
  };

  const shareToKakao = async () => {
    Kakao.cleanup();
    Kakao.init(API_KEY);

    const currentUrl = window.location.href;

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: diary.diaryDate + ", 오늘의 야구 기록",
        description:
          '최애 선수부터 현장 기록까지, All-in-One 야구 다이어리 "유니폼"',
        imageUrl: diary.diaryImgUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      itemContent: {
        profileText: diary.nickname,
        profileImageUrl:
          diary.profileUrl,
        titleImageUrl:
          "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });
  };

  return (
    <ModalBackdrop>
      <Container>
        <TitleText>다이어리 공유하기</TitleText>
        <ShareOptions>
          <IconWrapper>
            <IconCircle $copied={copied} onClick={copyToClipboard}>
              <ShareIcon />
            </IconCircle>
            <SubText>링크 복사</SubText>
          </IconWrapper>
          <IconWrapper>
            <IconCircle>
              <img src={KakaoLogo} alt="Kakao Logo" onClick={shareToKakao}/>
            </IconCircle>
            <SubText>카카오톡</SubText>
          </IconWrapper>
          <IconWrapper>
            <TwitterShareButton url={window.location.href}>
              <IconCircle style={{ backgroundColor: "black" }}>
                <img src={X} alt="X Logo" style={{ padding: "13px" }} />
              </IconCircle>
            </TwitterShareButton>
            <SubText>X</SubText>
          </IconWrapper>
        </ShareOptions>
        <Btn onClick={onClose}>취소</Btn>
      </Container>
    </ModalBackdrop>
  );
};

export default ShareModal;
