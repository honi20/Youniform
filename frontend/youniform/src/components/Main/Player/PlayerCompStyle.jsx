import styled, { useTheme } from "styled-components";
import StarIcon from "@assets/star.svg?react";

const Card = styled.div`
  box-sizing: border-box;
  width: 90%;
  height: 60vh;
  padding: 3% 3%;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  border-radius: 30px;
  background: ${(props) => props.theme.background};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Folder = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: start;
`;
const FolderIcon = styled.svg`
  width: 98px;
  height: 16px;
`;
const FolderComponent = ({ isClick, onClick }) => {
  const theme = useTheme();
  const color = isClick ? theme.primary : theme.secondary;
  return (
    <FolderIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 98 16"
      onClick={onClick}
    >
      <path
        d="M0.5 10C0.5 4.47715 4.97715 0 10.5 0H78.8838L97.5 16H0.5V10Z"
        fill={color}
      />
    </FolderIcon>
  );
};
// 선수 카드
const Player = styled.div`
  width: 100%;
  height: 90%;
  flex-shrink: 0;
  border: 0.5px solid rgba(38, 47, 102, 0.3);
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// dot line
const DotLine = styled.div`
  border-bottom: 1px dotted #000;
  width: 90%;
  text-align: right;
`;
// star line
const Star = styled(StarIcon)`
  width: 1.875rem;
  height: 0.9375rem;
  flex-shrink: 0;
  fill: none;
  stroke: #000;
  stroke-width: 1px;
`;
const StarLine = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 95%;
`;
// alarm
const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 90%;
  height: 10%;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  border-radius: 1.5625rem;
  background: #f5f5f5;
`;

const TextContainer = styled.div`
  width: 70%;
  height: 2.25rem;
  flex-shrink: 0;
  margin: 1%;
`;
const Title = styled.div`
  color: #000;
  font-family: "Pretendard";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Description = styled.div`
  color: #000;
  font-family: "Pretendard";
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const BtnContainer = styled.div`
  display: flex;
  width: 25%;
  justify-content: center;
  /* border: 1px solid black; */
`;
const OffBtn = styled.div`
  width: 3.375rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid black; // 수정 필
  background: ${(props) => props.theme.background};
`;
const PlayIcon = ({ color }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Video_fill">
        <path
          id="Subtract"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28ZM13.7828 10.3238L22.4265 15.1258C23.1123 15.5068 23.1123 16.4932 22.4265 16.8742L13.7828 21.6762C12.9829 22.1206 12 21.5422 12 20.6273V11.3728C12 10.4578 12.9829 9.87941 13.7828 10.3238Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
const PlayBtn = styled(PlayIcon).attrs((props) => ({
  color: props.theme.primary,
}))`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;

export {
  Card,
  Folder,
  FolderHeader,
  Player,
  DotLine,
  StarLine,
  Star,
  Container,
  TextContainer,
  Title,
  Description,
  BtnContainer,
  PlayBtn,
  OffBtn,
  FolderComponent,
};
