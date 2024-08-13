import React, { useEffect, useState } from "react";
import useFriendStore from "@stores/friendStore";
import styled from "styled-components";
import Friend from "@components/MyPage/Friend";
import ProfileModal from "@components/Modal/ProfileModal";

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
  const { friends, fetchFriends, recommendFriends, fetchRecommendFriends } =
    useFriendStore();
  const [selectedFriend, setSelectedFriend] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [waitingList, setWaitingList] = useState([]);

  const seperateFriendList = () => {
    setFriendList(friends.filter((friend) => friend.status === "FRIEND"));
    setWaitingList(friends.filter((friend) => friend.status === "WAITING"));
  };
  // 유저의 친구 목록 패치
  useEffect(() => {
    const loadFriends = () => {
      if (friends.length == 0) {
        fetchFriends();
      }
      seperateFriendList();
    };
    loadFriends();
  }, [fetchFriends, friends]);

  // 친구 목록이 없는 경우 -> 추천 친구 목록 패치
  useEffect(() => {
    const loadRecommendFriends = () => {
      if (friends.length == 0) {
        fetchRecommendFriends();
      }
    };
    loadRecommendFriends();
  }, [fetchRecommendFriends, recommendFriends]);

  return (
    <Container>
      <Header>친구 목록</Header>
      <Friends>
        요청 중인 칭구
        {waitingList.map((friend) => (
          <Friend
            key={friend.userId}
            friend={friend}
            setSelectedFriend={setSelectedFriend}
            setModalOpen={setModalOpen}
          />
        ))}
      </Friends>
      <Friends>
        내 칭구
        {friends.length > 0 ? (
          <>
            {friendList.map((friend) => (
              <Friend
                key={friend.userId}
                friend={friend}
                setSelectedFriend={setSelectedFriend}
                setModalOpen={setModalOpen}
              ></Friend>
            ))}
          </>
        ) : (
          <>
            <p>유저를 추천드립니다.</p>
            {recommendFriends.map((friend) => (
              <Friend
                state="recommend"
                key={friend.userId}
                friend={friend}
                setSelectedFriend={setSelectedFriend}
                setModalOpen={setModalOpen}
              ></Friend>
            ))}
          </>
        )}
      </Friends>
      {/* <ProfileModal
        user={selectedFriend}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      /> */}
    </Container>
  );
};

export default FriendView;
