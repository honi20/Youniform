import styled from "styled-components";
import * as Font from "@/typography";
import HeartSvg from "@assets/mainview/heart.svg?react";

const InfoContainer = styled.div`
  width: 150px;
  height: 236px;
  flex-shrink: 0;
  border: 1px solid;
  border-color: ${(props) => props.theme.primary};
  margin-left: 0.69rem;
  /* padding: 10px; */
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const Header = styled.div`
  ${Font.Large};
  display: flex;
  height: 20%;
  justify-content: center;
  align-items: center;
  & h1 {
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: -3.5px;
  }
  & p {
    font-size: 1.5rem;
    margin-left: 5px;
    -webkit-text-stroke-width: 0.7px;
    -webkit-text-stroke-color: var(--Schemes-On-Primary, white);

    text-shadow: ${(props) =>
      `2px 2px 0 ${props.theme.primary}`}; /* 첫 번째 그림자 */
  }
`;
const Content = styled.div`
  ${Font.Small};
  font-weight: 400;
  display: flex;
  height: 30%;
  flex-direction: column;
  justify-content: space-around;
  margin: 7px;
  /* border: 1px solid blue; */
  /* justify-content: center; */
  /* align-items: center; */
`;

const Footer = styled.div`
  ${Font.Small};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* border: 1px solid black; */
`;
const FooterWrapper = styled.div`
  display: flex;
  margin: 0 10px;
  /* border: 1px solid red; */
`;
const InfoComp = ({ player }) => {
  return (
    <>
      {player ? (
        <InfoContainer>
          <Header>
            <h1>{player.backNum}</h1>
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
                <FooterWrapper>
                  <HeartSvg />
                  <div
                    key={label}
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    {label} {value}
                  </div>
                </FooterWrapper>
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
