import styled from "styled-components";
import ProfileUrl from "@assets/photocard/profile.png";

export const Diary = styled.div`
  box-sizing: border-box;
  width: 90%;
  height: auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  border: 1px solid #b5b5b5;
  margin-top: 3%;
  /* background-image: ; */
`;
export const DiaryHeader = styled.div`
  /* position: absolute; */
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 3% 3%;
  border-radius: 1rem 1rem 0rem 0rem;
  border-bottom: 1px solid #dadada;
  background-color: #fff;
  /* border: 1px solid black; */
`;
export const Profile = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  margin-left: 0.5rem;
  background-image: url(${(props) => props.profileUrl || ProfileUrl});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 0.5px solid #d0d0d0;
`;
export const HeaderText = styled.span`
  flex-shrink: 0;
  /* margin-left: 0.6rem; */
  font-size: 1rem;
  color: #363636;
  font-weight: 700;
  font-family: "Pretendard";
  /* border: 1px solid purple; */
`;
export const TextContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  width: auto;
  padding: 0 0.5rem;
  flex: 1;
  /* border: 1px solid blue; */
`;

export const Btn = styled.div`
  background-color: ${(props) =>
    props.$isShare ? props.theme.primary : "#E3E3E3"};
  color: ${(props) => (props.$isShare ? "#FFFFFF" : "#000000")};
  /* border-bottom: 1px solid #E3E3E3; */
  /* border: 1px solid black; */
  border-radius: 2rem;
  padding: 0.8rem 1.5rem;
  font-family: "DungGeunMo";
`;

export const WriteBtnContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  /* border: 1px solid purple; */
`;

export const BtnContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  width: 100%;
  /* height: 90%; */
  /* align-items: flex-end; */
  justify-content: space-between;
  /* padding: 1rem; */
  /* border: 5px solid black; */
`;

export const BtnGroup = styled.div`
  display: flex;
  gap: 1rem;
  /* border: 1px solid blue; */
`;

export const DiaryContent = styled.div`
  display: flex;
  /* border: 1px solid red; */
  height: auto;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

export const DiaryImageContainer = styled.div`
  display: flex;
  border: 5px solid blue;
  height: 95%;
  justify-content: center;
  /* align-items: center; */
  & > img {
    width: 100%;
    /* height: 100%; */
    object-fit: cover;
    /* border: 1px solid black; */
  }
`;

export const DiaryText = styled.div`
  display: flex;
  border: 1px solid yellow;
  /* height: 40px; */
`;

export const DiaryTags = styled.div`
  display: flex;
  border: 1px solid pink;
  /* height: 40px; */
`;

export const DiaryDate = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid pink;
  height: 40px;
  color: #848484;
  font-family: "Pretendard";
  /* font-size: 0.9375rem; */
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 10px;
`;

export const DiaryLine = styled.div`
  display: flex;
  margin: 0 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;

export const DiaryFooter = styled.div`
  display: flex;
  /* border: 1px solid black; */
  height: auto;
  justify-content: space-between;
  align-items: center;
  padding: 3% 5%;
`;

const CanvasContainer = styled.div`
  height: 502px;
  width: 302px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  top: ${(props) => (props.$decorated ? "10px" : "60px")};
  z-index: ${(props) => (props.$decorated ? "100" : "")};
  position: absolute;
`;

export * from "./PhotocardCanvasStyle";
