import styled from "styled-components";
import * as Font from "@/typography";

export const Wrapper = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 5px solid black;
  flex-direction: column;
`;
export const ChatToggleSection = styled.div`
  /* ${Font.Large}; */
  width: 100%;
  height: 50px;
  border: 1px solid red;
`;

export const ChatSection = styled.div`
  flex: 1;
  width: 100%;
  border: 1px solid blue;
  overflow-y: auto;
`;

export const InputSection = styled.div`
  width: 100%;
  height: 10%;
  border: 1px solid green;
`;

export const ChatContainer = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  flex-direction: column;
  padding: 2% 2%;
`;
export const ChatWrapper = styled.div`
  padding: 2% 2%;

  /* border: 1px solid burlywood; */
`;
export const ChatInfo = styled.div`
  border: 1px solid red;
  display: flex;
`;
export const ChatName = styled.div`
  border: 1px solid blue;
`;
export const ChatDate = styled.div`
  border: 1px solid black;
`;
export const ChatBody = styled.div`
  padding: 2% 2%;
  background-color: ${(props) =>
    props.$isUser ? props.theme.secondary : props.theme.tertiary};
  border-radius: ${(props) =>
    props.$isUser
      ? "0.625rem 0rem 0.625rem 0.625rem"
      : "0rem 0.625rem 0.625rem 0.625rem"};
`;

export * from "./ChatViewStyle";
