import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useSignUpStore from '@stores/signUpStore';
import ProfileImg from '@assets/login/user.svg?react';
import StatusMessageForm from '../StatusMessageForm';

import { styled as muiStyled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/PriorityHigh';

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
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const ProfileImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  position: relative;
`;

const validateNickname = (nickname) => {
  const regex = /^[가-힣a-z0-9]{1,10}$/; // 정규식: 한글 or 소문자 or 숫자 && 1~10자
  return regex.test(nickname);
};

const StepTwoForm = () => {
  const { user, verifyNickname } = useSignUpStore();
  const { nickname, introduce, isNicknameUnique,
    setNickname, setIntroduce, setIsNicknameUnique, } = user;

  const [profileImage, setProfileImage] = useState(ProfileImg);
  const [statusMsg, setStatusMsg] = useState(null);
  const [introduceStatusMsg, setIntroduceStatusMsg] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    if (nickname.length > 0) {
      if (validateNickname(nickname)) {
        const timeout = setTimeout(async () => {
          const result = await verifyNickname();
          if (result === "$OK") {
            setIsNicknameUnique(true);
            setStatusMsg(null);
          } else {
            setIsNicknameUnique(false);
            setStatusMsg('이미 사용 중인 닉네임입니다.');
          }
        }, 1000);
        setTypingTimeout(timeout);
      } else {
        setIsNicknameUnique(false);
        setStatusMsg('유효하지 않은 닉네임입니다. 10자 이내의 한글, 소문자 영어, 숫자만 사용 가능합니다.')
      }
      setNicknameChecked(true);
    }
    return () => clearTimeout(typingTimeout);
  }, [nickname]);

  const handleNicknameChange = (event) => {
    setIsNicknameUnique(false);
    setNickname(event.target.value);
  };

  const handleIntroduceChange = (event) => {
    const value = event.target.value;
    const length = [...value].length; // 한글도 한 자로 계산
    if (length <= 20) {
      setIntroduce(value);
      setIntroduceStatusMsg('');
    } else {
      setIntroduceStatusMsg('한 줄 소개는 20자 이내로 작성해주세요.');
    }
  };

  const handleAddIconClick = () => {
    document.getElementById('upload-input').click();
  };

  const handleDeleteIconClick = () => {
    setProfileImage(ProfileImg);
  };

  const handleFileChange = (event) => {
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
          sx={{ width: "100%" }}
          label="닉네임 입력"
          value={nickname}
          onChange={handleNicknameChange}
          InputProps={{
            endAdornment: (
              <>
                {nicknameChecked &&
                  <Button
                    variant="contained"
                    sx={{ height: "30px", width: "34%", backgroundColor: isNicknameUnique ? 'navy' : 'red' }}
                  >
                    {isNicknameUnique ? <CheckIcon /> : <WarningIcon />}
                    
                  </Button>
                }
              </>
            ),
          }}
        />
        {statusMsg &&
          <StatusMessageForm statusMsg={statusMsg} />
        }
        <TextField
          sx={{ width: "100%", marginTop: "0.8rem" }}
          label="한줄소개 입력"
          value={introduce}
          onChange={handleIntroduceChange}
        />
        {introduceStatusMsg &&
          <StatusMessageForm statusMsg={introduceStatusMsg} />
        }
      </UserInfoContainer>
    </>
  );
};

export default StepTwoForm;
