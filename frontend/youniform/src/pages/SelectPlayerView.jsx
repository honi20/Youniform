import styled from "styled-components";
import { useState, useEffect } from "react";
import CheckIcon from "@assets/etc/Done_round_light.svg?react";
import BasicModal from "@components/Modal/BasicModal";
import useSignUpStore from "@stores/signUpStore";
import { getApiClient } from "@stores/apiClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usePlayerStore from "../stores/playerStore";
const Div = styled.div`
  width: 100%;
  height: ${(props) => (props.$step ? "calc(100vh - 120px)" : "calc(100vh - 120px)")};
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 5px solid black; */
`;

const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 1% 5%;
  box-sizing: border-box;
  /* border: 5px solid red; */
`;

const Title = styled.div`
  width: 50%;
  height: auto;
  // type
  color: #273b4a;
  font-family: "Pretendard";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.165px;
  /* border: 1px solid black; */
`;

const Subtitle = styled.div`
  width: 100%;
  flex: 1;
  height: auto;
  color: #949494;
  font-family: "Pretendard";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.165px;
  /* border: 1px solid red; */
`;

const Content = styled.div`
  width: 100%;
  height: 80%;
  gap: 10px;
  overflow-y: auto;
  padding: 1% 0;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 4%;
`;

const BtnItem = styled.div`
  width: 30%;
  aspect-ratio: 1/1;
  margin: 1%;
  align-items: flex-start;
`;

const Btn = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: rgb(152, 156, 179);
  flex-direction: column;
  border: ${(props) => (props.$selected ? "2px solid #262F66" : "none")};
  box-shadow: ${(props) =>
    props.$selected ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "0"};
  transition: box-shadow 0.3s ease;
  position: relative;
`;

const Check = styled.div`
  z-index: 1;
  height: 20%;
  aspect-ratio: 1/1;
  position: absolute;
  bottom: 5%;
  left: 5%;
  background-color: #262f66;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Number = styled.div`
  color: #000;
  text-align: center;
  font-family: "Pretendard";
  font-size: 0.85rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.01031rem;
`;

const Position = styled.div`
  color: #000;
  text-align: center;
  font-family: "Pretendard";
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.165px;
`;

const Name = styled.div`
  color: #000;
  text-align: center;
  font-family: "Pretendard";
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.165px;
`;

const PlayerButton = ({ player, selected, onClick }) => (
  <>
    <BtnItem onClick={onClick}>
      <Btn $selected={selected}>
        {selected && (
          <Check>
            <CheckIcon />
          </Check>
        )}
        {player.number && (
          <Number>No.{player.number.toString().padStart(2, "0")}</Number>
        )}
        {player.position && <Position>{player.position}</Position>}
        {player.name && <Name>{player.name}</Name>}
      </Btn>
    </BtnItem>
  </>
);

const Footer = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: start;
  padding: 10px;
  /* border: 1px solid red; */
`;

const ConfirmBtnWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  /* border: 1px solid pink; */
`;

const ConfirmBtn = styled.div`
  height: 100%;
  width: 40%;
  background-color: #262f66;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Pretendard";
  font-size: 1.25rem;
`;

const SelectPlayerView = ({ teamId = "1000", step }) => {
  const [playerList, setPlayerList] = useState([{ playerId: 0, name: "없음" }]);
  const { fetchPlayerList, fetchSignUpPlayerList } = usePlayerStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPlayerInfo = async (teamId) => {
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/players/list/1000`, // teamId = 최강야구여서 1000번으로 고정
        });

        const { body, header } = res.data;
        // console.log(body);
        // console.log(header.message);

        setPlayerList((prevList) => {
          if (prevList.length === 1) {
            return [...prevList, ...body.playerList];
          } else {
            const newList = [{ playerId: 0, name: "없음" }];
            return [...newList, ...body.playerList];
          }
        });
      } catch (err) {
        // console.log(err);
      }
    };
    fetchPlayerInfo();
  }, [teamId]);

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState("");

  const {
    user: { players, setPlayers },
  } = useSignUpStore();

  useEffect(() => {
    setPlayers(selectedPlayers);
  }, [selectedPlayers, setPlayers]);

  const handleClick = (id) => {
    // console.log(players);
    setSelectedPlayers((prevSelectedPlayers) => {
      if (id == 0) {
        return prevSelectedPlayers.includes(0) ? [] : [0];
      } else {
        if (prevSelectedPlayers.includes(0)) {
          return [id];
        } else if (prevSelectedPlayers.includes(id)) {
          return prevSelectedPlayers.filter((playerId) => playerId !== id);
        } else {
          if (prevSelectedPlayers.length < 3) {
            return [...prevSelectedPlayers, id];
          } else {
            const [, ...newSelection] = prevSelectedPlayers;
            return [...newSelection, id];
          }
        }
      }
    });
    // console.log(selectedPlayers);
  };

  const handleConfirmClick = () => {
    setModalState(
      selectedPlayers.length === 0 ? "PlayerChangeWarning" : "FavoriteChanged"
    );
    setIsModalOpen(true);
  };

  const handleModalButtonClick = (buttonType) => {
    // console.log("Button clicked:", buttonType);
    if (buttonType == 2) {
      // console.log("변경 요청 보내기", selectedPlayers);
      changePlayer();
    }
    setIsModalOpen(false);
  };

  const changePlayer = async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.patch(`users/favorite`, {
        teamId: 1000,
        players: selectedPlayers.length == 1 && selectedPlayers[0] == 0 ? [] : selectedPlayers,
      });
      // console.log(res.data);
      const { body, header } = res.data;

      // console.log(body);
      // console.log(header.message);
      await fetchPlayerList();
      navigate("/main");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <Div $step={step}>
      <Header>
        <Title>좋아하는 선수를</Title>
        <Title>선택하세요.</Title>
        <Subtitle>최대 3명 선택가능합니다.</Subtitle>
      </Header>
      <Content>
        <BtnWrapper>
          {playerList &&
            playerList.map((player) => (
              <PlayerButton
                key={player.playerId}
                player={player}
                selected={selectedPlayers.includes(player.playerId)}
                onClick={() => handleClick(player.playerId)}
              />
            ))}
        </BtnWrapper>
      </Content>
      {!(step == "3" || step == "4") && (
        <Footer>
          <ConfirmBtnWrapper>
            <ConfirmBtn onClick={handleConfirmClick}>선택완료</ConfirmBtn>
          </ConfirmBtnWrapper>
        </Footer>
      )}
      {isModalOpen && (
        <BasicModal
          state={modalState}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onButtonClick={handleModalButtonClick}
        />
      )}
    </Div>
  );
};

export default SelectPlayerView;
