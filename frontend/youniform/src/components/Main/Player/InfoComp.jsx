import styled from "styled-components";

const InfoContainer = styled.div`
  width: 45%;
  height: 90%;
  flex-shrink: 0;
  border: 1px solid #262f66;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  height: 20%;
  border: 1px solid red;
`;
const Content = styled.div`
  display: flex;
  height: 30%;
  border: 1px solid blue;
  flex-direction: column;
`;
const Footer = styled.div`
  /* display: flex; */
  flex: 1;
  border: 1px solid black;
`;
const InfoComp = ({ player }) => {
  return (
    <>
      {player ? (
        <InfoContainer>
          <Header>
            <p>{player.backNum}</p>
            <p>{player.name}</p>
          </Header>
          <Content>
            <div>{player.age}</div>
            <div>{player.team ? player.team : "최강 MONSTERS"}</div>
            <div>
              {player.position}/{player.twoWay}
            </div>
          </Content>
          <Footer>
            {Object.entries({
              타율: player.battingAverage,
              홈런: player.homerun,
              안타: player.hit,
              도루: player.steal,
              평균자책: player.era,
              WHIP: player.whip,
              승률: player.win,
              삼진: player.struck,
            }).map(([label, value]) =>
              value !== null ? (
                <div key={label}>
                  {label} {value}
                </div>
              ) : null
            )}
          </Footer>
        </InfoContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default InfoComp;
