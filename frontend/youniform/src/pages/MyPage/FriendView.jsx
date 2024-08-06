import React, { useEffect, useState } from "react";
import useFriendStore from "@stores/friendStore";
import styled from "styled-components";
import Friend from "../../components/MyPage/Friend";
import ProfileModal from "../../components/Modal/ProfileModal";

const Container = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
`;
const Header = styled.h3`
  text-align: center;
  padding: 3% 0;
  /* border: 1px solid red; */
`;
const Friends = styled.div`
  /* flex: 1; */
  border: 0.5px solid #dadada;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin: 2% 8%;
  cursor: pointer;
  overflow-y: auto;
  padding: 10px;
`;
const FriendView = () => {
  const { friends, fetchFriends } = useFriendStore();
  const [selectedFriend, setSelectedFriend] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return (
    <Container>
      <Header>친구 목록</Header>
      <Friends>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <Friend
              key={friend.friendId}
              friend={friend}
              setSelectedFriend={setSelectedFriend}
              setModalOpen={setModalOpen}
            ></Friend>
          ))
        ) : (
          <p>친구를 추천드립니다.</p>
        )}
      </Friends>
      <ProfileModal
        user={selectedFriend}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Container>
  );
};

export default FriendView;
