import React from "react";
import * as St from "@pages/Main/ChatViewStyle";

const Message = ({ isUser, msg }) => {
  return (
    <>
      {isUser ? (
        <St.ChatWrapper $isUser={isUser}>
          <St.ChatBody $isUser={isUser}>{msg.content}</St.ChatBody>
          <St.ChatInfo $isUser={isUser}>
            <St.ChatDate>{msg.time}</St.ChatDate>
          </St.ChatInfo>
        </St.ChatWrapper>
      ) : (
        <St.ChatWrapper $isUser={isUser}>
          <St.ChatInfo $isUser={isUser}>
            <St.ChatName>{msg.name}</St.ChatName>
            <St.ChatDate>{msg.time}</St.ChatDate>
          </St.ChatInfo>
          <St.ChatBody $isUser={isUser}>{msg.content}</St.ChatBody>
        </St.ChatWrapper>
      )}
    </>
  );
};

export default Message;
