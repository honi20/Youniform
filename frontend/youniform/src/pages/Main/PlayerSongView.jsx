import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoIcon from "@assets/Main/Video_duotone_line.svg?react";
import HeadsetIcon from "@assets/Main/Headphones_fill.svg?react";
import { useNavigate, useParams } from "react-router-dom";
import usePlayerStore from "@stores/playerStore";
import parse from "html-react-parser";
import * as Font from "@/typography";
import * as St from "./SongStyle";

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
  height: 40%;
  /* border: 1px solid red; */
`;
const Lyrics = styled.div`
  ${Font.Medium}
  display: flex;
  justify-content: center;
  margin: 10px 30px;
  text-align: center;
  height: 45%;
  overflow-y: auto;
  /* border: 1px solid black; */
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
  max-height: 100%;
  transform: translate(-50%, 0);
  align-items: center;
  position: relative;
`;
const PlayerSongView = ({}) => {
  const { playerList, fetchPlayerList, playerSongs, fetchPlayerSongs } =
    usePlayerStore();

  const { playerId } = useParams();
  const [player, setPlayer] = useState();
  const navigate = useNavigate();

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
  const [isOn, setIsOn] = useState(false); // 초기 상태 off
  const handleToggle = () => setIsOn((prevIsOn) => !prevIsOn);
  // const teamName = "전체 팀";
  const handleToggleBtn = (id) => {
    setIsOn(false);
    if (id === 'team'){
      setPlayer('team');
      navigate(`/song/team/1000`)
    } else {
    setPlayer(playerList.find((p) => p.playerId == id));
    navigate(`/song/player/${id}`);
    }
  };
  const [activeBtn, setActiveBtn] = useState(0);
  const handleBtnClick = (btnIndex) => {
    console.log(btnIndex);
    setActiveBtn(btnIndex);
  };
  const isTeamClass = playerId == undefined;
  const switchChange = () => {
    const buttonLabels = isTeamClass
      ? ["공식", "비공식"]
      : ["등장곡", "응원가"];

    return (
      <>
        {buttonLabels.map((label, index) => (
          <St.Btn
            key={index}
            $isActive={activeBtn === index}
            onClick={() => handleBtnClick(index)}
          >
            {label}
          </St.Btn>
        ))}
      </>
    );
  };
  const renderCharacter = () => {
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
  };
  const moveToLink = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <St.Wrapper>
        <St.OuterContainer>
          <St.BlurredBorder />
          <St.ContentWrapper>
            <St.NavToggle>
              <St.ToggleBtn onClick={() => handleToggle(isOn)}>
                {playerId === undefined
                  ? "팀 이름" // 여기에 실제 팀 이름을 넣어야 합니다
                  : playerList.find((p) => p.playerId == playerId)?.name}
                {St.toggle(isOn)}
              </St.ToggleBtn>
              <St.ToggleList $isOn={isOn}>
                <St.ToggleItem
                  $isOn={isOn}
                  // $isChecked={player.playerId === 'team'}
                  key="team"
                  onClick={() => handleToggleBtn("team")}
                >
                  {"전체 팀"}
                  <St.SelectIcon $isChecked={playerId == "team"} />
                </St.ToggleItem>
                {playerList.map((player) => (
                  <St.ToggleItem
                    $isOn={isOn}
                    $isChecked={
                      playerId != undefined && playerId === player.playerId
                    }
                    key={player.playerId}
                    onClick={() => handleToggleBtn(player.playerId)}
                  >
                    {player.name}
                    <St.SelectIcon $isChecked={playerId == player.playerId} />
                  </St.ToggleItem>
                ))}
              </St.ToggleList>
            </St.NavToggle>
            <St.TabSwitcher>
              <St.Switcher>{switchChange()}</St.Switcher>
            </St.TabSwitcher>
            <LyricsDisplay>
              <Title>
                <VideoIcon />
                {playerSongs && playerSongs.length > 0 ? (
                  activeBtn === 0 ? (
                    playerSongs.filter((song) => song.type == "APPEARANCE")[0]
                      .title
                  ) : (
                    playerSongs.filter((song) => song.type == "CHEERING")[0]
                      .title
                  )
                ) : (
                  <>No Song</>
                )}
              </Title>
              <Character>{renderCharacter()}</Character>
              <Lyrics>
                {playerSongs && playerSongs.length > 0
                  ? activeBtn === 0
                    ? parseText(
                        playerSongs.filter(
                          (song) => song.type == "APPEARANCE"
                        )[0].lyrics
                      )
                    : playerSongs.length > 1
                    ? parseText(
                        playerSongs.filter((song) => song.type == "CHEERING")[0]
                          .lyrics
                      )
                    : "No song available"
                  : "No song available"}
              </Lyrics>
            </LyricsDisplay>
            <Footer>
              <LinkContainer
                onClick={() => moveToLink(playerSongs[activeBtn].link)}
              >
                <HeadsetIcon />
                노래 듣기
              </LinkContainer>
            </Footer>
          </St.ContentWrapper>
        </St.OuterContainer>
      </St.Wrapper>
    </>
  );
};

export default PlayerSongView;
