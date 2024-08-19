import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import useFriendStore from "@stores/friendStore";
import ProfileModal from "@components/Modal/ProfileModal";
import useUserStore from "../../stores/userStore";

const Container = styled.div`
  margin: 1%;
  padding: 1%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    border-bottom: 1px solid #dadada;
  }
  /* border: 1px solid black; */
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  /* aspect-ratio: ? 1/1; */
  border-radius: 50%;
  margin-left: 10px;
  border: 0.5px solid #c4c4c4;
  /* border: 1px solid black; */
`;
const ProfileInfo = styled.div`
  flex: 1;
  margin-left: 12px;
  /* border: 1px solid black; */
`;
const Nickname = styled.h3`
  ${Font.Medium};
  /* border: 1px solid black; */
`;
const TeamImg = styled.img`
  /* border: 1px solid black; */
  height: 20px;
`;
const Introduce = styled.div`
  ${Font.Small};
  color: #6c727f;
  font-weight: 300;
  margin: 3px 0;
  /* border: 1px solid black; */
`;
const DeleteBtn = styled.div`
  ${Font.Small};
  font-weight: 300;
  background-color: ${(props) => props.theme.primary};
  border-radius: 15px;
  height: 25px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
const Friend = ({ friend, setSelectedFriend }) => {
  const { deleteFriend } = useFriendStore();
  const { user, fetchUser } = useUserStore();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadUserDate = () => {
      if (!user || user.length == 0) {
        console.log("user data fatch");
        fetchUser();
      }
    };
    loadUserDate();
  }, [fetchUser, user]);

  const handleDeleteBtn = () => {
    console.log("친구삭제");
    deleteFriend(friend.userId);
  };
  const handleProfileClick = () => {
    console.log("프로필 모달");
    setSelectedFriend(friend);
    setModalOpen(true);
  };
  console.log(friend);
  return (
    <Container>
      <div
        style={{ display: "flex", flex: "1", alignItems: "center" }}
        onClick={handleProfileClick}
      >
        <ProfileImg src={friend.imgUrl} alt="profile image" />
        <ProfileInfo>
          <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
            <Nickname>{friend.nickname}</Nickname>
            <TeamImg src={friend.teamUrl} />
          </div>
          <Introduce>{friend.introduce}</Introduce>
        </ProfileInfo>
      </div>
      {friend.status == "FRIEND" && (
        <DeleteBtn onClick={handleDeleteBtn}>삭제</DeleteBtn>
      )}
      {isModalOpen && (
        <ProfileModal
          friend={friend}
          user={user}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default Friend;
