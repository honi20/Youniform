import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import coverimg from "@assets/photocard/cover.png";
import usePhotoCardStore from "@stores/photoCardStore";
import BasicModal from "../../Modal/BasicModal";
import ArrowPrev from "@mui/icons-material/KeyboardArrowLeft";
import ArrowNext from "@mui/icons-material/KeyboardArrowRight";
import CheckIcon from "@mui/icons-material/Check";
import ColorBtn from "@components/Common/ColorBtn";
import EmptyState from "@components/Share/EmptyState";
import EmptyIcon from "@assets/EmptyState/EmptyState_Photocard.svg?react";

const rotateAnimation = keyframes`
  from {
    transform: rotateY(0);
    opacity: 1;
  }
  to {
    transform: rotateY(-180deg);
    opacity: 0;
  }
`;

const CoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: left center;
  z-index: 10;
  transition-duration: 1s;
  transition-timing-function: ease-in;
  border-radius: 25px;
  &.animate {
    animation: ${rotateAnimation} 2s forwards;
  }
`;

const BinderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 88%;
  height: 64vh;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
`;

const Paper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 3px 4px 6px 0px rgba(0, 0, 0, 0.25);
`;

const Holes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 25% 0;
`;

const Hole = styled.div`
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border-radius: 50%;
  transform: translateX(-50%);
`;

const PhotoSlot = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 30px);
  height: 100%;
  margin-left: auto;
`;

const PhotoGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  width: 90%;
  height: 84%;
  margin-top: 10%;
  margin-left: 3%;
  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
  }

  &:before {
    top: 50%;
    left: 0;
    right: 0;
    height: 0px;
    border-top: 1px dashed rgba(0, 0, 0, 0.25);
    transform: translateY(-50%);
  }

  &:after {
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    border-left: 1px dashed rgba(0, 0, 0, 0.25);
    transform: translateX(-50%);
  }
`;

const SelectButton = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 30px;
  height: 30px;
  background-color: ${(props) =>
    props.selected ? "#00006e" : "#ffffff"}; /* 남색 or 흰색 */
  border-radius: 50%;
  border: 2px solid ${(props) => (props.selected ? "#969696" : "#b4b4b4")};
  z-index: 20;
  cursor: pointer;
`;

const PhotoFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: calc(100% * 17 / 11); /* 11:17 비율 유지 */
  background-color: #b3b3b3;
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  cursor: ${(props) => (props.$isSelectMode ? "default" : "pointer")};

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 16%;
  gap: 0.5rem;
  margin-left: 3%;
  align-items: center;
`;

const MiddleGroup = styled.div`
  display: flex;
  gap: inherit;
`;

