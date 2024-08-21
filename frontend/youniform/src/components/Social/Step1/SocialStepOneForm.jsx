import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useSignUpStore from '@stores/signUpStore';
import ProfileImg from '@assets/login/user_png.png';
import StatusMessageForm from '../StatusMessageForm';

import { styled as muiStyled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/PriorityHigh';
import NextStepButton from '../Step1/NextStepButton';

const InputForm = styled.div`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 18px;
`;

const ProfileImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

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
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
`;

const ProfileImgStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StepIndicatorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => (props.$step !== 4 ? "15%" : "3%")};
`;

const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#262F66" : "#e0e0e0")};
  color: ${(props) => (props.$active ? "#fff" : "#9e9e9e")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: background-color 0.4s ease-in-out;
`;

const StepBar = styled.div`
  width: 23px;
  height: 1px;
  background-image: linear-gradient(to right, ${"#a1a1a1"} 50%, transparent 50%);
  background-size: 8px 2px;
  background-repeat: repeat-x;
  margin: 0 8px;
`;

const SignUpText = styled.div`
  font-size: 1.7rem;
  font-weight: 800;
  color: #262F66;
  text-align: center;
  margin-top: 2.2rem;
  letter-spacing: -1px;
`;

const SubTitle = styled.span`
  color: #262F66;
  font-size: 14px;
  margin-bottom: 2rem;
`;

const AddIconStyled = styled(AddIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DeleteIconStyled = styled(DeleteIcon)`
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(-50%, -50%);
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

const validateNickname = (nickname) => {
  const regex = /^[가-힣a-z0-9]{1,10}$/;
  return regex.test(nickname);
};

const SocialStepOneForm = () => {
  const { user, verifyNickname } = useSignUpStore();
  const { nickname, introduce, isNicknameUnique,
    setNickname, setIntroduce, setIsNicknameUnique,
    setProfileUrl } = user;
  const location = useLocation();
  const { data } = location.state || {};
  const [profileImage, setProfileImage] = useState(ProfileImg);
  const [statusMsg, setStatusMsg] = useState(null);
  const [introduceStatusMsg, setIntroduceStatusMsg] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const step = 1;

  useEffect(() => {
    if (data && data.body) {
      if (data.body.nickname) {
        setNickname(data.body.nickname); // 닉네임 초기값 설정
      }
      if (data.body.profileUrl) {
        // console.log(data.body.profileUrl);
        setProfileUrl(data.body.profileUrl); // 프로필 이미지 초기값 설정
      }
    }
  }, [data]);

  useEffect(() => {
    // console.log("바뀐 프로필", profileImage);
  }, [profileImage]);

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
    const length = [...value].length;
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
      const validExtensions = ['image/jpeg', 'image/png', 'image/gif']; // 허용할 이미지 확장자
      if (validExtensions.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('JPEG, PNG, GIF 형식의 이미지 파일만 업로드 가능합니다.');
      }
    }
  };

  return (
    <InputForm>
      <StepIndicatorBox $step={step}>
        {[1, 2, 3].map((num, index) => (
          <React.Fragment key={index}>
            <StepCircle $active={num === step}>{num}</StepCircle>
            {num < 3 && <StepBar $active={num < step} />}
          </React.Fragment>
        ))}
      </StepIndicatorBox>
      <SignUpText>회원가입</SignUpText>
      <SubTitle>기본 정보를 입력해주세요.</SubTitle>
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
      <NextStepButton
        step="1"
        email={data.body.email}
        providerType={data.body.providerType}
      />
    </InputForm>
  );
}

export default SocialStepOneForm;