import styled from "styled-components";
import coverimg from "@assets/photocard/cover.png";
import ArrowRight from "./ArrowRight";

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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* 이미지 비율 유지 && 컨테이너에 맞게 사이즈 조절 */
`;

const BinderCover = () => {
  return (
    <BinderContainer>
        <CoverImage src={coverimg} />
        <ArrowRight />
    </BinderContainer>
  );
};

export default BinderCover;
