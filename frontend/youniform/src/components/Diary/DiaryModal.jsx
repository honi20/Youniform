import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import * as Font from '@/typography'
import useResourceStore from '@stores/resoureStore';
import CloseSvg from "@assets/Diary/close.svg?react"
const ModalBackdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: end;
  z-index: 5;
`;
const Container = styled.div`
  display: flex;
  border-radius: 1.25rem 1.25rem 0 0;
  width: 100%;
  height: auto;
  background-color: white;
  z-index: 5;
  flex-direction: column;
  margin-bottom: 70px;
`;
const Header = styled.div`
${Font.Medium}
  border-bottom: 1px solid #F5F5F5;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CloseBtn = styled.div`
  position: absolute;
  right: 15px;
  bottom: 417px;
  transform: translateY(-50%);
`
const StampContainer = styled.div`
${Font.Small};
  height: 150px;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  padding: 10px 0;
  border-bottom: 1px solid #F5F5F5;
`
const StampSetting = styled.div`
  overflow-x: auto;  /* 가로 슬라이더를 위해 추가 */
  display: flex;
  align-items: center;
  flex: 1;
`;
const StampSlider = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  align-items: center;
  border: 1px solid black;
`;
const ScopeContainer = styled.div`
  ${Font.Small};
  display: flex;
  flex-direction: column;
  height: 150px;
  margin: 0 20px;
  padding: 10px 0;
`
const ScopeSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const ScopeButton = styled.button`
  ${Font.Small};
  font-weight: 400;
  background-color: ${(props) => (props.selected ? props.theme.secondary : '#ddd')};
  /* color: white; */
  border: none;
  border-radius: 8px;
  /* margin: 0 10px; */
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.selected ? props.theme.secondary : '#ccc')};
  }
`;
const Description = styled.div`
  ${Font.Small};
  font-weight: 300;
  color: #848484;
  text-align: center;
`
const ScopeDescription = ({scope}) => {
  if (scope === "ALL")
    return <Description>모두에게 다이어리를 공개합니다.</Description>
  else if (scope === "FRIENDS")
    return <Description>나의 친구에게만 이 다이어리를 공개합니다.</Description>
  else 
  return <Description>다이어리를 비공개합니다.</Description>
}
const Footer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`
const CompleteBtn = styled.div`
${Font.Small};
  width: 322px;
  height: 36px;
  border-radius: 25px;
  background: ${(props) => props.theme.primary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Stamp = styled.img`
  height: ${(props) => props.selected ? "60px" : "40px"};
  cursor: pointer;
`
const DiaryModal = ({isOn, setIsOn, setScope, setStampId}) => {

  const { stampList, fetchStampList } = useResourceStore();
  const [selectedStampId, setSelectedStampId] = useState();
  const [selectedScope, setSelectedScope] = useState('ALL');

  useEffect(() => {
    const loadStamp = () => {
      if (stampList.length == 0){
        fetchStampList();
      }
    }
    loadStamp();
  }, [fetchStampList, stampList.length])
  const handleStampClick = (stampId) => {
    setSelectedStampId(stampId);
    
  };
  const handleScopeChange = (scope) => {
    console.log(scope)
    setSelectedScope(scope);
  };
  const handleClickBtn = () => {
    setSelectedStampId(1);
    setSelectedScope("ALL");
    setIsOn(false)
  }
  const handleCompleteBtn = () => {
    // setSelectedStampId(selectedStampId);
    // setSelectedScope(selectedScope);
    setStampId(selectedStampId);
    setScope(selectedScope);
    setIsOn(false)
  }
  
  return (
     isOn && 
    (<ModalBackdrop>
    <Container>
      <Header>다이어리 옵션
        <CloseBtn onClick={handleClickBtn}><CloseSvg/></CloseBtn>
      </Header>
      <StampContainer>
        스탬프 설정
      <StampSetting>
        <StampSlider>
          {stampList &&
              stampList.map((stamp) => (
                <Stamp
                  key={stamp.stampId}
                  src={stamp.imgUrl}
                  selected={stamp.stampId === selectedStampId}
                  onClick={() => handleStampClick(stamp.stampId)}
                />
              ))}
        </StampSlider>
      </StampSetting>
      </StampContainer>
      <ScopeContainer>
        공개 설정
      <ScopeSetting>
            <ScopeButton
              selected={selectedScope === 'ALL'}
              onClick={() => handleScopeChange('ALL')}
            >
              전체 공개
            </ScopeButton>
            <ScopeButton
              selected={selectedScope === "FRIENDS"}
              onClick={() => handleScopeChange('FRIENDS')}
            >
              친구 공개
            </ScopeButton>
            <ScopeButton
              selected={selectedScope === 'PRIVATE'}
              onClick={() => handleScopeChange('PRIVATE')}
            >
              비공개
            </ScopeButton>
          </ScopeSetting>
            <ScopeDescription scope={selectedScope}/>
          </ScopeContainer>
      <Footer >
        <CompleteBtn onClick={handleCompleteBtn}>완료</CompleteBtn></Footer>
    </Container>
    </ModalBackdrop>)
  )
}

export default DiaryModal