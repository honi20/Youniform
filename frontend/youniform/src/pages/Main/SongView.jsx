import React, { useEffect } from "react";
import styled from "styled-components";
import VideoIcon from "@assets/Main/Video_duotone_line.svg?react";
import HeadsetIcon from "@assets/Main/Headphones_fill.svg?react";
import usePlayerStore from "@stores/playerStore";
import parse from "html-react-parser";
import * as Font from "@/typography"
import { useParams } from "react-router-dom";
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
const NavToggle = styled.div`
  height: 8%;
  display: flex;
  align-items: center;
  cursor: default;
  /* border: 1px solid black; */
`;
const ToggleBtn = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  // typo
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  cursor: default;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  /* box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.04); */
  /* border: 1px solid red; */
`;

const ToggleList = styled.div`
  display: ${(props) => (props.$isOn ? "flex" : "none")};
  position: absolute;
  z-index: 1;
  top: 8%;
  left: 15%;
  width: 70%;
  border: 1px solid #737373;
  background-color: white;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: auto;
  border-radius: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0.5rem;
`;
const ToggleItem = styled.div`
  display: ${(props) => (props.$isOn ? "flex" : "none")};
  padding: 0.63rem 1rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: ${(props) => (props.$isChecked ? "1px solid #262F66" : "")};
  background-color: ${(props) =>
    props.$isChecked ? "rgba(38, 47, 102, 0.30)" : "white"};
  // typo
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    text-decoration-line: underline;
    cursor: pointer;
  }
`;
const toggle = (isOn) => {
    return (
      <div style={{ display: "flex" }}>{isOn ? <UpIcon /> : <DownIcon />}</div>
    );
  };

const SongView = () => {
    const { teamSongs, fetchTeamSongs } = usePlayerStore();
    const {teamSongId} = useParams();
    useEffect(() => {
        if (teamSongs.length == 0) {
          console.log("fetch to team songs");
          fetchTeamSongs();
          console.log(teamSongs)
        }
      }, [fetchTeamSongs]);
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
      
      <NavToggle>
            <ToggleBtn onClick={() => handleToggle(isOn)}>
            {playerList.length > 0 &&
              (playerId == null 
                ? "팀 이름"  // 여기에 실제 팀 이름을 넣어야 합니다
                : playerList.find((p) => p.playerId == playerId)?.name)}
            {toggle(isOn)}
            </ToggleBtn>
            <ToggleList $isOn={isOn}>
            <ToggleItem
              $isOn={isOn}
              $isChecked={playerId === 'team'}
              key="team"
              onClick={() => handleToggleBtn('team')}
            >
              {"전체 팀"}  
              <SelectIcon $isChecked={playerId == 'team'} />
            </ToggleItem>
              {playerList.map((player) => (
                <ToggleItem
                  $isOn={isOn}
                  $isChecked={playerId === player.playerId}
                  key={player.playerId}
                  onClick={() => handleToggleBtn(player.playerId)}
                >
                  {player.name}
                  <SelectIcon $isChecked={playerId == player.playerId} />
                </ToggleItem>
              ))}
            </ToggleList>
          </NavToggle>
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

export default SongView