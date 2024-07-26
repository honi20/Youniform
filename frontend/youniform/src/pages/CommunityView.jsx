import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import BasicModal from '../components/Modal/BasicModal';

const Div = styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 50px;
`

const CommunityView = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
    
  return (
    <Div>
      {/* <button onClick={()=> navigate('/diary/write-diary')}>write diary</button> */}
      {/* <button onClick={()=> navigate('/diary/detail')}>diary detail</button> */}
      <button onClick={openModal}>
        test
      </button>
      <BasicModal 
        state={'ChatImgSaved'} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        nickname={''}
      />
    </Div>
  )
}

export default CommunityView
