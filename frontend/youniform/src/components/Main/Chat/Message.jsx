import React from "react";
import * as St from "@pages/Main/ChatViewStyle";

const Message = ({ isUser, msg }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // 연도에서 마지막 2자리만 사용
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };
  return (
    <>
      {isUser ? (
        <St.ChatWrapper $isUser={isUser}>
          <St.ChatBody $isUser={isUser}>{msg.content}</St.ChatBody>
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
          <St.ChatBody $isUser={isUser}>{msg.content}</St.ChatBody>
        </St.ChatWrapper>
      )}
    </>
  );
};

export default Message;
