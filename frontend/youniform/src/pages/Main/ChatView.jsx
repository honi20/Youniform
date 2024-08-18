import React, { useEffect, useState, useRef } from "react";
import * as St from "./ChatViewStyle";
import Message from "@components/Main/Chat/Message";
import styled from "styled-components";
import DownIcon from "@assets/Main/chevron-down.svg?react";
import UpIcon from "@assets/Main/chevron-up.svg?react";
import SelectSvg from "@assets/Main/selectedIcon.svg?react";
import useChatStore from "@stores/chatStore";
import useUserStore from "@stores/userStore";
import { useNavigate, useParams } from "react-router-dom";
const ToggleBtn = styled.div`
  /* width: 70%; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  // typo
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  cursor: default;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  /* border: 1px solid red; */
`;

const ToggleList = styled.div`
  display: ${(props) => (props.$isOn ? "flex" : "none")};
  position: absolute;
  z-index: 1;
  top: 95px;
  width: 90%;
  left: 50%;
  transform: translate(-50%, 0);
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
  /* justify-content: sp; */
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
const ImgBox = styled.img`
  border: 1px solid black;
  max-width: 50px;
  margin-bottom: 10px;
`;
const ChatView = () => {
  const {
    content,
    chatRooms,
    selectedRoom,
    connect,
    disconnect,
    setContent,
    sendMessage,
    setSelectedRoom,
    fetchChatRoom,
    fetchChatRoomMessage,
    submitImage,
    enterChatRoom,
    type,
    setType,
  } = useChatStore();
  const { fetchUser, user } = useUserStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const messages = useChatStore((state) => state.messages);
  const chatBoxRef = useRef(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const loaderRef = useRef(null);
  // const imageUrl = useRef(null);

  ///// useEffect
  useEffect(() => {
    const initChat = async () => {
      await fetchUser(); // 사용자 정보를 먼저 가져옴
      fetchChatRoom(); // 채팅방 리스트를 가져옴
      if (roomId) {
        setSelectedRoom(roomId);
        await connect(parseInt(roomId, 10));
      }
    };
    initChat();
    return () => {
      disconnect();
    };
  }, [fetchUser, connect, disconnect, roomId, enterChatRoom]);

  useEffect(() => {
    if (roomId) {
      fetchChatRoomMessage();
    }
  }, [roomId, fetchChatRoomMessage]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleKeyDown = (event) => {
    console.log("Key pressed:", event.key); // 키 이벤트를 확인하기 위한 로그
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 Enter 동작 방지 (예: 줄바꿈)
      handleSubmitBtn();
    }
  };

  const [isOn, setIsOn] = useState(false); // 초기 상태 off
  const handleToggle = (isOn) => {
    setIsOn((prevIsOn) => !prevIsOn);
    console.log("토글얌얌", isOn);
  };
  const [selected, setSelected] = useState(roomId);

  const handleToggleBtn = (btnIndex) => {
    navigate(`/chat/${btnIndex}`);
    setIsOn(false);
    setSelected(btnIndex);
    setSelectedRoom(btnIndex); // 선택된 방 ID를 설정
    connect(btnIndex); // 연결할 방 ID를 올바르게 설정
  };

  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('file')
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoClick = () => {
    console.log(fileInputRef.current, 'juyeon test')
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
      console.log('test', selectedFile)
    }
  };

  const createFormData = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    return formData;
  };

  const sendImage = async () => {
    const formData = await createFormData();
    const imageUrl = await submitImage(formData);
    return imageUrl
  }

  const handleSubmitBtn = async () => {
    if (selectedFile){
    console.log("handleSubmitBtn", selectedFile);
    const imageUrl = await sendImage();
    sendMessage(user.nickname, imageUrl);
    setSelectedFile('')
    fileInputRef.current.value = ''
  } else {
    sendMessage(user.nickname);
  }
    
    setFilePreview('')
    setSelectedFile('')
  };
  return (
    <St.Wrapper>
      <St.ChatToggleSection>
        <div onClick={handleToggle}>
          {chatRooms &&
            chatRooms.length > 0 &&
            chatRooms.filter((room) => room.roomId == roomId)[0].roomName}
        </div>
        <ToggleBtn onClick={handleToggle}>
          {isOn ? <UpIcon /> : <DownIcon />}
        </ToggleBtn>
        <ToggleList $isOn={isOn}>
          {chatRooms.map((room, index) => (
            <ToggleItem
              $isOn={isOn}
              $isChecked={selectedRoom == room.roomId}
              key={index}
              onClick={() => handleToggleBtn(room.roomId)}
            >
              {room.roomName}
              <SelectIcon $isChecked={selectedRoom == room.roomId} />
            </ToggleItem>
          ))}
        </ToggleList>
      </St.ChatToggleSection>
      <St.ChatSection ref={chatBoxRef}>
        {messages &&
          messages.length > 0 &&
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
        <div ref={loaderRef}></div>
      </St.ChatSection>
      {filePreview && <ImgBox src={filePreview} alt="Preview" />}
      <St.InputSection>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <St.InputContaier>
          <St.ChatTextarea
            content={content}
            setContent={setContent}
            onKeyDown={handleKeyDown}
          />
          <St.IconWrapper>
            <St.ImgBtn onClick={handleAddPhotoClick} />
            <St.SubmitBtn onClick={handleSubmitBtn}></St.SubmitBtn>
          </St.IconWrapper>
        </St.InputContaier>
      </St.InputSection>
    </St.Wrapper>
  );
};

export default ChatView;
