import React from "react";
import { ThemeProvider } from "@mui/material";
import InfoComp from "./InfoComp";
import CharacterComp from "./CharacterComp";
import {
  Card,
  Folder,
  // FolderTop,
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

export default function PlayerContainer() {
  const navigate = useNavigate();
  const playerCount = 3;
  const colors = ["#262F66"];
  // 연결하기,,,,
  const FolderTop = () => {
    const folderComponents = Array.from({ length: playerCount }, (_, index) => {
      const color = colors[index] || "#F8F8F8";
      return <FolderComponent key={index} isClick={true} />;
    });
    return (
      <>
        <div
          style={{ display: "flex", width: "100%", border: "1px solid black" }}
        >
          {folderComponents}
        </div>
      </>
    );
  };
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: "#F8F8F8",
            team: "#EA0029",
          },
        },
      }}
    >
      <Card>
        <Folder>
          <FolderTop playerCount={playerCount} />
          <Player>
            <CharacterComp />
            <InfoComp />
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
          <BtnContainer>
            <OffBtn onClick={() => console.log("실시간 방송 알림")} />
          </BtnContainer>
        </Container>
        <Container>
          <TextContainer>
            <Title>응원가 & 등장곡</Title>
            <Description>최애의 응원가와 등장곡을 들어봅시다!</Description>
          </TextContainer>
          <BtnContainer>
            <PlayBtn onClick={() => navigate("/songs")} />
          </BtnContainer>
        </Container>
      </Card>
    </ThemeProvider>
  );
}