const Binder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [animate, setAnimate] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const {
    photoCards,
    page,
    setPage,
    nextPage,
    prevPage,
    setSelectedImage,
    deletePhotocards,
    fetchPhotoCardList,
    totalPages,
    setTotalPages,
  } = usePhotoCardStore();

  const closeWarningModal = () => setIsWarningModalOpen(false);

  const images = import.meta.glob("/src/assets/photocard/cards/*.png", {
    eager: true,
  });
  const imageArray = Object.values(images).map((module) => module.default);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state?.from === "BinderCover") {
        setAnimate(true);
      }

      const savedPage = localStorage.getItem("currentPage");
      if (savedPage) {
        setPage(parseInt(savedPage, 10));
      } else {
        setPage(0); // 기본 페이지로 설정 (첫 페이지)
      }

      await fetchPhotoCardList(); // 포토카드 리스트 가져오기
      setTotalPages(); // 총 페이지 수 설정

      console.log(photoCards);
    };

    fetchData();
  }, [location.state?.from]);

  useEffect(() => {
    // 페이지 정보가 수정 시 localStorage에 저장
    localStorage.setItem("currentPage", page);
  }, [page]);

  const handlePhotoFrameClick = (imageUrl, photocardId) => {
    if (!isSelectMode) {
      setSelectedImage(imageUrl);
      navigate(`/photo-card/detail/${photocardId}`);
    } else {
      console.log(`imageUrl: ${imageUrl}`);
      console.log(`photocardId: ${photocardId}`);
      console.log(`selectedCards: ${selectedCards}`);
      handleSelectCard(photocardId);
    }
  };

  const handleSelectCard = (photocardId) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(photocardId)) {
        return prevSelectedCards.filter((id) => id !== photocardId);
      } else {
        return [...prevSelectedCards, photocardId];
      }
    });
  };

  const toggleSelectMode = () => {
    setIsSelectMode((prevMode) => !prevMode);
  };

  const renderPhotoFrames = () => {
    if (!photoCards || !Array.isArray(photoCards)) {
      return null; // 데이터가 없을 때
    }

    const startIndex = page * 4;
    return photoCards
      .slice(startIndex, startIndex + 4)
      .map((photocard, index) => {
        const photocardId = photocard.photocardId;
        const isSelected = selectedCards.includes(photocardId);

        return (
          <PhotoFrame
            key={index}
            $isSelectMode={isSelectMode}
            onClick={() => handlePhotoFrameClick(photocard.imgUrl, photocardId)}
          >
            {isSelectMode && (
              <SelectButton
                selected={isSelected}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCard(photocardId);
                }}
              >
                <CheckIcon
                  style={{ color: isSelected ? "#e3e3e3" : "#b4b4b4" }}
                />
              </SelectButton>
            )}
            {photocard.imgUrl && (
              <img src={photocard.imgUrl} alt={`Photo ${photocardId}`} />
            )}
          </PhotoFrame>
        );
      });
  };

  const createCard = () => {
    navigate(`/photo-card/create`);
  };

  const deleteCard = async () => {
    console.log(selectedCards);
    if (selectedCards.length == 0) {
      setIsWarningModalOpen(true);
    } else {
      const listStr = selectedCards.join();
      await deletePhotocards(listStr);
      await fetchPhotoCardList();
    }
  };

  return (
    <>
      <BinderContainer>
        <CoverImage src={coverimg} className={animate ? "" : "animate"} />
        <Paper>
          <Holes>
            {[...Array(6)].map((_, i) => (
              <Hole key={i} />
            ))}
          </Holes>
          <PhotoSlot>
            {!photoCards || !Array.isArray(photoCards) ? (
              <PhotoGroup>{renderPhotoFrames()}</PhotoGroup>
            ) : (
              <EmptyState icon={EmptyIcon} state="noPhotocards" />
            )}
            <ButtonGroup>
              <ColorBtn
                variant="contained"
                style={{
                  minWidth: "10px",
                  width: "14px",
                  borderRadius: "20px",
                }}
                onClick={prevPage}
                disabled={page === 0}
              >
                <ArrowPrev />
              </ColorBtn>
              <MiddleGroup>
                <ColorBtn
                  variant="contained"
                  style={{ borderRadius: "20px" }}
                  onClick={createCard}
                >
                  만들기
                </ColorBtn>
                {(!photoCards || !Array.isArray(photoCards)) && (
                  <ColorBtn
                    variant="contained"
                    style={{ borderRadius: "20px" }}
                    onClick={toggleSelectMode}
                  >
                    선택
                  </ColorBtn>
                )}
                {isSelectMode && (
                  <ColorBtn
                    variant="contained"
                    style={{ borderRadius: "20px" }}
                    onClick={deleteCard}
                  >
                    삭제
                  </ColorBtn>
                )}
              </MiddleGroup>
              <ColorBtn
                variant="contained"
                style={{
                  minWidth: "10px",
                  width: "14px",
                  borderRadius: "20px",
                }}
                onClick={nextPage}
                disabled={page >= totalPages - 1}
              >
                <ArrowNext />
              </ColorBtn>
            </ButtonGroup>
          </PhotoSlot>
        </Paper>
      </BinderContainer>
      <BasicModal
        state={"PhotoCardSelectWarning"}
        isOpen={isWarningModalOpen}
        onClose={closeWarningModal}
      />
    </>
  );
};

export default Binder;
