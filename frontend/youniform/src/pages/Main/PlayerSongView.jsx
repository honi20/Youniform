import React, { useEffect } from "react";
import styled from "styled-components";
import VideoIcon from "@assets/Main/Video_duotone_line.svg?react";
import HeadsetIcon from "@assets/Main/Headphones_fill.svg?react";
import usePlayerStore from "@stores/playerStore";
import parse from "html-react-parser";
import * as Font from "@/typography"
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
  /* border: 1px solid blue; */
  height: 40%;
  /* position: absolute; */
`;
const Lyrics = styled.div`
${Font.Medium}
display: flex;
justify-content: center;
margin: 10px 30px;
text-align: center;
  height: 45%;
  overflow-y: auto;
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
const CharacterContainer = styled.img`
  flex: 1; 
  z-index: 0;
  display: flex;
  left: 50%;
  height: 200px;
  width: 200px;
  /* top: 10px; */
  transform: translate(-50%, 0);
  align-items: center;
  position: relative;
`;
const PlayerSongView = ({ active, playerId }) => {
  const { playerSongs, fetchPlayerSongs } = usePlayerStore();
  useEffect(() => {
    fetchPlayerSongs(playerId);
    console.log(playerSongs[0]);
  }, [playerId, fetchPlayerSongs]);
  const parseText = (text) => {
    // 줄바꿈을 <br /> 태그로 변환
    const formattedText = text.replace(/\n/g, "<br />");
    // HTML을 JSX로 변환
    return parse(formattedText);
  };
  const renderCharacter = () => {
    switch (active) {
      case 0:
        return (
          <CharacterContainer
              src="https://youniforms3.s3.ap-northeast-2.amazonaws.com/asset/player_appearance_song.png"
              alt="Appearance_song"
            />
        )
        case 1:
          return (
            <CharacterContainer
              src="https://youniforms3.s3.ap-northeast-2.amazonaws.com/asset/player_cheering_song.png"
              alt="Cheering_song"
            />
          )
    }
  }
  const moveToLink = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <LyricsDisplay>
        <Title>
          <VideoIcon />
          {playerSongs && playerSongs.length > 0 
          ? 
          active === 0 
            ? 
            playerSongs.filter((song) => song.type == "APPEARANCE")[0].title 
            : 
            playerSongs.filter((song) => song.type == "CHEERING")[0].title
          :
          <>No Song</>}
        </Title>
        <Character>
        {renderCharacter()}
        </Character>
        <Lyrics>
          {playerSongs && playerSongs.length > 0
            ? active === 0
              ? parseText(playerSongs.filter((song) => song.type == "APPEARANCE")[0].lyrics)
              : playerSongs.length > 1
              ? parseText(playerSongs.filter((song) => song.type == "CHEERING")[0].lyrics)
              : "No song available"
            : "No song available"}
        </Lyrics>
      </LyricsDisplay>
      <Footer>
        <LinkContainer onClick={() => moveToLink(playerSongs[active].link)}>
          <HeadsetIcon />
          노래 듣기
        </LinkContainer>
      </Footer>
    </>
  );
};

export default PlayerSongView;
