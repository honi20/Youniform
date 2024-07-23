import React from 'react';
import styled from 'styled-components'; 
import { ThemeProvider } from '@mui/material';
import FolderIcon from '../../assets/folder_top.svg?react'; 
import StarIcon from '../../assets/star.svg?react';
import PlayIcon from '../../assets/Video_fill.svg?react';

const Card = styled.div`
  /* 크기   */
  box-sizing: border-box;
  width: 25rem;
  height: 31rem;
  padding: 1rem 0.25rem;

  /* 위치 */
  display: flex;
  justify-content: center;
  /* align-items: flex-start; */
  /* align-content: space-around; */
  flex-wrap: wrap;

  /* 디자인 */
  border-radius: 30px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`
const FolderTop = styled(FolderIcon)`
  width: 7.8125rem;
  height: 1rem;
  flex-shrink: 0;
`
// 선수 카드
const Player = styled.div`
  width: 20.3125rem;
  height: 16.875rem;
  flex-shrink: 0;
  border: 0.5px solid rgba(38, 47, 102, 0.30);
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

// 선수 정보창
const Character = styled.div`
  width: 8.3125rem;
  height: 14.75rem;
  flex-shrink: 0;
  border: 1px solid #262F66;
`
const Info = styled(Character)`
  margin-left: 1rem;
`
// dot line
const DotLine = styled.div`
  border-bottom: 1px dotted #000;
  margin-top: 0.87rem;
  width: 20.375rem;
  height: 0.04375rem;
  text-align : right;
`
// star line
const Star = styled(StarIcon)`
  width: 1.875rem;
  height: 0.9375rem;
  flex-shrink: 0;
  fill: none;
  stroke: #000;
  stroke-width: 1px;
`
const StarLine = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 0.38rem;
`
// alarm
const Bar = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 20.6875rem;
  height: 3.3125rem;
  padding: 0.5rem 0.875rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  border-radius: 1.5625rem;
  background: #F5F5F5;
`

const TextContainer = styled.div`
  /* width: 7.375rem; */
  height: 2.25rem;
  flex-shrink:0 ;
`
const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const Description = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const OffBtn = styled.div`
  width: 3.375rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #DDD;
`

const PlayBtn = styled(PlayIcon)`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`
export default function PlayerContainer() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#F8F8F8',
            team: '#EA0029',
          },
        },
      }}
      >
      <Card>
        <div>
        <FolderTop />
        <Player>
          <Character />
          <Info />
        </Player>
        <DotLine />
        <StarLine>
          {Array.from({ length: 8 }).map((_, index) => (
            <Star key={ index } />
          ))}
        </StarLine>
        </div>
        <Bar>
          <TextContainer>
            <Title>실시간 방송 알림</Title>
            <Description>방송이 시작될 때 알려드려요!</Description>
          </TextContainer>
          <OffBtn/>
        </Bar>
        <Bar>
        <TextContainer>
            <Title>응원가 & 등장곡</Title>
            <Description>최애의 응원가와 등장곡을 들어봅시다!</Description>
          </TextContainer>
          <PlayBtn/>
        </Bar>
      </Card>
    </ThemeProvider>
    
  );
}