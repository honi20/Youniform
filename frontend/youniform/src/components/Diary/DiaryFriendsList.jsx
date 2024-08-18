import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFriendStore from "@stores/friendStore";
import useDiaryStore from "@stores/diaryStore";
import useUserStore from "@stores/userStore";

const ListContainer = styled.div`
  background-color: #ededed;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const FriendsList = styled.div`
  display: flex;
  align-items: center;
`;

const UserCard = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100px;
  width: 80px;
  background-color: ${(props) =>
    props.$isSelected ? "#D9D9D9" : "transparent"};
  cursor: pointer;
  transition: background-color 0.3s ease;
  opacity: ${(props) => (props.$noneSelected || props.$isSelected ? 1 : 0.3)};
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #ffffff;
`;

const UserName = styled.div`
  text-align: center;
  font-size: 10px;
  margin-top: 4px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60px;
`;

const UpdateStatusCircle = styled.div`
  position: absolute;
  top: 57px;
  right: 13px;
  width: 13px;
  height: 13px;
  background-color: #f97d93;
  border: 1.5px solid white;
  border-radius: 50%;
  display: ${(props) => (props.$updateStatus ? "block" : "none")};
`;

const VerticalBar = styled.div`
  background: #b7b7b7;
  width: 2px;
  height: 50px;
  margin: 0 5px;
  border-radius: 10px;
`;

const DiaryFriendsList = ({ onUserClick }) => {
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [selectedSelf, setSelectedSelf] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const { friends, diaryFriends, fetchDiaryFriends } = useFriendStore();
  const { fetchUser, user } = useUserStore();
  const { selectedUser, setSelectedUser, monthlyDiaries, fetchMonthlyDiaries, fetchFriendsDiaries } = useDiaryStore(state => ({
    selectedUser: state.selectedUser,
    setSelectedUser: state.setSelectedUser,
    monthlyDiaries: state.monthlyDiaries,
    fetchMonthlyDiaries: state.fetchMonthlyDiaries,
    fetchFriendsDiaries: state.fetchFriendsDiaries,
  }));

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchDiaryFriends();
  }, [fetchDiaryFriends]);

  useEffect(() => {
    if (selectedUser !== null) {
      const index = diaryFriends.findIndex(
        (friend) => friend.friendId === selectedUser
      );
      if (index !== -1) {
        setSelectedUserIndex(index);
        setSelectedSelf(false);
      } else {
        setSelectedSelf(true);
        setSelectedUserIndex(null);
      }
    }
  }, [selectedUser, diaryFriends]);

  const handleUserClick = async (type, index) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}-${month}`;

    if (type === "friend") {
      setSelectedSelf(false);
      setSelectedUserIndex(index);
      setSelectedUser(diaryFriends[index].friendId);
      if (onUserClick) {
        onUserClick(diaryFriends[index]);
      }
      await fetchFriendsDiaries(diaryFriends[index].friendId, formattedDate);
    } else if (type === "self") {
      setSelectedSelf(true);
      setSelectedUserIndex(null);
      setSelectedUser(null);
      if (onUserClick) {
        onUserClick(null);
      }
      await fetchMonthlyDiaries(formattedDate);
    }
    // setUpdateTrigger((prev) => !prev);
  };

  return (
    <>
      {user && monthlyDiaries && (
        <ListContainer>
          <FriendsList>
            {/* Login User */}
            <UserCard
              $isSelected={selectedSelf}
              $noneSelected={selectedUserIndex === null && !selectedSelf}
              onClick={() => handleUserClick("self", null)}
            >
              <UserImage src={user.profileUrl} alt={user.nickname} />
              <UpdateStatusCircle $updateStatus={user.diaryUpdated} />
              <UserName>{user.nickname}</UserName>
            </UserCard>
            <VerticalBar />
            {/* Friends List */}
            {diaryFriends.map((user, index) => (
              <UserCard
                key={user.friendId}
                $isSelected={index === selectedUserIndex}
                $noneSelected={selectedUserIndex === null && !selectedSelf}
                onClick={() => handleUserClick("friend", index)}
              >
                <UserImage src={user.imgUrl} alt={user.nickname} />
                <UpdateStatusCircle $updateStatus={user.diaryUpdated} />
                <UserName>{user.nickname}</UserName>
              </UserCard>
            ))}
          </FriendsList>
        </ListContainer>
      )}
    </>
  );
};

export default DiaryFriendsList;
