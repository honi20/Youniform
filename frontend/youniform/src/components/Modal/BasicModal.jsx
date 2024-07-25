import React from 'react'
import styled from 'styled-components'
import CheckIcon from '../../assets/CheckIcon.svg?react';
import AlarmIcon from '../../assets/AlarmIcon.svg?react';

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 5;
    border: 1px solid black;
`
const Container = styled.div`
    border-radius: 1.25rem;;
    width: 80%;
    background-color: white;
    display: flex;
    justify-content: space-around;
    padding: 5%;
    flex-direction: column;
    align-items: center;
`
const Title = styled.div`
    color: #000;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: 1px solid black;
`
const IconContainer = styled.div`
    height: 5rem;
`
const BasicModal = ({ state, isOpen, onClose }) => {
    if (!isOpen) return null;
    
    const stateMap = {
        'PasswordReset': {
            icon: <CheckIcon/>,
            title: 'test',
        },
        'DiarySaved': <CheckIcon/>,
        'ChatImgSaved': <CheckIcon/>,
    }
    const renderIcon = (state) => {
        const selectedState = stateMap[state]?.icon || { icon: <AlarmIcon/> }
        return selectedState.icon
    }
    const renderTitle = (state) => {
        const selectedState = stateMap[state]?.title || { title: <></> }
        return selectedState.title
    }
    return (
        <ModalBackdrop>
            <Container>
                <IconContainer>
                    {renderIcon(state)}
                </IconContainer>
                <Title>
                    {renderTitle(state)}
                </Title>
                {/* <Title/>
                <SubTitle/>
                <BtnContainer/> */}
            </Container>
        </ModalBackdrop>
  )
}

export default BasicModal
