import React, { useEffect, useState, useRef } from "react";
import * as St from "./ChatViewStyle";
import { format } from "date-fns";

const ChatView = () => {
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [content, setContent] = useState("");
  const chatBoxRef = useRef(null);
  const wsRef = useRef(null);
  const [user, setUser] = useState("");
  // user info
  useEffect(() => {
    setUser("kroz");
  });
  useEffect(() => {
    // roomId 별로 분리
    wsRef.current = new WebSocket(`ws://localhost:3001/`);

    wsRef.current.onopen = () => {
      console.log("웹소켓을 열었다!!!");
      signInUser();
    };

    wsRef.current.onmessage = async (event) => {
      let msg;
      if (event.data instanceof Blob) {
        // Convert Blob to content and then parse JSON
        const content = await event.data.text();
        msg = JSON.parse(content);
        console.log(msg);
      } else {
        msg = JSON.parse(event.data);
        console.log(msg);
      }

      const time = new Date(msg.date);

      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2); // 연도에서 마지막 2자리만 사용
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}/${month}/${day} ${hours}:${minutes}`;
      };

      const timeStr = formatDate(time);

      switch (msg.type) {
        case "id":
          // handle id
          break;
        case "username":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "system",
              content: `<b>User <em>${msg.name}</em> signed in at ${timeStr}</b>`,
            },
          ]);
          break;
        case "message":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "message",
              name: msg.name,
              content: msg.content,
              time: timeStr,
            },
          ]);
          break;
        case "rejectusername":
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "system",
              content: `<b>Your username has been set to <em>${msg.name}</em> because the name you chose is in use.</b>`,
            },
          ]);
          break;
        case "userlist":
          setUserList(msg.users);
          break;
        default:
          break;
      }
    };

    return () => {
      wsRef.current.close();
    };
  }, []);
  // user enter message 송신
  const signInUser = () => {
    const msg = {
      type: "username",
      id: "krozv",
      name: "krozv",
      date: Date.now(),
    };
    wsRef.current.send(JSON.stringify(msg));
  };
  // websoket에 message 송신
  const sendText = () => {
    const msg = {
      type: "message",
      content,
      // imageUrl,
      id: "krozv",
      name: "krozv",
      date: Date.now(),
    };
    wsRef.current.send(JSON.stringify(msg));
    setContent("");
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <St.Wrapper>
      <St.ChatToggleSection>응원 채팅방 토글창</St.ChatToggleSection>
      <St.ChatSection ref={chatBoxRef}>
        {messages.map((msg, index) => {
          if (msg.type === "system") {
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            );
          }
          return (
            <>
              {user === msg.name ? (
                <St.ChatContainer key={index} $isUser={user === msg.name}>
                  <St.ChatWrapper $isUser={user === msg.name}>
                    <St.ChatBody>{msg.content}</St.ChatBody>
                    <St.ChatInfo>{msg.time}</St.ChatInfo>
                  </St.ChatWrapper>
                </St.ChatContainer>
              ) : (
                // 추후 수정 필요함
                <St.ChatContainer key={index} $isUser={user === msg.name}>
                  <St.ChatWrapper $isUser={user === msg.name}>
                    <St.ChatInfo>
                      <St.ChatName>{msg.name}</St.ChatName>
                      <St.ChatDate>{msg.time}</St.ChatDate>
                    </St.ChatInfo>
                    <St.ChatBody>{msg.content}</St.ChatBody>
                  </St.ChatWrapper>
                </St.ChatContainer>
              )}
            </>
          );
        })}
      </St.ChatSection>
      <St.InputSection>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="button" onClick={sendText}>
          Submit
        </button>
        <div id="userlistbox">
          {userList.map((user) => (
            <div key={user}>{user}</div>
          ))}
        </div>
      </St.InputSection>
    </St.Wrapper>
  );
};

export default ChatView;
