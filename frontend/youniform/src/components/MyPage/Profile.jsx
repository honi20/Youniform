import React, { useEffect } from "react";
import styled from "styled-components";
import useUserStore from "../../stores/userStore";
import * as Font from "@/typography";

const ProfileSection = styled.div`
  box-sizing: border-box;
  margin: 0 5%;
  height: 100px;
  display: flex;
  /* border: 1px solid red; */
`;
const ProfileImage = styled.div`
  box-sizing: border-box;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid blue; */
`;
const ProfileInfo = styled.div`
  box-sizing: border-box;
  flex: 1;
  margin: 0 5%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  /* border: 1px solid rebeccapurple; */
`;
const Nickname = styled.div`
  ${Font.Small}
  box-sizing: border-box;
  /* border: 1px solid red; */
`;
const Introduce = styled.div`
  ${Font.XSmall}
  box-sizing: border-box;
  display: flex;
  margin-top: 5px;
  font-size: 1rem;
  /* border: 1px solid blue; */
`;

const ProfileComp = () => {
  const { user, loading, error, fetchUser, clearUser } = useUserStore();

  useEffect(() => {
    // fetchUser();
  }, [fetchUser]);
  return (
    <ProfileSection>
      <ProfileImage onClick={() => console.log("프로필 사진 변경")}>
        <img src={user.profileUrl} />
      </ProfileImage>
      <ProfileInfo>
        <Nickname>{user.nickname}</Nickname>
        <Introduce>{user.introduce}</Introduce>
      </ProfileInfo>
    </ProfileSection>
  );
};

const UserSection = styled.div`
  box-sizing: border-box;
  margin: 0 5%;
  height: 17%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`;
const ItemWrapper = styled.div`
  width: 95%;
  height: 90%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
`;
const UserItem = styled.div`
  ${Font.Small}
  width: 32%;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid blue; */
`;
const DotLine = styled.div`
  width: 1%;
  height: 80%;
  margin-left: 1px;
  border-right: 1px dashed #dadada;
`;
const IconWrapper = styled.div`
  height: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9d9d9d1a;
  margin-bottom: 10px;
  /* border: 1px solid black; */
`;
import OrderIcon from "@assets/MyPage/order.svg?react";
import NotebookIcon from "@assets/MyPage/notebook.svg?react";
import EditIcon from "@assets/MyPage/edit.svg?react";
const UserComp = () => {
  return (
    <>
      <UserSection>
        <ItemWrapper>
          <UserItem onClick={() => console.log("나의 다이어리")}>
            <IconWrapper>
              <NotebookIcon />
            </IconWrapper>
            나의 다이어리
          </UserItem>
          <DotLine />
          <UserItem onClick={() => console.log("나의 포스트")}>
            <IconWrapper>
              <OrderIcon />
            </IconWrapper>
            나의 포스트
          </UserItem>
          <DotLine />
          <UserItem onClick={() => console.log("프로필 변경")}>
            <IconWrapper>
              <EditIcon />
            </IconWrapper>
            프로필 변경
          </UserItem>
        </ItemWrapper>
      </UserSection>
    </>
  );
};

const SocialSection = styled.div`
  box-sizing: border-box;
  margin: 0 5%;
  height: 15%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 2%;
  /* border: 1px solid red; */
`;
const SocialItem = styled.div`
  box-sizing: border-box;
  width: 46.5%;
  height: 90%;
  border-radius: 10px;
  background-color: #9d9d9d1a;
  flex-wrap: wrap;
  display: flex;
  padding: 5%;
  /* border: 1px solid black; */
`;
const SocialHeader = styled.div`
  ${Font.Small}
  width: 100%;
  height: 30%;
  /* border: 1px solid red; */
`;
const SocialContent = styled.div`
  width: 75%;
  height: 70%;
  padding-top: 3%;
  /* border: 1px solid blue; */
`;
import GroupIcon from "@assets/MyPage/group.svg?react";
import ArchiveIcon from "@assets/MyPage/archive.svg?react";
const SocialComp = () => {
  return (
    <>
      <SocialSection>
        <SocialItem onClick={() => console.log("친구 관리")}>
          <SocialHeader>친구 관리</SocialHeader>
          <SocialContent>33</SocialContent>
          <div
            style={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <GroupIcon />
          </div>
        </SocialItem>
        <SocialItem onClick={() => console.log("좋아요한 포스트")}>
          <SocialHeader>좋아요한 포스트</SocialHeader>
          <SocialContent>10</SocialContent>
          <div
            style={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <ArchiveIcon />
          </div>
        </SocialItem>
      </SocialSection>
    </>
  );
};
const Profile = () => {
  return (
    <>
      <ProfileComp />
      <UserComp />
      <SocialComp />
    </>
  );
};

export default Profile;
