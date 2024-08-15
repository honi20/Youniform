import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Font from "@/typography";
import NotificationToggle from "@components/Setting/NotificationToggle";
import usePlayerStore from "@stores/playerStore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  ${Font.Medium}
  display: flex;
  margin-bottom: 45px;
`;
const ContentWrapper = styled.div`
  box-sizing: border-box;
  height: 70%;
  width: 80%;
  margin: 0 auto;
  padding: 20px 0;
`;

const PlayerPushAlarm = () => {
  const { playerList, fetchPlayerList, updatePlayerPushAlert } = usePlayerStore();

  useEffect(() => {
    fetchPlayerList();
  }, [fetchPlayerList]);

  const [playerNotifications, setPlayerNotifications] = useState({});

  useEffect(() => {
    const initialNotificationsState = playerList.reduce((acc, player) => {
      acc[player.playerId] = player.pushAlert || false;
      return acc;
    }, {});
    setPlayerNotifications(initialNotificationsState);
  }, [playerList]);

  const handlePlayerToggle = async (playerId) => {
    const newValue = !playerNotifications[playerId];

    // Update the local state
    setPlayerNotifications({
      ...playerNotifications,
      [playerId]: newValue,
    });

    // Call API to update the player's push alert status
    try {
      await updatePlayerPushAlert(playerId, newValue);
      console.log(`Player ${playerId} pushAlert status updated to ${newValue}`);
    } catch (error) {
      console.log("Failed to update player pushAlert status", error);
      // Revert the state change in case of an error
      setPlayerNotifications({
        ...playerNotifications,
        [playerId]: !newValue,
      });
    }
  };

  return (
    <Container>
      <Title>최애 등장 알림 설정</Title>
      <ContentWrapper>
        {playerList.map((player) => (
          <NotificationToggle
            key={player.playerId}
            label={`‘${player.name}’ 선수 등장 소식 받기`}
            enabled={playerNotifications[player.playerId]}
            onToggle={() => handlePlayerToggle(player.playerId)}
          />
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default PlayerPushAlarm;
