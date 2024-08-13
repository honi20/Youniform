import styled, { useTheme, keyframes } from "styled-components";
import StarIcon from "@assets/Main/star.svg?react";

export const Card = styled.div`
  box-sizing: border-box;
  width: 398px;
  height: 496px;
  max-width: 95%;
  flex-shrink: 0;
  margin-top: 20px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  border-radius: 30px;
  background: ${(props) => props.theme.background};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
export const Folder = styled.div`
  width: 95%;
  /* height: 70%; */
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
`;
export const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  width: 20rem;
  max-width: 100%;
  justify-content: start;
  /* margin-left: 2.5rem; */
  /* border: 1px solid black; */
`;
export const FolderIcon = styled.svg`
  width: 100px;
  height: 16px;
`;
export const FolderComponent = ({ isClick, onClick }) => {
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
export const Player = styled.div`
  width: 325px;
  height: 270px;
  flex-shrink: 0;
  border: 0.5px solid rgba(38, 47, 102, 0.3);
  border-color: ${(props) => props.theme.secondary};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) =>
    `linear-gradient(to right, ${props.theme.secondary} 1px, transparent 1px),
    linear-gradient(to bottom, ${props.theme.secondary} 1px, transparent 1px)`};
  background-size: 25px 25px;
`;
// dot line
export const DotLine = styled.div`
  border-top: 1px dotted #000;
  width: 20rem;
  max-width: 95%;
  margin-top: 0.5rem;
  height: 0.5rem;
  text-align: right;
`;
// star line
export const Star = styled(StarIcon)`
  width: 1.875rem;
  height: 0.9375rem;
  flex-shrink: 0;
  fill: none;
  stroke: #000;
  /* stroke-width: 1px; */
`;
export const StarLine = styled.div`
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  width: 20rem;
  max-width: 95%;
`;
// alarm
export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 331px;
  height: 53px;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  border-radius: 1.5625rem;
  background: #f5f5f5;
`;

export const TextContainer = styled.div`
  width: 70%;
  height: 2.25rem;
  flex-shrink: 0;
  margin: 1%;
`;
export const Title = styled.div`
  color: #000;
  font-family: "Pretendard";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Description = styled.div`
  color: #000;
  font-family: "Pretendard";
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const BtnContainer = styled.div`
  display: flex;
  width: 25%;
  justify-content: center;
  /* border: 1px solid black; */
`;
export const OffBtn = styled.div`
  width: 3.375rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid black; // 수정 필
  background: ${(props) => props.theme.background};
`;
export const PlayIcon = ({ color }) => {
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
export const toggleAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;
export const Btn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => (props.isOn ? "#4caf50" : "#f44336")};
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${toggleAnimation} 0.3s ease-in-out;
  transition: background-color 0.3s ease;
`;
export const OffIcon = styled.div`
  content: "Off";
  color: white;
`;

export const OnIcon = styled.div`
  content: "On";
  color: white;
`;
export const SwitchContainer = styled.div`
  width: 60px; // Width of the switch container
  height: 30px; // Height of the switch container
  background-color: ${(props) =>
    props.isOn
      ? props.theme.primary
      : "#ccc"}; // Background color based on the toggle state
  border-radius: 30px; // Round edges for the switch
  display: flex;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const Slider = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  left: ${(props) => (props.isOn ? "28px" : "0px")};
  transition: left 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  text-align: center;
  color: ${(props) =>
    props.isOn ? props.theme.primary : "#ccc"}; // Text color based on the state
  font-weight: bold;
`;
export const PlayBtn = styled(PlayIcon).attrs((props) => ({
  color: props.theme.primary,
}))`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
`;

export * from "./PlayerCompStyle";
