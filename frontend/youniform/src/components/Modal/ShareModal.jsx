import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ShareIcon from '@assets/Modal/ShareIcon.svg?react';
import Instagram from '@assets/Modal/InstagramLogo.png';
import X from '@assets/Modal/XLogo.png';
import { TwitterShareButton } from "react-share";

const ModalBackdrop = styled.div`
  position: fixed;  // Changed from absolute to fixed
  top: 0;           // Make sure it covers the whole screen
  left: 0;          // Set to top-left corner
  width: 100%;
  max-width: 400px;
  height: 100%;     // Make sure it covers the whole screen
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    background-color: #4caf50;
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

const ShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('effa2e35c7eae72bf635ecdf75d2e618');
    console.log(Kakao.isInitialized());
  }, []);

  const shareToKakao = async () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '나의 다이어리를 구경해봐~',
        description: '아메리카노, 빵, 케익',
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      itemContent: {
        profileText: 'Kakao',
        profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        titleImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        titleImageText: 'Cheese cake',
        titleImageCategory: 'Cake',
        items: [
          { item: 'Cake1', itemOp: '1000원' },
          { item: 'Cake2', itemOp: '2000원' },
          { item: 'Cake3', itemOp: '3000원' },
          { item: 'Cake4', itemOp: '4000원' },
          { item: 'Cake5', itemOp: '5000원' },
        ],
        sum: '총 결제금액',
        sumOp: '15000원',
      },
      social: { likeCount: 10, commentCount: 20 },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
        {
          title: '앱으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
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
            <IconCircle copied={copied} onClick={copyToClipboard}>
              <ShareIcon />
            </IconCircle>
            <SubText>링크 복사</SubText>
          </IconWrapper>
          <IconWrapper>
            <IconCircle>
              <img src={Instagram} alt="Instagram Logo" onClick={shareToKakao} />
            </IconCircle>
            <SubText>Instagram</SubText>
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
