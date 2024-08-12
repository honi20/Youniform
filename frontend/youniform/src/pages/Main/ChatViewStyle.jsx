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
  ${Font.Large};
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

export const ChatContainer = styled.div`
  display: flex;
  align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  flex-direction: column;
  padding: 0.25rem 0.5rem;
  border: 1px solid black;
`;
export const ChatWrapper = styled.div`
  max-width: 80%;
  /* padding: 1rem 1rem; */
  /* border: 1px solid burlywood; */
`;
export const ChatInfo = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "space-between")};
  gap: 1rem;
  /* border: 1px solid red; */
`;
export const ChatName = styled.div`
  ${Font.Small}
  display: flex;
  align-items: end;
  /* border: 1px solid blue; */
`;
export const ChatDate = styled.div`
  ${Font.XSmall}
  display: flex;
  align-items: end;
  color: rgba(13, 8, 44, 0.4); // 날짜 색상 고정
  /* border: 1px solid black; */
`;
export const ChatBody = styled.div`
  padding: 0.7rem 0.7rem;
  background-color: ${(props) =>
    props.$isUser ? props.theme.secondary : props.theme.tertiary};
  border-radius: ${(props) =>
    props.$isUser
      ? "0.625rem 0rem 0.625rem 0.625rem"
      : "0rem 0.625rem 0.625rem 0.625rem"};
  /* border: 1px solid blue; */
  word-break: break-word;
`;

export const InputSection = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
`;
export const InputContaier = styled.div`
  width: 95%;
  height: 3.5rem;
  border-radius: 1.875rem;
  box-shadow: 5px 4px 20px 0px rgba(0, 0, 0, 0.13);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem;
  /* border: 1px solid blue; */
`;
export const TextWrapper = styled.textarea`
  ${Font.Small}
  border: 1px solid black;
  width: 70%;
  height: auto;
  text-align: left;
  /* text-transform:  */
`;
export const ChatTextarea = ({ content, setContent }) => {
  const handleTextChange = (e) => {
    setContent(e.target.value);
    autoResize(e.target);
  };
  const autoResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.maxHeight = "3rem";
  };
  return (
    <TextWrapper
      rows="1"
      value={content}
      onChange={handleTextChange}
      style={{ resize: "none" }}
      maxLength="500"
    ></TextWrapper>
  );
};

export const IconWrapper = styled.div`
  border: 1px solid red;
`;
export * from "./ChatViewStyle";
