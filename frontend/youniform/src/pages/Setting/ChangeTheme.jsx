import React, { useState } from 'react';
import styled from 'styled-components';

import Bears from "@assets/Team/Bears.png";
import Dinos from "@assets/Team/Dinos.png";
import Eagles from "@assets/Team/Eagles.png";
import Giants from "@assets/Team/Giants.png";
import Heroes from "@assets/Team/Heroes.png";
import Lions from "@assets/Team/Lions.png";
import Monsters from "@assets/Team/Monsters.png";
import Landers from "@assets/Team/Landers.png";
import Tigers from "@assets/Team/Tigers.png";
import Twins from "@assets/Team/Twins.png";
import Wiz from "@assets/Team/Wiz.png";
import useUserStore from '@stores/userStore';
import { useNavigate } from 'react-router-dom';

const StepThree = styled.div`
  height: calc(120vh);
`;

const EmptyBox = styled.div`
  height: 1.5rem;
`;

const SelectTeamContainer = styled.div``;

const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 1% 5%;
  box-sizing: border-box;
`;

const Title = styled.div`
  width: 100%;
  height: auto;
  color: #273b4a;
  font-family: "Pretendard";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.165px;
`;

const Content = styled.div`
  width: 100%;
  height: auto;
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
  background-color: ${(props) => props.$selected ? props.$color : "white"};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: white;
  flex-direction: column;
  box-shadow: ${(props) =>
    props.$selected ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "0"};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
`;

const TeamIcon = styled.div`
  width: 50%;
  height: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.$icon});
`;

const TeamName = styled.div`
  margin-top: 1%;
  color: ${(props) => (props.$selected ? "white" : props.$color)};
  text-align: center;
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 600;
`;

const TeamButton = ({ team, selected, onClick }) => (
  <BtnItem onClick={onClick}>
    <Btn $selected={selected} $color={team.color}>
      <TeamIcon $icon={team.icon} />
      <TeamName $selected={selected} $color={team.color}>{team.teamName}</TeamName>
    </Btn>
  </BtnItem>
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

const ChangeTheme = () => {
  const { changeTheme } = useUserStore();
  const step = 2;
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();

  const teamList = [
  { teamCode: 1000, teamName: "몬스터즈", color: "#262F66", icon: Monsters },
  { teamCode: 1001, teamName: "타이거즈", color: "#EA0029", icon: Tigers },
  { teamCode: 1002, teamName: "라이온즈", color: "#074CA1", icon: Lions },
  { teamCode: 1003, teamName: "트윈스", color: "#C30452", icon: Twins },
  { teamCode: 1004, teamName: "베어스", color: "#131230", icon: Bears },
  { teamCode: 1005, teamName: "랜더스", color: "#CE0E2D", icon: Landers },
  { teamCode: 1006, teamName: "위즈", color: "#000000", icon: Wiz },
  { teamCode: 1007, teamName: "이글스", color: "#F1592A", icon: Eagles },
  { teamCode: 1008, teamName: "자이언츠", color: "#041E42", icon: Giants },
  { teamCode: 1009, teamName: "다이노스", color: "#315288", icon: Dinos },
  { teamCode: 1010, teamName: "히어로즈", color: "#570514", icon: Heroes },
  ];

  const handleClick = (teamCode) => {
    setSelectedTeam((prevSelectedTeam) =>
      prevSelectedTeam === teamCode ? "none" : teamCode
    );
  };

  const handleConfirmClick = async () => {
    await changeTheme(selectedTeam);
    navigate(`/main`);
  };

  return (
    <StepThree>
      <EmptyBox />
      <SelectTeamContainer>
        <Header>
          <Title>변경하고 싶은</Title>
          <Title>테마를 선택하세요.</Title>
        </Header>
        <Content>
          <BtnWrapper>
            {teamList.map((team) => (
              <TeamButton
              key={team.teamCode}
              team={team}
              selected={selectedTeam === team.teamCode}
              onClick={() => handleClick(team.teamCode)}
              />
            ))}
          </BtnWrapper>
        </Content>
        <Footer>
          <ConfirmBtnWrapper>
            <ConfirmBtn onClick={handleConfirmClick}>선택완료</ConfirmBtn>
          </ConfirmBtnWrapper>
        </Footer>
        </SelectTeamContainer>
    </StepThree>
  );
};

export default ChangeTheme;
