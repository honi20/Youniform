// 최애선수 서비스 메인홈 
import React from 'react';
import styled from 'styled-components';
import PlayerComp from '../components/Player/PlayerComp'

const Div = styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    margin-top: 50px;
`
const MainView = () => {
  return (
    <Div>
      <PlayerComp />
    </Div>

  )
}

export default MainView
