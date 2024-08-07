import React, { useEffect } from "react";
import styled from "styled-components";
import useUserStore from "../../stores/userStore";
import * as Font from "@/typography";
import { useNavigate } from "react-router-dom";
import Loading from "@components/Share/Loading";
import Error from "@components/Share/Error";

const Section = styled.div`
  box-sizing: border-box;
  margin: 0 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
`;
const Container = styled.div`
  padding: 5%;
  height: calc(100vh - 120px);
  border: 1px solid black;
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ProfileSection = styled(Section)`
  height: 100px;
`;
const ProfileImage = styled.div`
  box-sizing: border-box;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    /* border: 1px solid black; */
  }
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
  ${Font.Small}/* border: 1px solid red; */
`;
const Introduce = styled.div`
  ${Font.XSmall}
  margin-top: 5px;
  font-size: 1rem;
  /* border: 1px solid blue; */
`;

const ProfileComp = () => {
  const { user, fetchUser, clearUser, loading, error } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUser();
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchData();

    // Cleanup on unmount
    return () => clearUser();
  }, [fetchUser, clearUser]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!user) {
    return <div>No user data available</div>;
  }
  return (
    <ProfileSection>
      <ProfileImage onClick={() => console.log("프로필 사진 변경")}>
        <img src={user.profileUrl} alt="Profile" />
      </ProfileImage>
      <ProfileInfo>
        <Nickname>{user.nickname}</Nickname>
        <Introduce>{user.introduce}</Introduce>
      </ProfileInfo>
    </ProfileSection>
  );
};

const UserSection = styled(Section)`
  height: 17%;
  width: 90%;
`;

const ItemWrapper = styled.div`
  width: 95%;
  height: 90%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserItemContainer = styled(FlexBox)`
  ${Font.Small}
  width: 32%;
  flex-direction: column;
`;

const DotLine = styled.div`
  width: 1%;
  height: 80%;
  margin-left: 1px;
  border-right: 1px dashed #dadada;
`;

const IconWrapper = styled(FlexBox)`
  height: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #9d9d9d1a;
  margin-bottom: 10px;
`;
import OrderIcon from "@assets/MyPage/order.svg?react";
import NotebookIcon from "@assets/MyPage/notebook.svg?react";
import EditIcon from "@assets/MyPage/edit.svg?react";
import UserItem from "./UserItem";

// 유저 컴포넌트
const UserComp = () => {
  const navigate = useNavigate();
  return (
    <UserSection>
      <ItemWrapper>
        <UserItem
          icon={NotebookIcon}
          text="나의 다이어리"
          onClick={() => console.log("나의 다이어리")}
        />
        <DotLine />
        <UserItem
          icon={OrderIcon}
          text="나의 포스트"
          onClick={() => navigate("./my-post")}
        />
        <DotLine />
        <UserItem
          icon={EditIcon}
          text="프로필 변경"
          onClick={() => navigate("./change-profile")}
        />
      </ItemWrapper>
    </UserSection>
  );
};
const SocialSection = styled(Section)`
  height: 15%;
  width: 90%;
`;
const SocialItem = styled(FlexBox)`
  box-sizing: border-box;
  width: 46.5%;
  height: 90%;
  border-radius: 10px;
  background-color: #9d9d9d1a;
  flex-wrap: wrap;
  padding: 5%;
`;

const SocialHeader = styled.div`
  ${Font.Small}
  width: 100%;
  height: 30%;
`;

const SocialContent = styled.div`
  width: 75%;
  height: 70%;
  padding-top: 3%;
`;
import GroupIcon from "@assets/MyPage/group.svg?react";
import ArchiveIcon from "@assets/MyPage/archive.svg?react";
import usePostStore from "@stores/postStore";

const SocialComp = () => {
  const { likePosts, fetchLikePosts } = usePostStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchLikePosts();
  }, [fetchLikePosts]);

  // const handleLikePost = () => {
  //   console.log("좋아요한 포스트로 이동");
  //   navigate("./like-post");
  // };
  return (
    <>
      <SocialSection>
        <SocialItem onClick={() => navigate("./friend-list")}>
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
        <SocialItem onClick={() => navigate("./like-post")}>
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
