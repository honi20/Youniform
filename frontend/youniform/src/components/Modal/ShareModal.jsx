import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import ShareIcon from '@assets/Modal/ShareIcon.svg?react';
import Instagram from '@assets/Modal/InstagramLogo.png';
import X from '@assets/Modal/XLogo.png';

import { TwitterShareButton } from "react-share";

const ModalBackdrop = styled.div`
  position: fixed;
  width: 400px;
  height: calc(100% - 45px);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 5;
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
    background-color: #4caf50; /* 원하는 색상으로 변경 */
  }
`;

const IconCircle = styled.div`
  display: flex;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid #D9D9D9;
  overflow: hidden; 
  cursor: pointer;
  
  /* 애니메이션 적용 */
  background-color: ${({ copied }) => (copied ? "#120078" : "white")};
  animation: ${({ copied }) => copied && `${animateBackground} 0.5s forwards`};

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

const ShareModal = () => {
  const [copied, setCopied] = useState(false);

  // test code
  const [imageUrl, setImageUrl] = useState("https://youniforms3.s3.ap-northeast-2.amazonaws.com/diary/upload_2024-08-13_04_58_52.png");

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('클립보드 복사 실패:', err);
      });
  };
  
  const urlToBlob = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
  };

  const shareToInstagramStory = async () => {
        try {
            const blob = await urlToBlob(imageUrl);
            const file = blobToFile(blob, 'share_image.png');
            
            const formData = new FormData();
            formData.append("file", file);

            const instagramIntent = `intent://story#Intent;package=com.instagram.android;scheme=instagram;end`;

            // 실제 기기에서만 테스트 가능
            window.location.href = instagramIntent;
        } catch (error) {
            console.error("Error sharing to Instagram Story", error);
        }
    };

  const currentUrl = window.location.href;

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
              <img src={Instagram} alt="Instagram Logo"
              onClick={shareToInstagramStory}/>
            </IconCircle>
            <SubText>Instagram</SubText>
          </IconWrapper>
          <IconWrapper>
            <TwitterShareButton url={currentUrl}>
              <IconCircle style={{ backgroundColor: "black" }}>
                <img src={X} alt="X Logo" style={{ padding: "13px" }} />
              </IconCircle>
            </TwitterShareButton>
            <SubText>X</SubText>
          </IconWrapper>
        </ShareOptions>
        <Btn>취소</Btn>
      </Container>
    </ModalBackdrop>
  );
};

export default ShareModal;
