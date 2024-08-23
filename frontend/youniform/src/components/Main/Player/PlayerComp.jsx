import React, { useEffect, useState } from "react";
import InfoComp from "./InfoComp";
import CharacterComp from "./CharacterComp";
import Star1 from "@assets/Main/Star1.svg?react";
import Star2 from "@assets/Main/Star2.svg?react";
import Star3 from "@assets/Main/Star3.svg?react";
import Star4 from "@assets/Main/Star4.svg?react";
import Star5 from "@assets/Main/Star5.svg?react";
import Star6 from "@assets/Main/Star6.svg?react";
import * as St from "./PlayerCompStyle";
import { getApiClient } from "@stores/apiClient";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../stores/userStore";

export default function PlayerContainer({ onSelectPlayer, count, player }) {
  const [selectedFolder, setSelectedFolder] = useState(0);
  const navigate = useNavigate();
  const { user, fetchUser } = useUserStore();
  const [isOn, setIsOn] = useState(user ? user.playPushAlert : null);

  useEffect(() => {
    const loadUser = () => {
      if (!user || user.length == 0) {
        fetchUser();
      }
      loadUser();
      setIsOn(user.pushplayPushAlertAlert);
    };
  }, [fetchUser, user]);

  const handleFolderClick = (index) => {
    // console.log(index);
    setSelectedFolder(index);
    onSelectPlayer(index);
  };

  const toggleSwitch = async (playerId) => {
    setIsOn(!isOn);
    const apiClient = getApiClient();
    // console.log(!isOn);
    try {
      const response = await apiClient.patch(`/users/play/alert`, {
        pushAlert: !isOn,
      });
      // console.log("Server response:", response.data);
    } catch (error) {
      console.error("There was an error updating the toggle state:", error);
      setIsOn(isOn);
    }
  };
  const handleSong = async () => {
    // team 선택일 경우
    if (player.foundation){
      navigate(`/song/team/1000`)
    } else
    // player 선택일 경우
    navigate(`/song/player/${player.playerId}`)
  }
  // 선정한 플레이어 개수에 따라서 folder 개수 달라져야함
  const folderTop = (count) => {
    return (
      <St.FolderHeader style={{}}>
        {Array.from({ length: count }, (_, index) => (
          <St.FolderComponent
            key={index}
            onClick={() => handleFolderClick(index)}
            isClick={selectedFolder === index} // 선택된 폴더 상태
          ></St.FolderComponent>
        ))}
      </St.FolderHeader>
    );
  };
  return (
    <St.Card>
      <Star1
        style={{
          position: "absolute",
          top: "270px",
          left: "2px",
          zIndex: 5,
        }}
      />
      <Star2
        style={{
          position: "absolute",
          top: "265px",
          left: "40px",
          zIndex: 4,
        }}
      />
      <Star3
        style={{
          position: "absolute",
          top: "73px",
          left: "155px",
          zIndex: 4,
        }}
      />
      <Star4
        style={{
          position: "absolute",
          top: "84px",
          left: "160px",
          zIndex: 4,
        }}
      />
      <Star5
        style={{
          position: "absolute",
          top: "248px",
          left: "160px",
          zIndex: 4,
        }}
      />
      <Star6
        style={{
          position: "absolute",
          top: "289px",
          left: "172px",
          zIndex: 4,
        }}
      />
      <St.Folder>
        {folderTop(count)}
        <St.Player>
          <CharacterComp player={player} index={selectedFolder} />
          <InfoComp player={player} />
        </St.Player>
      </St.Folder>

      <St.DotLine />
      <St.StarLine>
        {Array.from({ length: 8 }).map((_, index) => (
          <St.Star key={index} />
        ))}
      </St.StarLine>
      <St.Container>
        <St.TextContainer>
          <St.Title>실시간 방송 알림</St.Title>
          <St.Description>방송이 시작될 때 알려드려요!</St.Description>
        </St.TextContainer>
        <St.BtnContainer>
          {/* <St.OffBtn /> */}
          <St.SwitchContainer
            $isOn={isOn}
            onClick={() => toggleSwitch(player.playerId)}
          >
            <St.Slider $isOn={isOn}>{isOn ? "ON" : "OFF"}</St.Slider>
          </St.SwitchContainer>
        </St.BtnContainer>
      </St.Container>
      <St.Container onClick={handleSong}>
        <St.TextContainer>
          <St.Title>응원가 & 등장곡</St.Title>
          <St.Description>최애의 응원가와 등장곡을 들어봅시다!</St.Description>
        </St.TextContainer>
        <St.BtnContainer>
          <St.PlayBtn />
        </St.BtnContainer>
      </St.Container>
    </St.Card>
  );
}
