import React, { useRef } from "react";
import ImgSvg from "@assets/Post/img_box.svg?react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
`;

const AddImg = styled(ImgSvg)`
  margin-top: 10px;
  width: 70px;
  height: 70px;
  cursor: pointer; /* 클릭 가능하게 변경 */
`;

const ImageComp = ({ onImageSelect }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click(); // AddImg를 클릭하면 파일 입력 창이 열리도록 설정
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = event.target.result;
        onImageSelect(imageUrl); // 부모 컴포넌트로 이미지 URL을 전달
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <AddImg onClick={handleImageClick} />
      사진을 추가해보세요!
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*" // 이미지 파일만 선택할 수 있게 제한
      />
    </Container>
  );
};

export default ImageComp;
