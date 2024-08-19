import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoIcon from "@assets/Main/Video_duotone_line.svg?react";
import usePlayerStore from "@stores/playerStore";
import parse from "html-react-parser";
import * as Font from "@/typography";
import HeadsetIcon from "@assets/Main/Headphones_fill.svg?react";
import { useParams, useOutletContext } from "react-router-dom";

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
  /* border: 1px solid red; */
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
const CharacterContainer = styled.img`
  flex: 1;
  z-index: 0;
  display: flex;
  left: 50%;
  height: 200px;
  max-height: 100%;
  width: 200px;
  /* top: 10px; */
  transform: translate(-50%, 0);
  align-items: center;
  position: relative;
`;
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 0.3rem;
  /* border: 1px solid blue; */
`;
const SongView = () => {
  const {
    teamSongs,
    fetchTeamSongs,
    playerSongs,
    fetchPlayerSongs,
    fetchTotalList,
  } = usePlayerStore();
  const { teamSongId, playerId } = useParams();
  const { activeBtn } = useOutletContext();

  useEffect(() => {
    console.log(teamSongId, playerId);
    if (teamSongId && teamSongs.length == 0) {
      console.log("fetch to team songs");
      fetchTeamSongs();
    } else if (playerId) {
      console.log("fetch to player songs");
      fetchPlayerSongs(playerId);
    }
  }, [fetchTotalList, fetchTeamSongs, fetchPlayerSongs, playerId]);

  const parseText = (text) => {
    // 줄바꿈을 <br /> 태그로 변환
    // console.log(text);
    if (typeof text !== "string") {
      return ""; // or some other fallback value
    }

    const formattedText = text.replace(/\n/g, "<br />");
    // HTML을 JSX로 변환
    return parse(formattedText);
  };

  const moveToLink = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // console.log(teamSongs, playerSongs);
  // console.log(playerSongs.filter((song) => song.type == "CHEERING")[0]?.lyrics);
  const renderCharacter = () => {
    if (teamSongId) {
      return (
        <CharacterContainer
          src="https://dsfjel9nvktdp.cloudfront.net/asset/team_song.png"
          alt="monsters_team_song"
        />
      );
    }
    if (playerId) {
      switch (activeBtn) {
        case 0:
          return (
            <CharacterContainer
              src="https://dsfjel9nvktdp.cloudfront.net/asset/player_appearance_song.png"
              alt="Appearance_song"
            />
          );
        case 1:
          return (
            <CharacterContainer
              src="https://dsfjel9nvktdp.cloudfront.net/asset/player_cheering_song.png"
              alt="Cheering_song"
            />
          );
      }
    }
  };
  return (
    <>
      <LyricsDisplay>
        <Title>
          <VideoIcon />
          {teamSongId &&
            (teamSongs.length > 0 ? (
              teamSongs.filter((song) => song.teamSongId == teamSongId)[0]
                ?.title
            ) : (
              <>No Song</>
            ))}
          {playerId &&
            (playerSongs.length > 0 ? (
              (() => {
                const songType = activeBtn === 0 ? "APPEARANCE" : "CHEERING";
                const song = playerSongs.find((song) => song.type === songType);
                return song ? song.title : <>No song</>;
              })()
            ) : (
              <>No song</>
            ))}
        </Title>
        <Character>{renderCharacter()}</Character>
        <Lyrics>
          {teamSongId &&
            (teamSongs.length > 0 ? (
              parseText(
                teamSongs.filter((song) => song.teamSongId == teamSongId)[0]
                  ?.lyrics
              )
            ) : (
              <>No song available</>
            ))}
          {playerId &&
            (playerSongs.length > 0 ? (
              activeBtn === 0 ? (
                parseText(
                  playerSongs.filter((song) => song.type == "APPEARANCE")[0]
                    ?.lyrics
                )
              ) : (
                parseText(
                  playerSongs.filter((song) => song.type == "CHEERING")[0]
                    ?.lyrics
                )
              )
            ) : (
              <>No song</>
            ))}
        </Lyrics>
      </LyricsDisplay>
      <Footer>
        {teamSongId && teamSongs.length > 0 ? (
          <LinkContainer onClick={() => moveToLink(teamSongs[activeBtn]?.link)}>
            <HeadsetIcon />
            노래 듣기
          </LinkContainer>
        ) : null}
        {playerId && playerSongs.length > 0 ? (
          <LinkContainer
            onClick={() => moveToLink(playerSongs[activeBtn]?.link)}
          >
            <HeadsetIcon />
            노래 듣기
          </LinkContainer>
        ) : null}
      </Footer>
    </>
  );
};

export default SongView;
