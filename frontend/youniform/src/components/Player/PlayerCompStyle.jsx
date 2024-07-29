import styled from "styled-components";
import FolderIcon from "../../assets/folder_top.svg?react";
import StarIcon from "../../assets/star.svg?react";
import PlayIcon from "../../assets/Video_fill.svg?react";

const Card = styled.div`
  /* 크기   */
  margin-top: 1%;
  box-sizing: border-box;
  width: 90%;
  height: 60vh;
  padding: 3% 3%;

  /* 위치 */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  /* 디자인 */
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  border: 1px solid red;
`;
const Folder = styled.div`
  border: 1px solid blue;
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FolderHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
`;
const FolderTop = styled(FolderIcon)`
  /* width: 7.8125rem; */
  /* height: 1rem; */
  flex-shrink: 0;
  /* border: 1px solid black; */
  /* align-items: end; */
`;
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

  border: 1px solid black;
`;

const TextContainer = styled.div`
  width: 70%;
  height: 2.25rem;
  flex-shrink: 0;
  border: 1px solid red;
  margin: 1%;
`;
const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  /* padding: 1%; */
`;

const Description = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const BtnContainer = styled.div`
  /* margin-top: 10%; */
  display: flex;
  border: 1px solid black;
  width: 25%;
  justify-content: center;
`;
const OffBtn = styled.div`
  width: 3.375rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #ddd;
  /* border: 1px solid black; */
`;

const PlayBtn = styled(PlayIcon)`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border: 1px solid black;
`;

export {
  Card,
  Folder,
  FolderHeader,
  FolderTop,
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
};
