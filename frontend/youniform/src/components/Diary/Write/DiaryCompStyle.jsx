import styled from "styled-components";
import ProfileUrl from "@assets/profile.png";

export const Diary = styled.div`
  // layout
  box-sizing: border-box;
  width: 90%;
  height: auto;
  flex-shrink: 0;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  // style
  border-radius: 1rem;
  border: 1px solid #b5b5b5;
  margin-top: 3%;
  /* background-image: ; */
`;
export const DiaryHeader = styled.div`
  // layout
  /* position: absolute; */
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 3% 3%;
  // style
  border-radius: 1rem 1rem 0rem 0rem;
  border-bottom: 1px solid #dadada;
  background-color: #fff;
  /* border: 1px solid black; */
`;
export const Profile = styled.div`
  // layout
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  margin-left: 0.5rem;
  // style
  background-image: url(${(props) => props.profileUrl || ProfileUrl});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 0.5px solid #d0d0d0;
`;
export const HeaderText = styled.span`
  // layout
  flex-shrink: 0;
  /* margin-left: 0.6rem; */
  // typography
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
  background-color: ${(props) => props.bgcolor || "#E3E3E3"};
  color: ${(props) => props.color || "#393939"};
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
// Content
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
  /* border: 5px solid blue; */
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
// 필요없음 나중에 삭제할 것
export const DiaryImage = styled.div`
  /* width: 100%; */
  /* height: 100%; */
  /* object-fit: cover; */
  /* background-color:black; */
  /* background-imagecd: url(${(props) =>
    props.imageUrl || "/defaultImg.png"}); */
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
// Footer
export const DiaryFooter = styled.div`
  display: flex;
  /* border: 1px solid black; */
  height: auto;
  justify-content: space-between;
  align-items: center;
  padding: 3% 5%;
  /* & > div {
        display: flex;
        align-items: center;
    }
    & > div > div {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        /* border: 1px solid black;
    } */
`;

export * from "./DiaryCompStyle";
