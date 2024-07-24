import React from 'react';
import styled from 'styled-components';
import ExpandDownIcon from '../../assets/Expand_down.svg?react';

const DecorationContainer = styled.div`
    width: 95%;
    height: 30%;
    position: absolute; 
    box-sizing: border-box;
    bottom: 50px;
    /* bottom: ${props => (props.$expanded ? '0' : '50px')}; */
    /* padding: 5px; */
    left: 50%;
    transform: translateX(-50%);

    z-index: 1; /* Canvas 위에 위치하도록 설정 */
`
const DecorationPanel = styled.div`
    display: ${props => (props.$expanded ? 'block' : 'none')};
    width: 100%;
    /* margin-top: 1rem; */

    display: flex;
    /* flex-direction: column; */
    /* justify-content: ${props => (props.$expanded ? 'flex-start' : 'flex-end')}; Align items to top or bottom */
    /* transition: flex-direction 0.3s ease-in-out; */
`

const ToggleBtn = styled.button`
    width: 2rem;
    height: 2rem;

    position: absolute;
    border-radius: 0.625rem;
    border: 2px solid #000;
    background: #ACC0E2;
    
    z-index: 3;
    cursor: pointer;
    right: 1%;
    /* bottom: 50px; */
    bottom: ${props => props.$bottom};
`
const StyledExpandDownIcon = styled(ExpandDownIcon)`
    width: 1rem;
    height: 1rem;
    fill: black;
`
const DecorationBtnContainer = styled.div`
    display: ${props => (props.$expanded ? 'block' : 'none')};
    width: 100%;
`
const DecorationBtn = styled.button`
    /* border: 1px solid black; */
    width: 16%;
    height: 2.5rem;
    flex-shrink: 0;
    box-sizing: border-box;
    
    // style
    /* border: none; */
    border-radius: 0.625rem 0.625rem 0rem 0rem;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    border-left: 2px solid #000;
    border-bottom: ${props => (props.$selected ? 'none':'2px solid #000')};
    background: ${props => (props.$selected ? '#ECF3F8':'#ACC0E2')};

    // typo
    color: #000;
    font-family: 'DungGeunMo';
    font-size: clamp(0.5rem, 2vh + 0.1rem, 1.0rem);
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.0625rem;
    position: relative;
    z-index: 2;
`
const DecorationMenu = styled.div`
    width: 100%;
    height: 80%;
    flex-shrink: 0;
    box-sizing: border-box;
    border-radius: 0rem 1.25rem 1.25rem 1.25rem;
    border: 2px solid #000;
    background: #ECF3F8;
    position: relative;
    top: -3px; /* 테두리 제거와 위치 맞추기 위한 조정 */
    display: ${props => (props.$expanded ? 'block' : 'none')}; /* visibility 토글 */
`

export { DecorationContainer, DecorationPanel, ToggleBtn, DecorationBtn, DecorationMenu, StyledExpandDownIcon, DecorationBtnContainer }