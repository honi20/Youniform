import React from "react";
import styled from "styled-components";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import AlarmIcon from "../../assets/AlarmIcon.svg?react";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  /* border: 1px solid black; */
`;
const Container = styled.div`
  border-radius: 1.25rem;
  width: 80%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 5%;
  flex-direction: column;
  align-items: center;
`;
const IconContainer = styled.div``;
const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: "Pretendard";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 1rem;
  word-wrap: break-word;
  word-break: keep-all;
  /* border: 1px solid black; */
`;
const Subtitle = styled.div`
  margin-top: 0.5rem;
  color: #9c9c9c;
  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const BtnContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 90%;
  justify-content: space-around;
  /* border: 1px solid black; */
`;
const Btn = styled.div`
  width: 7rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background-color: ${(props) => props.$bgcolor || "black"};
  color: ${(props) => props.$color || "black"};

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard";
  font-size: 1rem;
  /* font-style: normal; */
  font-weight: 700;
  line-height: normal;
`;
const stateMap = {
  UserNotFound: {
    icon: <AlarmIcon />,
    title: "해당 유저가 존재하지 않습니다.",
    subtitle: "회원가입 시 등록한 성명과 생년월일을 입력해주세요.",
    btn: [0],
  },
  PasswordReset: {
    icon: <CheckIcon />,
    title: "비밀번호가 재설정되었습니다.",
    btn: [0],
  },
  VerificaionSent: {
    icon: <AlarmIcon />,
    title: "인증 메일이 발송되었습니다.",
    subtitle: "입력된 메일로 발송된 인증번호를 입력하세요.",
    btn: [0],
  },
  NicknameAvailable: {
    icon: <AlarmIcon />,
    title: (nickname) => <div>{nickname}는 사용 가능한 닉네임입니다.</div>,
    btn: [0],
  },
  NicknameUnavailable: {
    icon: <AlarmIcon />,
    title: (nickname) => <div>{nickname}는 사용 불가능한 닉네임입니다.</div>,
    btn: [0],
  },
  FavoriteChanged: {
    icon: <AlarmIcon />,
    title: "좋아하는 선수를 변경하시겠습니까?",
    subtitle: "선수 변경 시 관련 소식을 받을 수 없습니다.",
    btn: [1, 2],
  },
  PlayerChangeWarning: {
    icon: <AlarmIcon />,
    title: "변경 사항이 없습니다. 저장하시겠습니까?",
    btn: [1, 2],
  },
  DiaryDeleted: {
    icon: <AlarmIcon />,
    title: "다이어리를 삭제하시겠습니까?",
    subtitle: "삭제된 다이어리는 다시 볼 수 없습니다.",
    btn: [1, 3],
  },
  DiaryReset: {
    icon: <AlarmIcon />,
    title: "작성 중인 다이어리를 초기화 하시겠습니까?",
    subtitle: "작성 중인 내용은 저장되지 않고 삭제됩니다.",
    btn: [1, 4],
  },
  DiarySaved: {
    icon: <CheckIcon />,
    title: "다이어리가 저장되었습니다.",
    btn: [0],
  },
  ChatImgSaved: {
    icon: <CheckIcon />,
    title: "사진이 저장되었습니다.",
    btn: [0],
  },
  PhotoCardDeleteWarning: {
    icon: <AlarmIcon />,
    title: "포토카드를 삭제하시겠습니까?",
    subtitle: "삭제된 포토카드는 복구 불가능합니다.",
    btn: [1, 3],
  },
  PhotoCardDeleted: {
    icon: <CheckIcon />,
    title: "포토카드가 삭제되었습니다.",
    btn: [0],
  },
  PhotocardSaveWarning: {
    icon: <AlarmIcon />,
    title: "포토카드를 생성하시겠습니까?",
    btn: [1, 5],
  },
  PhotoCardSaved: {
    icon: <CheckIcon />,
    title: "포토카드가 생성되었습니다.",
    btn: [0],
  },
};
// btn 종류
// 0: 확인 1: 취소(색깔 다름) 2: 변경 3: 삭제 4: 초기화
const buttonMap = {
  0: { bgcolor: "#262F66", color: "white", label: "확인" },
  1: { bgcolor: "#C5C8DA", color: "black", label: "취소" },
  2: { bgcolor: "#262F66", color: "white", label: "변경" },
  3: { bgcolor: "#262F66", color: "white", label: "삭제" },
  4: { bgcolor: "#262F66", color: "white", label: "초기화" },
  5: { bgcolor: "#262F66", color: "white", label: "생성" },
};

const BasicModal = ({ state, isOpen, onClose, onButtonClick, nickname }) => {
  if (!isOpen) return null;

  // const nickname = nickname;
  const renderIcon = (state) => {
    const icon = stateMap[state]?.icon || <AlarmIcon />;
    return icon;
  };
  const renderTitle = (state, nickname) => {
    const title =
      typeof stateMap[state]?.title === "function"
        ? stateMap[state].title(nickname)
        : stateMap[state].title || <></>;
    return title;
  };
  const renderSubtitle = (state) => {
    const subtitle = stateMap[state]?.subtitle || <></>;
    return subtitle;
  };
  const handleBtnClick = (btnType) => {
    console.log(btnType);
    // onButtonClick 함수 연결
    if (onButtonClick) {
      onButtonClick();
    }
    // modal 창 닫음
    onClose();
  };
  const renderBtn = (state) => {
    const btnArray = stateMap[state]?.btn || [];
    return btnArray.map((btnType, index) => {
      const { bgcolor, color, label } = buttonMap[btnType];
      return (
        <Btn
          key={index}
          $bgcolor={bgcolor}
          $color={color}
          onClick={() => handleBtnClick(btnType)}
        >
          {label}
        </Btn>
      );
    });
  };
  return (
    <ModalBackdrop>
      <Container>
        <IconContainer>{renderIcon(state)}</IconContainer>
        <Title>{renderTitle(state, nickname)}</Title>
        <Subtitle>{renderSubtitle(state)}</Subtitle>
        <BtnContainer>{renderBtn(state)}</BtnContainer>
      </Container>
    </ModalBackdrop>
  );
};

export default BasicModal;
