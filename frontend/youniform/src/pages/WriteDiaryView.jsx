import React, { useState } from 'react'
import styled from 'styled-components';
import { Canvas, DecorationContainer, DecorationPanel, ToggleBtn, DecorationBtn, DecorationMenu, DecorationBtnContainer } from '../components/Diary/WriteCompStyle';

const Div = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: column; /* 수직 정렬 */
    align-items: center;
    padding: 1rem 0.25rem;
    margin-top: 4vh;
`
const WriteDiaryView = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(0);

    const handleBtnClick = (index) => {
        setSelectedBtn(index);
        console.log(index);
    }
    return (
        <Div>
            <Canvas />
            <DecorationContainer>
                <ToggleBtn onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Hide' : 'Show'}
                </ToggleBtn>
                <DecorationPanel $expanded={isExpanded}>
                    <DecorationBtnContainer $expanded={isExpanded}>
                    {[ '배경', '스티커', '폰트', '테마', '사진' ].map((text, index) => (
                        <DecorationBtn
                            key={index}
                            $selected={selectedBtn === index} // 현재 선택된 버튼인지 여부를 prop으로 전달
                            onClick={() => handleBtnClick(index)}
                        >
                            {text}
                        </DecorationBtn>
                    ))}
                    </DecorationBtnContainer>
                </DecorationPanel>
                <DecorationMenu $expanded={isExpanded} />
            </DecorationContainer>
            
        </Div>
      )
}

export default WriteDiaryView
