import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import usePhotoCardStore from "@stores/photoCardStore";
import DetailControlButton from "./DetailControlButton";
import BasicModal from "@components/Modal/BasicModal";
import DeleteIcon from "@assets/photocard/Svg/Delete.svg?react";
import SaveIcon from "@assets/photocard/Svg/Save.svg?react";
import NextIcon from "@assets/photocard/Svg/Next.svg?react";
import PrevIcon from "@assets/photocard/Svg/Prev.svg?react";

const PhotoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  background-color: #f5f5f5;
`;

const PhotoCardControls = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin-top: 7%;
  padding: 0 5%;
`;

const PhotoDetailImage = styled.img`
  width: 80%;
  height: auto;
  border-radius: 10px;
`;

const PhotoCardDetail = () => {
  const navigate = useNavigate();
  const { photocardId } = useParams();
  const { photoCard, photoCards, fetchPhotoCardList, deletePhotocards, fetchPhotocardDetail, setTotalPages } = usePhotoCardStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchPhotocardDetail(photocardId);
      await fetchPhotoCardList();
    };
    fetchData();
  }, [photocardId, fetchPhotocardDetail, fetchPhotoCardList]);
  
  useEffect(() => {
    if (photoCards.length > 0) {
      const index = photoCards.findIndex((card) => {
        return card.photocardId - 0 === photocardId - 0;
      });
      setCurrentIndex(index);
    }
  }, [photocardId, photoCards]);

  const openWarningModal = () => setIsWarningModalOpen(true);
  const closeWarningModal = () => setIsWarningModalOpen(false);
  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const handleAfterDelete = async (index) => {
    if (index == 3) {
      // 1. 포토카드 삭제
      await deletePhotocards(photocardId);
      await fetchPhotoCardList();
      await setTotalPages();
      navigate(`/photo-card/binder`);
      // 2. 다음 Modal Open
      openConfirmModal();
    }
  };

  const savePhotocard = () => {
    if (photoCard && photoCard.imgUrl) {
      const link = document.createElement("a");
      link.href = photoCard.imgUrl;
      link.download = "photocard.png"; // 원하는 파일명으로 설정
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const goToPrevious = () => {
    console.log(`curIndex = ${currentIndex}`);
    if (currentIndex > 0) {
      const previousId = photoCards[currentIndex - 1].photocardId;
      console.log(`previousId = ${previousId}`);
      navigate(`/photo-card/detail/${previousId}`);
    }
  };

  const goToNext = () => {
    if (currentIndex < photoCards.length - 1) {
      const nextId = photoCards[currentIndex + 1].photocardId;
      navigate(`/photo-card/detail/${nextId}`);
    }
  };

  return (
    <PhotoDetailContainer>
      {photoCard && photoCard.imgUrl ? (
        <PhotoDetailImage src={photoCard.imgUrl} alt="Selected" />
      ) : (
        <p>Loading...</p>
      )}
      <PhotoCardControls>
        <button onClick={goToPrevious} disabled={currentIndex === 0} style={{border: "none"}}>
          <PrevIcon />
        </button>
        <DetailControlButton
          icon={DeleteIcon}
          label="삭제"
          onClick={openWarningModal}
        />
        <DetailControlButton
          icon={SaveIcon}
          label="저장"
          onClick={savePhotocard}
        />
        <button onClick={goToNext} disabled={currentIndex === photoCards.length - 1} style={{border: "none"}}>
          <NextIcon />
        </button>
      </PhotoCardControls>
      <BasicModal
        state={"PhotoCardDeleteWarning"}
        isOpen={isWarningModalOpen}
        onClose={closeWarningModal}
        onButtonClick={handleAfterDelete}
      />
      <BasicModal
        state={"PhotoCardDeleted"}
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
      />
    </PhotoDetailContainer>
  );
};

export default PhotoCardDetail;
