import React from 'react'
import styled from 'styled-components';
import ExpandedLeftIcon from '../assets/Expand_left_light.svg?react'
import SaveIcon from '../assets/Save_fill.svg?react';
import { Icon } from '@mui/material';

const Container = styled.div`
    background-color: #F8F8F8;
    position: absolute;
    /* top: 50px; */
    width: 100%;
    height: 40px;
    display: flex;
    // border: 1px solid orange;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    /* z-index: 1; */
`

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 92%;
    margin: 0 auto;
    gap: 5px;
    justify-content: space-between;
`

const RouterBar = () => {
  return (
    <Container>
      <IconContainer>
        <ExpandedLeftIcon/>
        <SaveIcon/>
      </IconContainer>
    </Container>
  )
}

export default RouterBar
