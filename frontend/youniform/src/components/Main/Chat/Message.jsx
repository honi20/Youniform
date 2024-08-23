import React from "react";
import * as St from "@pages/Main/ChatViewStyle";
import styled from "styled-components";
const EntryMessage = styled.div`
`
const ExitMessage = styled.div`
`
const Message = ({ isUser, msg }) => {
  // // console.log(msg)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // 연도에서 마지막 2자리만 사용
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };
  switch (msg.type) {
    case "ENTRY":
      return <EntryMessage/>
    case "EXIT":
      return <ExitMessage/>
    case "HEARTBEAT":
      return
    case "USERCOUNT":
      // // console.log("usercount:", msg.content)
      return
   default:
    return (
      <>
        {isUser ? (
          <St.ChatWrapper $isUser={isUser}>
            <St.ChatBody $isUser={isUser}>
              {msg.imageUrl && <St.ChatImage src={msg.imageUrl}/>}
              {msg.content}
            </St.ChatBody>
            <St.ChatInfo $isUser={isUser}>
              <St.ChatDate>{formatDate(msg.messageTime)}</St.ChatDate>
            </St.ChatInfo>
          </St.ChatWrapper>
        ) : (
          <St.ChatWrapper $isUser={isUser}>
            <St.ChatInfo $isUser={isUser}>
              <St.ChatName>{msg.nickname}</St.ChatName>
              <St.ChatDate>{formatDate(msg.messageTime)}</St.ChatDate>
            </St.ChatInfo>
            <St.ChatBody $isUser={isUser}>
              {msg.imageUrl && <St.ChatImage src={msg.imageUrl}/>}
              {msg.content}
            </St.ChatBody>
            {/* <St.ChatBody $isUser={isUser}>{msg.content}</St.ChatBody> */}
          </St.ChatWrapper>
        )}
      </>
    );
  }
};

export default Message;
