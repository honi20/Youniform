import React, { useState } from 'react';
import usePhotoCardStore from '@stores/photoCardStore';
import styled from 'styled-components';
import DetailControlButton from './DetailControlButton';
import DeleteModal from '@components/Modal/PhotoCardDeleteModal';

import DeleteIcon from '@assets/photocard/Icon/Delete.svg?react';
import SaveIcon from '@assets/photocard/Icon/Save.svg?react';
import NextIcon from '@assets/photocard/Icon/Next.svg?react';
import PrevIcon from '@assets/photocard/Icon/Prev.svg?react';

const PhotoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  background-color: #f5f5f5;
`;

const PhotoCardDisplay = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid orange;
`

const PhotoCardControls = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin-top: 7%;
  padding: 0 5%;
`

const PhotoDetailImage = styled.img`
  width: 80%;
  height: auto;
  /* border: 2px solid #ccc; */
  border-radius: 10px;
`;

const PhotoCardDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { selectedImage } = usePhotoCardStore();

  return (
    <PhotoDetailContainer>
        <PhotoDetailImage src={selectedImage} alt="Selected" />
        <PhotoCardControls>
          <PrevIcon />
          <DetailControlButton icon={DeleteIcon} label="삭제" onClick={openModal} />
          <DetailControlButton icon={SaveIcon} label="저장" />
          <NextIcon />
        </PhotoCardControls>
        <DeleteModal
          state={"ChatImgSaved"}
          isOpen={isModalOpen}
          onClose={closeModal}
          nickname={""}
        />
    </PhotoDetailContainer>
  );
};

export default PhotoCardDetail;
