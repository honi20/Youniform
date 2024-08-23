import React from 'react'
import styled from 'styled-components';

const BtnBox = styled.div`
  width: 100%;
  max-width: 400px;
  height: 8vh;
  border-radius: 20px;
  background-color: #262f66;
  color: white;
  text-align: center;      /* 수평 중앙 정렬 */
  line-height: 8vh;        /* 높이와 동일하게 설정하여 수직 중앙 정렬 */
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 120px;
  z-index: 1;
`;


const SaveChangesButton = ({ type }) => {

  return (
    <BtnBox>
      {type}
    </BtnBox>
  )
}

export default SaveChangesButton;
