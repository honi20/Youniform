import React, { useEffect, useState } from "react";
import TeamSongComp from "@components/Main/Player/TeamSongComp";
import { useNavigate, useParams } from "react-router-dom";
import usePlayerStore from "@stores/playerStore";
import * as St from "./SongStyle"

const TotalSongView = () => {
  // store에서 꺼내야함
  const {
    playerList,
    fetchPlayerList,
    teamSongs,
    fetchTeamSongs,
    playerSongs,
    fetchPlayerSongs,
  } = usePlayerStore();
  const { playerId } = useParams();
  const [player, setPlayer] = useState();
  const navigate = useNavigate();
  const teamId = 1000;
  useEffect(() => {
    if (teamSongs.length == 0) {
      console.log("fetch to team songs");
      fetchTeamSongs();
    }
  }, [fetchTeamSongs]);

  useEffect(() => {
    console.log(playerList);
    if (playerList.length == 0) {
      console.log("fetch to player list");
      fetchPlayerList();
    }
  }, [fetchPlayerList]);

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
  const renderTeamSongs = () => {
    switch (activeBtn){
    case 0:
      const songs = teamSongs.filter((song) => song.type == "OFFICIAL")
      return (
      <TeamSongComp songs={songs}/> 
      )
    }

  }
  return (
    <St.Wrapper>
      <St.OuterContainer>
        <St.BlurredBorder />
        <St.ContentWrapper>
          <St.NavToggle>
            <St.ToggleBtn onClick={() => handleToggle(isOn)}>
            {
              (playerId === undefined) 
                ? "팀 이름"  // 여기에 실제 팀 이름을 넣어야 합니다
                : playerList.find((p) => p.playerId == playerId)?.name}
            {St.toggle(isOn)}
            </St.ToggleBtn>
            <St.ToggleList $isOn={isOn}>
            <St.ToggleItem
              $isOn={isOn}
              // $isChecked={player.playerId === 'team'}
              key="team"
              onClick={() => handleToggleBtn('team')}
            >
              {"전체 팀"}  
              <St.SelectIcon $isChecked={playerId == 'team'} />
            </St.ToggleItem>
              {playerList.map((player) => (
                <St.ToggleItem
                  $isOn={isOn}
                  $isChecked={playerId != undefined && playerId === player.playerId}
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
          {isTeamClass ? <>{renderTeamSongs()}</> : <></>}
        </St.ContentWrapper>
      </St.OuterContainer>
    </St.Wrapper>
    
  );
};

export default TotalSongView;
