import React, { useEffect, useState, useRef } from "react";
import * as St from "./ChatViewStyle";
import Message from "@components/Main/Chat/Message";
import styled from "styled-components";
import DownIcon from "@assets/Main/chevron-down.svg?react";
import UpIcon from "@assets/Main/chevron-up.svg?react";
import SelectSvg from "@assets/Main/selectedIcon.svg?react";
import useChatStore from "@stores/chatStore";
import useUserStore from "@stores/userStore";
import { useParams } from "react-router-dom";
const ToggleBtn = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  // typo
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  cursor: default;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  /* box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.04); */
  /* border: 1px solid red; */
`;

const ToggleList = styled.div`
  display: ${(props) => (props.$isOn ? "flex" : "none")};
  position: absolute;
  z-index: 1;
  top: 10%;
  width: auto;
  border: 1px solid #737373;
  background-color: white;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: auto;
  border-radius: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0.5rem;
`;
const ToggleItem = styled.div`
  display: ${(props) => (props.$isOn ? "flex" : "none")};
  padding: 0.63rem 1rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: ${(props) => (props.$isChecked ? "1px solid #262F66" : "")};
  background-color: ${(props) =>
    props.$isChecked ? "rgba(38, 47, 102, 0.30)" : "white"};
  // typo
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    text-decoration-line: underline;
    cursor: pointer;
  }
`;
const SelectIcon = styled(SelectSvg)`
  display: ${(props) => (props.$isChecked ? "block" : "none")};
`;
const ChatView = () => {
  const {
    messages,
    content,
    isChatListVisible,
    chatRooms,
    selectedRoom,
    connect,
    disconnect,
    toggleChatListVisibility,
    setContent,
    sendMessage,
    setSelectedRoom,
    fetchChatRoom,
  } = useChatStore();
  const { fetchUser, user } = useUserStore();
  const chatBoxRef = useRef(null);
  const { roomId } = useParams();
  const imageUrl = "test";

  useEffect(() => {
    const initChat = async () => {
      await fetchUser(); // 사용자 정보를 먼저 가져옴
      fetchChatRoom(); // 채팅방 리스트를 가져옴
      if (roomId) {
        console.log(roomId);
        setSelectedRoom(parseInt(roomId, 10)); // roomId를 정수로 변환
        connect(parseInt(roomId, 10));
      }
    };
    initChat();
    return () => {
      disconnect();
    };
  }, [fetchUser, connect, disconnect]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const toggleChatList = () => {
    setChatListVisible((prev) => !prev);
  };

  const [isOn, setIsOn] = useState(false); // 초기 상태 off
  const handleToggle = (isOn) => {
    setIsOn((prevIsOn) => !prevIsOn);
    console.log(isOn);
  };
  const [selected, setSelected] = useState(0);
  
  const handleToggleBtn = (btnIndex) => {
    handleToggle(isOn);
    setSelected(btnIndex);
    setSelectedRoom(btnIndex); // 선택된 방 ID를 설정
    connect(btnIndex); // 연결할 방 ID를 올바르게 설정
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);
  console.log(chatRooms);

  return (
    <St.Wrapper>
      <St.ChatToggleSection>
        {chatRooms
          .filter((room) => room.roomId === selectedRoom) // 필터링된 방 배열
          .map((room) => room.roomName) // 첫 번째 요소에서 방 이름을 가져옴
          .join(", ")}{" "}
        <ToggleBtn onClick={toggleChatListVisibility}>
          {isChatListVisible ? <UpIcon /> : <DownIcon />}
        </ToggleBtn>
        <ToggleList $isOn={isChatListVisible}>
          {chatRooms.map((room, index) => (
            <ToggleItem
              $isOn={isChatListVisible}
              $isChecked={selectedRoom === room.roomId}
              key={index}
              onClick={() => setSelectedRoom(room.roomId)}
            >
              {room.roomName}
              <SelectIcon $isChecked={selectedRoom === room.roomId} />
            </ToggleItem>
          ))}
        </ToggleList>
      </St.ChatToggleSection>
      <St.ChatSection ref={chatBoxRef}>
        {messages.length > 0 &&
          messages.map((msg, index) => {
            return (
              <St.ChatContainer
                key={index}
                $isUser={user.nickname === msg.nickname}
              >
                <Message isUser={user.nickname === msg.nickname} msg={msg} />
              </St.ChatContainer>
            );
          })}
      </St.ChatSection>
      <St.InputSection>
        <St.InputContaier>
          <St.ChatTextarea
            content={content}
            setContent={setContent}
            onKeyDown={handleKeyDown}
          />
          <St.IconWrapper>
            <St.SubmitBtn
              onClick={() => sendMessage(user.nickname, imageUrl)}
            ></St.SubmitBtn>
          </St.IconWrapper>
        </St.InputContaier>
      </St.InputSection>
    </St.Wrapper>
  );
};

export default ChatView;
