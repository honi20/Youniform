import React, { useEffect, useState, useRef } from "react";
import * as St from "./ChatViewStyle";
import Message from "@components/Main/Chat/Message";
import * as Stomp from "@stomp/stompjs";

const ChatView = () => {
  const [messages, setMessages] = useState([]);
  // const [userList, setUserList] = useState([]);
  const [content, setContent] = useState("");
  const chatBoxRef = useRef(null);
  const [user, setUser] = useState("1");

  const client = useRef(null);
  const messageTime = "2024-08-07T12:45:00Z";
  const nickname = "tester";
  const imageUrl = "http://example.com/image.png";
  const connect = () => {
    client.current = new Stomp.Client({
      brokerURL: "ws://i11a308.p.ssafy.io:8080/stomp/chat",
      onConnect: () => {
        console.log("연결 성공");

        client.current.subscribe("/sub/1", (message) => {
          try {
            const receivedMessage = JSON.parse(message.body);
            console.log("subscribe", receivedMessage);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          } catch (e) {
            console.error("메시지 파싱 오류", e);
          }
        });

        // userlist
        // client.current.subscribe("/topic/users", (message) => {
        //   const userList = JSON.parse(message.body);
        //   setUserList(userList);
        // });
      },
      onStompError: (frame) => {
        console.error("STOMP 오류", frame);
      },
    });
    client.current.activate();
  };
  const disconnect = () => {
    client.current.deactivate();
  };

  useEffect(() => {
    console.log("테스트중");
    setUser(1);
    connect();
    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    console.log(content);
    if (content.trim() === "") return;

    const message = {
      user,
      nickname,
      imageUrl,
      messageTime,
      content,
    };

    client.current.publish({
      destination: "/pub/1",
      body: JSON.stringify(message),
    });

    setContent("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <St.Wrapper>
      <St.ChatToggleSection>응원 채팅방 토글창</St.ChatToggleSection>
      <St.ChatSection ref={chatBoxRef}>
        {messages}
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
            <St.ChatContainer key={index} $isUser={user === msg.name}>
              <Message isUser={user === msg.name} msg={msg} />
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
            <button type="button" onClick={sendMessage}>
              Submit
            </button>
          </St.IconWrapper>
          {/* <div id="userlistbox">
            {userList.map((user) => (
              <div key={user}>{user}</div>
            ))}
          </div> */}
        </St.InputContaier>
      </St.InputSection>
    </St.Wrapper>
  );
};

export default ChatView;
