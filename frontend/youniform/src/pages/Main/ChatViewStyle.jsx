import styled, { useTheme } from "styled-components";
import * as Font from "@/typography";
import ImgSvg from "@assets/Post/img_box.svg?react";


export const Wrapper = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  /* border: 5px solid black; */
`;
export const ChatToggleSection = styled.div`
  ${Font.Large};
  width: 100%;
  height: 50px;
  /* border: 1px solid red; */
  border-bottom: 1px solid #DBDBDB;
`;

export const ChatSection = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  /* border: 1px solid blue; */
`;

export const ChatContainer = styled.div`
  display: flex;
  align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  flex-direction: column;
  padding: 0.25rem 0.5rem;
  /* border: 1px solid black; */
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
  /* border: 1px solid green; */
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
  background-color: white;
  /* border: 1px solid blue; */
`;
export const TextWrapper = styled.textarea`
  ${Font.Small}
  /* border: 1px solid black; */
  width: 70%;
  height: auto;
  text-align: left;
  border: none;
  margin-left: 10px;
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
      placeholder="응원의 한마디"
      rows="1"
      value={content}
      onChange={handleTextChange}
      style={{ resize: "none" }}
      maxLength="500"
    ></TextWrapper>
  );
};
export const SubmitIcon = () => {
  const theme = useTheme();
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.0698 8.50965L9.50978 4.22965C3.75978 1.34965 1.39978 3.70965 4.27978 9.45965L5.14978 11.1996C5.39978 11.7096 5.39978 12.2996 5.14978 12.8096L4.27978 14.5396C1.39978 20.2896 3.74978 22.6496 9.50978 19.7696L18.0698 15.4896C21.9098 13.5696 21.9098 10.4296 18.0698 8.50965ZM14.8398 12.7496H9.43977C9.02978 12.7496 8.68977 12.4096 8.68977 11.9996C8.68977 11.5896 9.02978 11.2496 9.43977 11.2496H14.8398C15.2498 11.2496 15.5898 11.5896 15.5898 11.9996C15.5898 12.4096 15.2498 12.7496 14.8398 12.7496Z" fill={theme.primary}/>
</svg>

  )
}

export const SubmitBtn = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <SubmitIcon /> {/* JSX에서 컴포넌트 사용 시, 태그로 작성 */}
    </div>
  );
};

export const ImgBtn = ({ onClick}) => {
  return (
    <div onClick={onClick}>
      <ImgSvg/>
    </div>
  )
};

export const IconWrapper = styled.div`
  /* border: 1px solid red; */
  display: flex;
  gap: 7px;
`;
export * from "./ChatViewStyle";
