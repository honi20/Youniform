import React, { useState } from "react";
import styled from "styled-components";
import VideoIcon from "@assets/Video_duotone_line.svg?react";
import HeadsetIcon from "@assets/Headphones_fill.svg?react";

const LyricsDisplay = styled.div`
  height: 77%;
  cursor: default;
  /* border: 1px solid lightblue; */
`;
const Title = styled.div`
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  //typo
  color: #262f66;
  font-family: "Pretendard";
  font-size: 2.0625rem;
  font-style: normal;
  font-weight: 700;
  /* border: 1px solid black; */
`;
const Character = styled.div`
  border: 1px solid blue;
  height: 40%;
`;
const Lyrics = styled.div`
  border: 1px solid red;
  height: 45%;
`;
const Footer = styled.div`
  height: 7%;
  display: flex;
  justify-content: end;
  align-items: end;
  // typo
  color: #6d6d6d;
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 600;
  cursor: default;
`;
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 0.3rem;
  /* border: 1px solid blue; */
`;

const PlayerSongView = ({ active }) => {
  return (
    <>
      <LyricsDisplay>
        <Title>
          <VideoIcon />
          테스트
          {active === 0 ? " 등장곡" : " 응원가"}
        </Title>
        <Character>캐릭터</Character>
        <Lyrics>가사</Lyrics>
      </LyricsDisplay>
      <Footer>
        <LinkContainer onClick={() => console.log("유튜브링크")}>
          <HeadsetIcon />
          노래 듣기
        </LinkContainer>
      </Footer>
    </>
  );
};

export default PlayerSongView;
