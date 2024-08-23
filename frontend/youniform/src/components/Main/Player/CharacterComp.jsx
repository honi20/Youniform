import styled from "styled-components";

const MainContainer = styled.div`
  width: 133px;
  height: 236px;
  flex-shrink: 0;
  border: 1px solid #262f66;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;
const CharacterContainer = styled.img`
  flex: 1; // 남는 공간에 모두 할당
  z-index: 0;
  position: absolute;
  display: flex;
  left: 50%;
  top: 10px;
  transform: translate(-50%, 0);
  align-items: center;
  /* border: 1px solid red; */
`;
const PlayerNameContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10%;
  // typo
  color: #000;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  /* border: 1px solid black; */
`;
const CharacterComp = ({ player, index }) => {
  // console.log(index, player)
  const renderImages = () => {
    if (player.position === "투수") {
      switch (index) {
        case 0:
          return (
            <CharacterContainer
              src="https://dsfjel9nvktdp.cloudfront.net/asset/main_pitcher1.png"
              alt="Pitcher 1"
              style={{ height: "180px"}}
            />
          );
        case 1:
          return (
            <CharacterContainer
              src="https://dsfjel9nvktdp.cloudfront.net/asset/main_pitcher2.png"
              alt="Pitcher 2"
              style={{ height: "180px"}}
            />
          );
        default:
          return <CharacterContainer
          src="https://dsfjel9nvktdp.cloudfront.net/asset/main_pitcher1.png"
          alt="Pitcher 1"
          style={{ height: "180px"}}
        />;
      }
    } else {
      switch (index) {
        case 0:
          return (
            <CharacterContainer
              src="https://dsfjel9nvktdp.cloudfront.net/asset/main_hitter1.png"
              alt="Player 1"
              style={{ height: "240px", top: "-20px"}}
            />
          );
        case 1:
          return (
            <CharacterContainer
              src="https://dsfjel9nvktdp.cloudfront.net/asset/main_hitter2.png"
              alt="Player 2"
              style={{ height: "170px"}}
            />
          );
        case 2:
          return (
            <CharacterContainer
              src="https://dsfjel9nvktdp.cloudfront.net/asset/main_hitter3.png"
              alt="Player 3"
              style={{ height: "170px"}}
            />
          );
        default:
          return null;
      }
    }
  };
  return (
    <MainContainer>
      <div>{player && player.imgUrl ? <CharacterContainer
      src="https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/monsters.png"
      style={{height: "160px", marginTop: "40px"}}/>
 : renderImages()}</div>
      <PlayerNameContainer>{player && player.imgUrl ? null : player.name}</PlayerNameContainer>
    </MainContainer>
  );
};

export default CharacterComp;
