import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoIcon from "@assets/Main/Video_duotone_line.svg?react";
import HeadsetIcon from "@assets/Main/Headphones_fill.svg?react";
import usePlayerStore from "@stores/playerStore";
import parse from "html-react-parser";
import * as Font from "@/typography"
import DownIcon from "@assets/Main/chevron-down.svg?react";
import UpIcon from "@assets/Main/chevron-up.svg?react";

import { useNavigate, useParams } from "react-router-dom";
const Wrapper = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const OuterContainer = styled.div`
  position: relative;
  width: 95%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlurredBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 1.5rem;
  border: 1px solid #262f66;
  filter: blur(2px);
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  border-radius: 1.5rem;
  width: 95%;
  height: 95%;

  /* display: flex; */
`;
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
  justify-content: center;
  cursor: default;
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
   
    const moveToLink = (link) => {
      window.open(link, "_blank", "noopener,noreferrer");
    };
    const navigate = useNavigate()
    const [isOn, setIsOn] = useState(false); // 초기 상태 off
    const handleToggle = () => setIsOn((prevIsOn) => !prevIsOn);
    console.log(teamSongs)
    const handleToggleBtn = (id) => {
      setIsOn(false);
      navigate(`/song/team-song/${id}`);
    };
    return (
      <>
       <Wrapper>
      <OuterContainer>
        <BlurredBorder />
        <ContentWrapper>
      <LyricsDisplay>
      <NavToggle>
            <ToggleBtn onClick={() => handleToggle(isOn)}>
            {teamSongs.find((song) => song.teamSongId == teamSongId)?.title}
            {toggle(isOn)}
            </ToggleBtn>
            <ToggleList $isOn={isOn}>
            {teamSongs.map((song) => (
            <ToggleItem
             $isOn={isOn}
             $isChecked={teamSongId === song.teamSongId}
             key={song.teamSongId}
             onClick={() => handleToggleBtn(song.teamSongId)}
            >
            {song.title}
            </ToggleItem>))
}
            </ToggleList>
          </NavToggle>
          <Title>
            <VideoIcon />
            {teamSongs && teamSongs.length > 0
                  ? 
                  teamSongs.filter((song) => song.teamSongId == teamSongId)[0].title
                  : 
                  <>No Song</>
            } 
          </Title>
        <Character>
        <CharacterContainer
              src="https://dsfjel9nvktdp.cloudfront.net/asset/player_appearance_song.png"
              alt="Appearance_song"
            />
        </Character>
        <Lyrics>
          {teamSongs && teamSongs.length > 0
                  ? 
                  parseText(teamSongs.filter((song) => song.teamSongId == teamSongId)[0].lyrics)
                  : 
                  <>No song available</>
            } 
        </Lyrics>
      </LyricsDisplay>
      <Footer>
        {/* <LinkContainer onClick={() => moveToLink(playerSongs[active].link)}>
          <HeadsetIcon />
          노래 듣기
        </LinkContainer> */}
      </Footer>
      </ContentWrapper>
      </OuterContainer>
      </Wrapper>
      </>
    );
  };

export default SongView