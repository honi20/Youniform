import styled from 'styled-components';
import OptionIcon from "@assets/Icons/Options.svg?react";

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #ebebeb;
  border-radius: 10px;
  color: #4e4e4e;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`;

const AlertHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const IconWrapper = styled.div`
  position: relative;
  margin-right: 12px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
`;

const AlertContent = styled.div`
  font-size: 13px;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;

const TitleText = styled.span`
  font-weight: bold;
  font-size: 15px;
  color: #262626;
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  background-color: #a0a0a0;
  margin: 0 5px;
  border-radius: 50%;
`;

const TimeText = styled.span`
  font-size: 14px;
  color: #a0a0a0;
`;

const ContentText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: #d0d0d0;
`;

const MoreOptions = styled.div`
  display: flex;
  width: 18%;
  height: 85%;
  margin-left: 8px;
  justify-content: center;
  cursor: pointer;
`;

const UpdateStatusCircle = styled.div`
  position: absolute;
  top: 0px;
  left: -3px;
  width: 6px;
  height: 6px;
  background-color: #ff355a;
  border-radius: 50%;
  /* display: ${props => props.$updateStatus ? 'block' : 'none'}; */
`;

const ColorBtn = styled.button`
  width: 90%;
  background-color: #000048;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 12px;
  font-weight: 600;
`
const PostContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;
const VerticalBar = styled.div`
  height: 16px;
  width: 3px;
  background-color: #9e9e9e;
  margin-right: 5px;
`;

const AlertItem = ({ alert, checkAlert }) => {
  let alertMessage = "";

  switch (alert.type) {
    case 'ANNOUNCEMENT':
      alertMessage = "실시간 방송 알림 (Comment 수정)";
      break;
    case 'FRIEND_REQUEST':
      alertMessage = `<strong>${alert.senderNickname}</strong>님이 친구 요청을 보냈습니다.`;
      break;
    case 'POST_COMMENT':
      alertMessage = "회원님의 게시글에 댓글을 남겼습니다.";
      break;
    case 'PLAYER_APPEARANCE':
      alertMessage = "This is an error alert.";
      break;
    default:
      alertMessage = "This is a default alert.";
      break;
  }

  const getButtonText = (alert) => {
    switch (alert.type) {
      case 'FRIEND_REQUEST':
        return '확인';
      case 'POST_COMMENT':
        return '이동';
    }
  };

  return (
    <AlertContainer>
      <AlertHeader>
        <ContentWrapper>
          <TitleRow>
            <IconWrapper>
              <img src={alert.senderProfileUrl} alt="icon" />
              {alert.isRead === false &&
                <UpdateStatusCircle />
              }
            </IconWrapper>
            <TitleText>{alert.senderNickname}</TitleText>
            <Dot />
            <TimeText>{alert.createdAt}</TimeText>
          </TitleRow>
        </ContentWrapper>
        <MoreOptions>
          {((alert.type === 'FRIEND_REQUEST') || alert.type === 'POST_COMMENT') &&
            <ColorBtn onClick={() => checkAlert(alert)}>
              {getButtonText(alert)}
            </ColorBtn>
          }
          {/* <OptionIcon /> */}
        </MoreOptions>
      </AlertHeader>
      <AlertContent
        dangerouslySetInnerHTML={{ __html: alertMessage }}
      />
      {alert.type === 'POST_COMMENT' &&
        <PostContent>
          <VerticalBar/>
          <AlertContent>{alert.content}</AlertContent>
        </PostContent>
      }
    </AlertContainer>
  );
};

export default AlertItem;
