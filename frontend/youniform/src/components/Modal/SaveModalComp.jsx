import React from 'react'
import styled from 'styled-components';
import SaveIcon from '../../assets/CheckIcon.svg?react';

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
    /* border: 1px solid black; */
`

const Container = styled.div`
    border-radius: 1.25rem;;
    width: 80%;
    height: 25%;
    background-color: white;
    display: flex;
    justify-content: space-around;
    padding: 5%;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid black; */
`
const SaveText = styled.div`
    color: #000;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    /* border: 1px solid black; */
`

const ConfirmBtnItem = styled.div`
    border-radius: 0.625rem;
    background: #262F66;
    width: 8.1875rem;
    height: 2.875rem;
    flex-shrink: 0;
    color: white;
    font-family: 'Pretendard';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
`
const renderIcon = () => {
    return <SaveIcon/>
}
const SaveModalComp = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;
    const handleSave = () => {
        onClose();
        onSave();
    };
    return (
        <ModalBackdrop>
            <Container>
                {renderIcon()}
                <SaveText>다이어리가 저장되었습니다.</SaveText>
                
                <ConfirmBtnItem onClick={handleSave}>
                    {/* 메인 다이어리로 이동 */}
                    확인
                </ConfirmBtnItem>
            </Container>
        </ModalBackdrop>
    )
}

export default SaveModalComp
