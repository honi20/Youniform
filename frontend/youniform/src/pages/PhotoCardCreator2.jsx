// src/components/PhotoCardCreator.js
import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const PhotoCardCreator = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Outlet />
      <h1>이미지를 선택하세요.</h1>
      <input 
        type="file" 
        accept="image/*" 
        capture="environment"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div>
          <h2>이미지:</h2>
          <img src={selectedImage} alt="Selected" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default PhotoCardCreator;
