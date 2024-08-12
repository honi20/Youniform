import styled from "styled-components";

const MainContainer = styled.div`
  width: 133px;
  height: 236px;
  flex-shrink: 0;
  border: 1px solid #262f66;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CharacterContainer = styled.div`
  flex: 1; // 남는 공간에 모두 할당
  margin-top: 20%;
  /* border: 1px solid red; */
`;
const PlayerNameContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10%;
  // typo
  color: #000;
  font-family: "Pretendard";
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  /* border: 1px solid black; */
`;
const CharacterComp = ({ player }) => {
  return (
    <MainContainer>
      <CharacterContainer></CharacterContainer>
      <PlayerNameContainer>{player ? player.name : ""}</PlayerNameContainer>
    </MainContainer>
  );
};

export default CharacterComp;
