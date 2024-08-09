import React from 'react';
import styled from 'styled-components';
import ExampleDiary from '../../assets/CardExample.png';
import XIcon from '../../assets/x.svg?react';

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

const BtnContainer = styled.div`
    /* border-radius: 8px; */
    max-width: 500px;
    width: 100%;
    /* margin-bottom: 1%; */
    display: flex;
    justify-content: end;
    padding: 0 7%;
    /* border: 1px solid black; */
`


const CloseButton = styled.button`
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    border-radius: 2.5rem;
    border: 0.1px solid #33363F;
    background-color: #33363F;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageContainer = styled.img`
    height: 60%;
    margin-bottom: 10%;
    padding: 3% 5%;
`
const ModalComp = ({ isOpen, onClose }) => {
if (!isOpen) return null;
  return (
    <ModalBackdrop>
        <BtnContainer>
        <CloseButton onClick={onClose}>
            <XIcon/>
        </CloseButton>
        </BtnContainer>
        <ImageContainer
            src={ExampleDiary}
        />
    </ModalBackdrop>
  )
}

export default ModalComp
