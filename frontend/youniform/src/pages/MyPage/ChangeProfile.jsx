import React, { useState, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import * as Font from "@/typography";
import PencilSvg from "@assets/MyPage/pencil.svg?react";
import { TextField } from "@mui/material";
import useUserStore from "@stores/userStore";
import Loading from "@components/Share/Loading";
import { styled as muiStyled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { getApiClient } from "@stores/apiClient";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  ${Font.Medium}
  /* margin: 30px 0; */
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
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 20px; */
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 10;
  border-radius: 50%;
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
const ColorBtn = muiStyled(Button)(({ theme, ismodified }) => ({
  backgroundColor: ismodified ? theme.primary : theme.secondary,
  fontSize: "16px",
  fontFamily: "Pretendard",
  borderRadius: "10px",
  cursor: ismodified ? "pointer" : "not-allowed",
  opacity: ismodified ? 1 : 0.5,
  pointerEvents: ismodified ? "auto" : "none",
}));

const ChangeProfile = () => {
  const [image, setImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(true);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const { user, fetchUser, clearUser, loading, error } = useUserStore();
  const theme = useTheme();
  const navigate = useNavigate();
  const logFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };
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
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsModified(true); // Assuming any change means the profile is modified
    setIsNicknameChecked(false); // Reset nickname check status on change
  };
  // 닉네임 중복 확인 처리
  const handleNicknameCheck = async () => {
    console.log("Checking nickname...");
    const apiClient = getApiClient();
    console.log("API Client:", apiClient);
    try {
      const res = await apiClient.get(`/users/verify`, {
        params: {
          nickname: nickname,
        },
      });
      console.log(res.data.header.message);
      if (res.data.header.message === "사용 가능한 닉네임입니다.") {
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error("Nickname check failed", error);
    }
  };
  const createFormData = async () => {
    const formData = new FormData();
    const dto = {
      nickname: nickname ? nickname : user.nickname,
      introduce: introduce ? introduce : user.introduce,
    };
    console.log(dto);
    const newBlob = new Blob();
    if (selectedFile) {
      console.log(selectedFile);
      formData.append("file", selectedFile, selectedFile.name);
    } else {
      formData.append("file", newBlob);
    }
    const dtoBlob = new Blob([JSON.stringify(dto)], {
      type: "application/json",
    });

    formData.append("dto", dtoBlob);
    logFormData(formData);
    return formData;
  };
  const changeProfile = async (formData) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
      navigate("/my-page");
      // return res.data.body.diaryId;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const handleClickBtn = async () => {
    if (!isModified || !isNicknameChecked) {
      console.log("Cannot submit, either no changes or nickname not checked");
      return;
    }
    console.log("Submitting changes...");
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
    }
  }, [user]);

  useEffect(() => {
    setIsModified(
      nickname !== (user?.nickname || "") ||
        introduce !== (user?.introduce || "")
    );
  }, [nickname, introduce, user]);

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
          />
          <PencilSvg />
        </ImageBtn>
      </ProfileImage>
      <InputForm>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            id="outlined-required"
            label="닉네임"
            defaultValue={user.nickname}
            onChange={handleNicknameChange}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <NicknameBtn
                  disabled={
                    nickname.trim() === "" || nickname === user.nickname
                  }
                  onClick={handleNicknameCheck}
                >
                  중복확인
                </NicknameBtn>
              ),
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            id="outlined-required"
            label="한줄소개"
            defaultValue={user.introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            sx={{ width: "100%" }}
          />
        </div>
        <ColorBtn
          sx={{ width: "100%" }}
          variant="contained"
          theme={theme}
          ismodified={isModified}
          onClick={handleClickBtn}
          disabled={!isModified || !isNicknameChecked}
        >
          수정완료
        </ColorBtn>
      </InputForm>
    </Container>
  );
};

export default ChangeProfile;
