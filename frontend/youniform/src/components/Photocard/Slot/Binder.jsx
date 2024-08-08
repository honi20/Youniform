import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import coverimg from '/src/assets/photocard/cover2.png';
import usePhotoCardStore from '@stores/photoCardStore';
import ArrowPrev from '@mui/icons-material/KeyboardArrowLeft';
import ArrowNext from '@mui/icons-material/KeyboardArrowRight';
import CheckIcon from '@mui/icons-material/Check';
import ColorBtn from '@components/Common/ColorBtn';

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
    content: '';
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
  top: 6px;  /* 원하는 위치로 조정 */
  left: 6px;  /* 원하는 위치로 조정 */
  width: 30px;
  height: 30px;
  background-color: #ffffff; /* 약간의 투명도 */
  border-radius: 50%;
  border: 2px solid #b4b4b4;
  z-index: 20; /* img 위에 오도록 설정 */
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
  cursor: pointer;

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
  const [animate, setAnimate] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const { photocards, page, nextPage, prevPage, setSelectedImage } = usePhotoCardStore();

  const images = import.meta.glob('/src/assets/photocard/cards/*.png', { eager: true });
  const imageArray = Object.values(images).map((module) => module.default);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handlePhotoFrameClick = (image) => {
    setSelectedImage(image);
    navigate('/photo-card/detail');
  };

  const handleSelectCard = () => {
    // 선택 로직을 여기에 추가합니다.
  };

  const toggleSelectMode = () => {
    setIsSelectMode((prevMode) => !prevMode);
  };

  const renderPhotoFrames = () => {
    const startIndex = page * 4;
    return imageArray.slice(startIndex, startIndex + 4).map((image, index) => (
      <PhotoFrame key={index} onClick={() => handlePhotoFrameClick(image)}>
        {isSelectMode && (
          <SelectButton onClick={(e) => { 
            e.stopPropagation(); 
            handleSelectCard(); 
          }}>
            <CheckIcon style={{ display: "flex", width: "80%", height: "100%", color: "#b4b4b4", margin: "0 auto"}}/>
          </SelectButton>
        )}
        {image && <img src={image} alt={`Photo ${startIndex + index + 1}`} />}
      </PhotoFrame>
    ));
  };

  const createCard = () => {
    navigate(`/photo-card/create`);
  };

  const deleteCard = () => {
    // 삭제 로직을 여기에 추가합니다.
  };

  return (
    <BinderContainer>
      <CoverImage src={coverimg} className={animate ? 'animate' : ''} />
      <Paper>
        <Holes>
          {[...Array(6)].map((_, i) => (
            <Hole key={i} />
          ))}
        </Holes>
        <PhotoSlot>
          <PhotoGroup>
            {renderPhotoFrames()}
          </PhotoGroup>
          <ButtonGroup>
            <ColorBtn
              variant="contained"
              style={{ minWidth: '10px', width: '14px', borderRadius: '20px' }}
              onClick={prevPage}
              disabled={page === 0}
            >
              <ArrowPrev />
            </ColorBtn>
            <MiddleGroup>
              <ColorBtn variant="contained" style={{ borderRadius: '20px' }}
               onClick={createCard}>
                생성
              </ColorBtn>
              <ColorBtn variant="contained" style={{ borderRadius: '20px' }}
               onClick={toggleSelectMode}>
                선택
              </ColorBtn>
              <ColorBtn variant="contained" style={{ borderRadius: '20px' }}
               onClick={deleteCard}>
                삭제
              </ColorBtn>
            </MiddleGroup>
            <ColorBtn
              variant="contained"
              style={{ minWidth: '10px', width: '14px', borderRadius: '20px' }}
              onClick={nextPage}
              disabled={page >= Math.ceil(imageArray.length / 4) - 1}
            >
              <ArrowNext />
            </ColorBtn>
          </ButtonGroup>
        </PhotoSlot>
      </Paper>
    </BinderContainer>
  );
};

export default Binder;
