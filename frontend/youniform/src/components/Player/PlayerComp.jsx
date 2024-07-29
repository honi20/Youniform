import React from "react";
import { ThemeProvider } from "@mui/material";
import InfoComp from "./InfoComp";
import CharacterComp from "./CharacterComp";
import {
  Card,
  Folder,
  FolderHeader,
  FolderTop,
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

export default function PlayerContainer() {
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
          <FolderHeader>
            <FolderTop />
          </FolderHeader>
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
            <PlayBtn onClick={() => console.log("응원가 라우터 이동")} />
          </BtnContainer>
        </Container>
      </Card>
    </ThemeProvider>
  );
}
