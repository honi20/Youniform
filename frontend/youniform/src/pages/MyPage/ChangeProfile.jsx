import { useState, useEffect, useRef, useCallback } from "react";
import styled, { useTheme } from "styled-components";
import * as Font from "@/typography";
import PencilSvg from "@assets/MyPage/pencil.svg?react";
import { TextField, Button as MuiButton } from "@mui/material";
import Loading from "@components/Share/Loading";
import { getApiClient } from "@stores/apiClient";
import { useNavigate } from "react-router-dom";
import useUserStore from "@stores/userStore";
import StatusMessageForm from "@components/SignUp/StatusMessageForm";
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/PriorityHigh';
import { styled as muiStyled } from "@mui/material/styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  ${Font.Medium}
  display: flex;
`;

const ProfileImage = styled.div`
  box-sizing: border-box;
  height: 110px;
  width: 110px;
  margin: 40px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  & img {
    border: 1px solid #dadada;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
    text-align: center;
    object-position: center;
  }
`;

const ImageBtn = styled.label`
  color: white;
  background-color: ${(props) => props.theme.primary};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 10;
`;

const HiddenInput = styled.input`
  display: none;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0 10%;
  margin: 20px;
`;

const NicknameBtn = styled.button`
  ${Font.XSmall}
  font-weight: 300;
  background-color: ${(props) =>
    props.disabled ? "#d3d3d3" : props.theme.primary};
  border: none;
  color: ${(props) => (props.disabled ? "#a9a9a9" : "white")};
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 70px;
  padding: 5px 3px;
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.disabled ? "#d3d3d3" : props.theme.secondary};
  }
`;

const ColorBtn = muiStyled(MuiButton)(({ theme, ismodified }) => ({
  backgroundColor: ismodified ? theme.primary : theme.secondary,
  color: "white",
  fontSize: "16px",
  fontFamily: "Pretendard",
  borderRadius: "10px",
  cursor: ismodified === "true" ? "pointer" : "not-allowed",
  pointerEvents: ismodified === "true" ? "auto" : "none",
}));

const ChangeProfile = () => {
  const [image, setImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [isNicknameUnique, setIsNicknameUnique] = useState(true);
  const [statusMsg, setStatusMsg] = useState(null);
  const [introduceStatusMsg, setIntroduceStatusMsg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { user, fetchUser, clearUser, loading, verifyNickname } = useUserStore();
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setIsModified(true);
    }
  };

  const validateNickname = (nickname) => /^[가-힣a-z0-9]{1,10}$/.test(nickname);

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    setIsModified(newNickname !== user?.nickname);
    setStatusMsg(null);
  };

  const handleIntroduceChange = (event) => {
    const value = event.target.value;
    if (value.length <= 20) {
      setIntroduce(value);
      setIntroduceStatusMsg('');
      setIsModified(value !== user?.introduce);
    } else {
      setIntroduceStatusMsg('한 줄 소개는 20자 이내로 작성해주세요.');
    }
  };

  const memoizedVerifyNickname = useCallback(verifyNickname, []);

  useEffect(() => {
    const checkNickname = async () => {
      if (validateNickname(nickname)) {
        if (nickname === user?.nickname) {
          setIsNicknameUnique(true);
          setStatusMsg(null);
        } else {
          const result = await memoizedVerifyNickname(nickname);
          if (result === "$OK") {
            setIsNicknameUnique(true);
            setStatusMsg(null);
          } else {
            setIsNicknameUnique(false);
            setStatusMsg('이미 사용 중인 닉네임입니다.');
          }
        }
      } else {
        setIsNicknameUnique(false);
        setStatusMsg('유효하지 않은 닉네임입니다. 10자 이내의 한글, 소문자 영어, 숫자만 사용 가능합니다.');
      }
    };

    const typingTimeout = setTimeout(checkNickname, 1000);
    return () => clearTimeout(typingTimeout);
  }, [nickname, memoizedVerifyNickname, user?.nickname]);

  const createFormData = async () => {
    const formData = new FormData();
    const dto = {
      nickname: nickname,
      introduce: introduce || user.introduce,
    };
    formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    if (selectedFile) {
      formData.append("file", selectedFile, selectedFile.name);
    }
    return formData;
  };

  const changeProfile = async (formData) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post("/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data.header.message);
      navigate("/my-page");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const handleClickBtn = async () => {
    if (!isModified || !isNicknameUnique) {
      console.log("Cannot submit, either no changes or invalid nickname");
      return;
    }
    try {
      const formData = await createFormData();
      await changeProfile(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUser();
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchData();
    return () => clearUser();
  }, [fetchUser, clearUser]);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || "");
      setIntroduce(user.introduce || "");
      setImage(user.profileUrl || null);
      setIsNicknameUnique(true);  // 페이지 로드 시 true로 설정
    }
  }, [user]);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container>
      <Title>프로필 수정</Title>
      <ProfileImage>
        <img src={image || user.profileUrl} alt="profile" />
        <ImageBtn>
          <HiddenInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <PencilSvg />
        </ImageBtn>
      </ProfileImage>
      <InputForm>
        <TextField
          sx={{ width: "100%" }}
          label="닉네임 입력"
          value={nickname}
          onChange={handleNicknameChange}
          InputProps={{
            endAdornment: (
              <MuiButton
                variant="contained"
                sx={{ height: "30px", width: "34%", backgroundColor: isNicknameUnique ? 'navy' : 'red' }}
              >
                {isNicknameUnique ? <CheckIcon /> : <WarningIcon />}
              </MuiButton>
            ),
          }}
        />
        {statusMsg && <StatusMessageForm statusMsg={statusMsg} />}
        <TextField
          sx={{ width: "100%", marginTop: "0.8rem" }}
          label="한 줄 소개 입력"
          value={introduce}
          onChange={handleIntroduceChange}
          error={Boolean(introduceStatusMsg)}
          helperText={introduceStatusMsg}
        />
      </InputForm>
      <ColorBtn ismodified={isModified.toString()} onClick={handleClickBtn}
      style={{ backgroundColor: "navy", width: "80%" }}>
        완료
      </ColorBtn>
    </Container>
  );
};

export default ChangeProfile;