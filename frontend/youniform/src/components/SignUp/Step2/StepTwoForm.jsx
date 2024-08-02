import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileImg from '../../../assets/login/user.svg?react';

import { styled as muiStyled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CheckIcon from '@mui/icons-material/Check';
import useSignUpStore from '../../../stores/signUpStore';

const ProfileImgWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); /* Slightly dark overlay */
    border-radius: 50%;
  }
`;

const ProfileImgStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AddIconStyled = styled(AddIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* cursor: pointer; */
`;

const DeleteIconStyled = styled(DeleteIcon)`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(-50%, -50%);
  /* cursor: pointer; */
`;

const IconWrapper = styled.div`
  position: absolute;
  width: 3rem;
  height: 3rem;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: #e9e9e9;
    transform: translate(-50%, -60%);
  }
`;

const VisuallyHiddenInput = muiStyled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UserInfoContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 2rem;
`;
const ProfileImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  position: relative;
`;

const StepTwoForm = () => {
  const { user } = useSignUpStore();
  const { nickname, introduce, isNicknameUnique, setNickname, setIntroduce, setIsNicknameUnique } = user;

  const [profileImage, setProfileImage] = useState(ProfileImg);

  const confirmUnique = () => {
    setIsNicknameUnique(true);
  };

  const handleNicknameChange = (event) => {
    setIsNicknameUnique(false);
    setNickname(event.target.value);
  };

  const handleIntroduceChange = (event) => {
    setIntroduce(event.target.value);
  };

  const handleAddIconClick = () => {
    document.getElementById('upload-input').click();
  };

  const handleDeleteIconClick = () => {
    setProfileImage(ProfileImg);
  };

  const handleFileChange = (event) => {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <ProfileImgContainer>
        <ProfileImgWrapper>
          <ProfileImg />
        </ProfileImgWrapper>
        <IconWrapper style={{ left: '42%' }} onClick={handleAddIconClick}>
          <AddIconStyled />
        </IconWrapper>
        <IconWrapper style={{ left: '58%' }} onClick={handleDeleteIconClick}>
          <DeleteIconStyled />
        </IconWrapper>
        <VisuallyHiddenInput 
          type="file" 
          id="upload-input" 
          onChange={handleFileChange} 
        />
      </ProfileImgContainer>
      <UserInfoContainer>
        <TextField
          sx={{ width: "100%", marginBottom: "1rem" }}
          label="닉네임 입력"
          value={nickname}
          onChange={handleNicknameChange}
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                onClick={confirmUnique}
                sx={{ height: "30px", width: "34%" }}
              >
                {isNicknameUnique ? <CheckIcon /> : '중복확인'}
              </Button>
            ),
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          label="한줄소개 입력"
          value={introduce}
          onChange={handleIntroduceChange}
        />
      </UserInfoContainer>
    </>
  );
};

export default StepTwoForm;
