import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useChatStore from "../stores/chatStore";
const Wrapper = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 5px solid black;
  flex-direction: column;
`;
const ChatToggleSection = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid red;
`;
const ChatSection = styled.div`
  flex: 1;
  width: 100%;
  border: 1px solid blue;
`;
const InputSection = styled.div`
  width: 100%;
  height: 10%;
  border: 1px solid green;
`;
const ChatView = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = async (event) => {
      console.log("onMessage");
      if (event.data instanceof Blob) {
        const text = await event.data.text();
        setMessages((prevMessages) => [...prevMessages, text]);
      } else {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    // id 같으면 랜더링 못하게, 수신메세지 때문에 랜더링 두번된거일수도ㅠ
    console.log("sendMessage");
    if (socketRef.current && message) {
      const msg = {
        sender: "me",
        text: message,
        timestamp: new Date(),
      };
      console.log(msg);
      console.log(messages);
      socketRef.current.send(JSON.stringify(msg));
      setMessages((prevMessages) => [...prevMessages, msg]);
      setMessage("");
    }
  };
  return (
    <Wrapper>
      <ChatToggleSection>응원 채팅방 토글창</ChatToggleSection>
      <ChatSection>
        <div className="chat">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender}:</strong> {msg.text}{" "}
                <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </ChatSection>
      <InputSection>입력창</InputSection>
    </Wrapper>
  );
};

export default ChatView;
