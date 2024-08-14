import React from 'react';
import styled from 'styled-components';
import CompleteIcon from '@assets/Icons/Complete.svg?react';
import NextStepButton from './Step1/NextStepButton';

const StepFinal = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: center;    /* 수평 정렬 (가로 가운데) */
  justify-content: center; /* 수직 정렬 (세로 가운데) */
  height: 100%;
  text-align: center; /* 텍스트 중앙 정렬 */
  gap: 1.5rem;
`;

const Message = styled.p`
  font-size: 24px; /* 폰트 크기 설정 */
  font-weight: 500;
  letter-spacing: 1.5px;
  color: #333; /* 텍스트 색상 설정 (선택적) */
  margin: 0; /* 기본 여백 제거 (선택적) */
`;

const BtnWrap = styled.div`
  display: flex;
  position: relative;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin-top: 2rem; /* 추가: 버튼과 위 요소 간의 간격 */
`;

const SignUpSuccess = () => {
  return (
    <StepFinal>
      <CompleteIcon />
      <Message>회원가입 성공!</Message>
      <BtnWrap>
        <NextStepButton step="4" />
      </BtnWrap>
    </StepFinal>
  );
};

export default SignUpSuccess;
