import React, { useState } from "react";
import InfoComp from "./InfoComp";
import CharacterComp from "./CharacterComp";
import {
  Card,
  Folder,
  FolderComponent,
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

export default function PlayerContainer({ onSelectPlayer, player, count }) {
  const [selectedFolder, setSelectedFolder] = useState(0);
  const navigate = useNavigate();
  // const playerCount = 3;

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
      <div style={{ display: "flex", width: "100%" }}>
        {Array.from({ length: count }, (_, index) => (
          <FolderComponent
            key={index}
            onClick={() => handleFolderClick(index)}
            isClick={selectedFolder === index} // 선택된 폴더 상태
          ></FolderComponent>
        ))}
      </div>
    );
  };

  return (
    <Card>
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
