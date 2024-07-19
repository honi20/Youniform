// 최애선수 서비스 메인홈 
import React from 'react';
import styled from 'styled-components';
import PlayerComp from '../components/Player/PlayerComp'

const Div = styled.div`
    display: flex;
    justify-content: center, 
    align-items: center,
`
const MainView = () => {
  return (
    <Div>
        <PlayerComp />
    </Div>
  )
}

export default MainView
