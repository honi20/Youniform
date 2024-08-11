import React, { useState } from "react";
import InfoComp from "./InfoComp";
import CharacterComp from "./CharacterComp";
import Star1 from "@assets/mainview/Star1.svg?react";
import {
  Card,
  Folder,
  FolderComponent,FolderHeader,
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
} from "./PlayerCompStyle";
import { useNavigate } from "react-router-dom";

export default function PlayerContainer({ onSelectPlayer, 
  // count,
  // player
 }) {
  const [selectedFolder, setSelectedFolder] = useState(0);
  const navigate = useNavigate();
  // 나중에 삭제
  const count = 2;
  const player = {
    "playerId": 1,
    "name": "박용택",
    "age": "1979-04-21",
    "backNum": 33,
    "battingAverage": 0,
    "hit": 0,
    "homerun": 0,
    "steal": 0,
    "era": null,
    "whip": null,
    "win": null,
    "struck": null,
    "position": "외야수",
    "twoWay": "우투좌타"
  }
  const handleFolderClick = (index) => {
    console.log(index);
    setSelectedFolder(index);
    onSelectPlayer(index);
    // 폴더이동해야함
    // navigate(``);
  };

  // 선정한 플레이어 개수에 따라서 folder 개수 달라져야함
  const folderTop = (count) => {
    return (
      <FolderHeader style={{  }}>
        {Array.from({ length: count }, (_, index) => (
          <FolderComponent
            key={index}
            onClick={() => handleFolderClick(index)}
            isClick={selectedFolder === index} // 선택된 폴더 상태
          ></FolderComponent>
        ))}
      </FolderHeader>
    );
  };
  
  return (
    <Card>
      <Star1
      style={{
        position: "absolute",
        bottom: "5rem",
        zIndex: 5,
      }}
      />
      <Folder>
        {folderTop(count)}
        <Player>
          <CharacterComp player={player} />
          <InfoComp player={player} />
        </Player>
      </Folder>

      <DotLine />
      <StarLine>
        {Array.from({ length: 8 }).map((_, index) => (
          <Star key={index} />
        ))}
      </StarLine>
      <Container>
        <TextContainer>
          <Title>실시간 방송 알림</Title>
          <Description>방송이 시작될 때 알려드려요!</Description>
        </TextContainer>
        <BtnContainer onClick={() => console.log("실시간 방송 알림")}>
          <OffBtn />
        </BtnContainer>
      </Container>
      <Container>
        <TextContainer>
          <Title>응원가 & 등장곡</Title>
          <Description>최애의 응원가와 등장곡을 들어봅시다!</Description>
        </TextContainer>
        <BtnContainer
          onClick={() => navigate(`/song/player/${player.playerId}`)}
        >
          <PlayBtn />
        </BtnContainer>
      </Container>
    </Card>
  );
}
