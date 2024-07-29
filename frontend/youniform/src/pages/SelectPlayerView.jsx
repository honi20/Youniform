import styled from "styled-components";
import { useState } from 'react';
import CheckIcon from '../assets/Done_round_light.svg?react';
import BasicModal from "../components/Modal/BasicModal";

const Div = styled.div`
  margin-top: 50px;
  width: 100%;
  height: calc(100% - 120px);
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`
const Header = styled.div`
  width: 100%;
  height: auto;
  /* height: 15%; */
  border: 1px solid burlywood;
  display: flex;
  flex-direction: column;
  /* padding: 10% auto; */
  /* padding: auto 10%; */
  padding: 0 3%;
  box-sizing: border-box;
`
const Title = styled.div`
  width: 50%;
  height: auto;
  border: 1px solid black;
  // type
  color: #273B4A;
  font-family: 'Pretendard';
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.165px;
`
const Subtitle = styled.div`
  width: 100%;
  flex: 1;
  height: auto;
  border: 1px solid red;
  color: #949494;
  font-family: 'Pretendard';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.165px;
`
const Content = styled.div`
  /* flex: 1; */
  width: 100%;
  height: 70%;
  border: 1px solid blue;
  /* display: flex; */
  gap: 10px;
  overflow-y: auto;
`
const BtnWrapper = styled.div`
  width: 100%;
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const BtnItem = styled.div`
  border: 1px solid black;
  width: 30%;
  aspect-ratio: 1/1;
  margin: 1%;
`
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
  border: ${props => props.$selected ? '2px solid #262F66' : 'none' };
  box-shadow: ${props => props.$selected ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0'};
  /* cursor: pointer; */
  transition: box-shadow 0.3s ease;
  position: relative;
`
const Check = styled.div`
  z-index: 1;
  height: 20%;
  aspect-ratio: 1/1;
  position: absolute;
  bottom: 5%;
  left: 5%;
  background-color: #262F66;;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Number = styled.div`
  /* border: 1px solid red; */
  color: #000;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 0.85rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.01031rem;
`
const Position = styled.div`
  color: #000;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.165px;
`
const Name = styled.div`
  color: #000;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.165px;
`

const PlayerButton = ({ player, selected, onClick }) => (
  <>
  <BtnItem onClick={onClick}>
    <Btn $selected={selected} >
      {selected && <Check><CheckIcon/></Check>}
      {player.number && (
        <Number>No.{player.number.toString().padStart(2, '0')}</Number>
      )}
      {player.position && (
        <Position>{player.position}</Position>
      )}
      {player.name && (
        <Name>{player.name}</Name>
      )}
    </Btn>
  </BtnItem>
  </>
);

const Footer = styled.div`
  width: 100%;
  height: 15%;
  border: 1px solid red;
  display: flex;
  align-items: start;
`
const ConfirmBtnWrapper = styled.div`
  width: 100%;
  height: 3rem;
  border: 1px solid pink;
  display: flex;
  justify-content: center;
`
const ConfirmBtn = styled.div`
  height: 100%;
  width: 40%;
  background-color: #262f66;
  border-radius: 1.5rem;
  
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Pretendard';
  font-size: 1.25rem;
`
const SelectPlayerView = () => {
  const playersInfo = [
    { id: 0, name: '없음' },
    { id: 1, number: '1', position: '내야수', name: '유태웅' },
    { id: 2, number: '2', position: '외야수', name: '최수현' },
    { id: 3, number: '4', position: '내야수', name: '서동욱' },
    { id: 4, number: '5', position: '내야수', name: '문교원' },
    { id: 6, number: '8', position: '내야수', name: '정근우' },
    { id: 7, number: '10', position: '내야수', name: '이대호' },
    { id: 8, number: '11', position: '투수', name: '이대은' },
    { id: 9, number: '12', position: '포수', name: '박재욱' },
    { id: 10, number: '13', position: '투수', name: '장원삼' },
    { id: 11, number: '15', position: '외야수', name: '국해성' },
    { id: 12, number: '16', position: '내야수', name: '정성훈' },
  ]
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState('');

  const handleClick = (id) => {
    setSelectedPlayers(prevSelectedPlayers => {
      if (id == 0){
        return prevSelectedPlayers.includes(0) ? [] : [0];
      } else {
        if (prevSelectedPlayers.includes(0)) {
          return [id];
        } else if (prevSelectedPlayers.includes(id)) {
          return prevSelectedPlayers.filter(playerId => playerId !== id);
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
  };
  const handleConfirmClick = () => {
    console.log(selectedPlayers)
    if (selectedPlayers.length == 0) {
      setModalState('PlayerChangeWarning')        ;
    } else {
      setModalState('FavoriteChanged');
    }
    setIsModalOpen(true);
  }
  const handleModalButtonClick = (buttonType) => {
    console.log('Button clicked:', buttonType);
    setIsModalOpen(false);
  };
  return (
    <Div>
      <Header>
        <Title>좋아하는 선수를</Title>
        <Title>선택하세요.</Title>
        <Subtitle>최대 3명 선택가능합니다.</Subtitle>
      </Header>
      <Content>
        <BtnWrapper>
        {playersInfo.map(info => (
           <PlayerButton
            key={info.id}
            player={info}
            selected={selectedPlayers.includes(info.id)}
            onClick={() => handleClick(info.id)}
           />
        ))}
        </BtnWrapper>
      </Content>
      <Footer>
        <ConfirmBtnWrapper>
          <ConfirmBtn onClick={handleConfirmClick}>선택완료</ConfirmBtn>
        </ConfirmBtnWrapper>
      </Footer>
      {isModalOpen && (
        <BasicModal
          state={modalState}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onButtonClick={handleModalButtonClick}
        />
      )}
    </Div>
  )
}

export default SelectPlayerView