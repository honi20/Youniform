import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import * as Font from "@/typography";
import UserItem from "@components/MyPage/UserItem";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  /* border: 1px solid black; */
`;
const Container = styled.div`
  border-radius: 1.25rem;
  width: 90%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 5%;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  ${Font.Medium};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid blue; */
`;
const CloseSvg = (theme) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill={theme.secondary}
        fillOpacity="0.5"
      />
    </svg>
  );
};
const BtnContainer = styled.div`
  /* border: 1px solid black; */
`;
const Profile = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  margin: 5% 0;
  /* border: 1px solid red; */
`;
const ProfileImg = styled.img`
  height: 80px;
  aspect-ratio: 1;
  background-color: aliceblue;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
`;
const ProfileInfo = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  margin: 0 5%;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  /* border: 1px solid red; */
`;
const Nickname = styled.div`
  ${Font.Small}/* border: 1px solid blue; */
`;
const Introduce = styled.div`
  ${Font.XSmall}
  margin-top: 5px;
  font-size: 1rem;
  /* border: 1px solid lightpink; */
`;
const UserSection = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid purple; */
  height: 95px;
  width: 100%;
`;

const ItemWrapper = styled.div`
  width: 95%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #ececec;
  padding: 5% 0;
`;
const DotLine = styled.div`
  width: 1%;
  height: 80%;
  margin-left: 1px;
  border-right: 1px dashed #dadada;
`;
import OrderIcon from "@assets/MyPage/order.svg?react";
import NotebookIcon from "@assets/MyPage/notebook.svg?react";
import GroupIcon from "@assets/Community/Group_light.svg?react";

const ProfileModal = ({ user, isOpen, onClose }) => {
  const theme = useTheme();
  // console.log(user);
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <Container>
        <Header>
          정보
          <BtnContainer onClick={onClose}>{CloseSvg(theme)}</BtnContainer>
        </Header>
        <Profile>
          <ProfileImg src={user.profileUrl} />
          <ProfileInfo>
            <Nickname>{user.nickname}</Nickname>
            <Introduce>{user.introduce}</Introduce>
          </ProfileInfo>
        </Profile>
        <UserSection>
          <ItemWrapper>
            <UserItem
              icon={NotebookIcon}
              text="친구 다이어리"
              onClick={() => console.log("친구 다이어리")}
            />
            <DotLine />
            <UserItem
              icon={OrderIcon}
              text="친구 포스트"
              onClick={() => console.log("친구 포스트")}
            />
            <DotLine />
            <UserItem
              icon={GroupIcon}
              text="친구 신청"
              onClick={() => console.log("친구 신청")}
            />
          </ItemWrapper>
        </UserSection>
      </Container>
    </ModalBackdrop>
  );
};

export default ProfileModal;
