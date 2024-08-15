// 최애선수 서비스 메인홈
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayerComp from "@components/Main/Player/PlayerComp";
import MessageIcon from "@assets/Main/Message_light.svg?react";
import ChatIcon from "@assets/Main/Chat_alt_2_light.svg?react";
import HeartIcon from "@assets/Main/Add_ring_light.svg?react";
import { useNavigate } from "react-router-dom";
import usePlayerStore from "@stores/playerStore";
import Loading from "@components/Share/Loading";
import Error from "@components/Share/Error";
import useUserStore from "@stores/userStore";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 50px; */
  width: 100%;
  height: calc(100vh - 140px); // navbar + header
  background-color: #f8f8f8;
  /* border: 1px solid black; */
  overflow-y: auto;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
  /* flex: 1; */
  /* border: 1px solid black; */
`;
const Btn = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  color: #262f66;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  /* border: 1px solid black; */
`;
const TextContainer = styled.div`
  color: #262f66;
  font-family: "Pretendard";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const MainView = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const navigate = useNavigate();
  const { team, fetchTeamList, playerList, fetchPlayerList, loading, error } = usePlayerStore();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    const loadPlayList = async () => {
      if ((!playerList || playerList.length == 0) || (!team || team.length == 0)) {
        await fetchPlayerList();
        await fetchTeamList();
      };
      console.log('fetch', playerList, team)
    }
    loadPlayList();
  }, [fetchPlayerList, fetchTeamList]);

  useEffect(() => {
    const loadUser = async () => {
      if (!user || user.length == 0) {
        await fetchUser();
      }
    };
    loadUser();
  }, [fetchUser, user]);

  const handleSelectPlayer = (playerId) => {
    setSelectedPlayer(playerId);
  };
  const handleNews = () => {
    navigate(`/news/${playerList.length == 0 ? '1000' : playerList[selectedPlayer].playerId}`);
  };
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <Div>
      <PlayerComp
        count={playerList.length}
        onSelectPlayer={handleSelectPlayer}
        player={playerList.length == 0 ? team : playerList[selectedPlayer]}
      />
      <Container>
        <Btn onClick={handleNews}>
          <IconWrapper>
            <MessageIcon />
          </IconWrapper>
          <TextContainer>야구 뉴스</TextContainer>
  </Btn>
        <Btn
          onClick={() =>
            navigate(`/chat/${playerList.length==0? 1000 : playerList[selectedPlayer].playerId}`)
          }
        >
          <IconWrapper>
            <ChatIcon />
          </IconWrapper>
          <TextContainer>응원 채팅</TextContainer>
        </Btn>
        <Btn onClick={() => navigate("/select-player")}>
          <IconWrapper>
            <HeartIcon />
          </IconWrapper>
          <TextContainer>선수 설정</TextContainer>
        </Btn>
      </Container>
    </Div>
  );
};

export default MainView;
