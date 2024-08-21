import styled from "styled-components";
import coverimg from "@assets/photocard/cover.png";
import ArrowRight from "./ArrowRight";
import useUserStore from "@stores/userStore";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const BinderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 64vh;
  width: 88%;
  background-color: #f5f5f5;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  object-fit: cover; /* 이미지 비율 유지 && 컨테이너에 맞게 사이즈 조절 */
`;

const BinderCover = () => {
  const { user, photoCardUrl } = useUserStore();
  const navigate = useNavigate();
  const [cover, setCover] = useState(null);

  useEffect(() => {
    // console.log(photoCardUrl);
    setCover(photoCardUrl);
  }, [photoCardUrl]);

  const goToBinder = () => {
    navigate('/photo-card/binder', { state: { from: 'BinderCover', coverSrc: cover } });
  };

  return (
    <BinderContainer>
        <CoverImage src={cover} />
        <ArrowRight cover={cover}/>
    </BinderContainer>
  );
};

export default BinderCover;
