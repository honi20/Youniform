import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

import useAlertStore from "@stores/alertStore";
import useFriendStore from "@/stores/friendStore";
import EmptyState from "@components/Share/EmptyState";
import AlertItem from "@components/Alert/AlertItem";
import BasicModal from "@components/Modal/BasicModal";
import EmptyIcon from "@assets/EmptyState/EmptyState_Alert.svg?react";

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const AlertBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
  margin-top: 10%;
  gap: 20px;
`;

const TitleText = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const AlertView = () => {
  const navigate = useNavigate();
  const { alerts, fetchAlerts, deleteAlert, markAlertAsRead } = useAlertStore();
  const { acceptFriendRequest } = useFriendStore();

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const openCheckModal = () => setIsCheckModalOpen(true);
  const closeCheckModal = async (targetAlert) => {
    setIsCheckModalOpen(false);
    if (!targetAlert) return;
    // 친구 신청 읽음 처리만 진행
    if (targetAlert.isRead === false)
    await markAlertAsRead(targetAlert.alertId);
  };
  const openAcceptModal = () => setIsAcceptModalOpen(true);
  const closeAcceptModal = async () => {
    setIsAcceptModalOpen(false);
    await fetchAlerts();
  };
  const openDeclineModal = () => setIsDeclineModalOpen(true);
  const closeDeclineModal = async () => {
    setIsDeclineModalOpen(false);
    await fetchAlerts();
  };
  
  const now = dayjs();
  const isRelativeTime = (createdAt) => {
    return createdAt.includes("전");
  };
  // 24시간 이내의 알림과 이전 알림 분류
  const recentAlerts = alerts.filter((alert) => {
    if (isRelativeTime(alert.createdAt)) {
      // 상대 시간 ("1시간 전" 등)은 모두 24시간 이내로 간주
      return true;
    } else {
      // 절대 시간 ("yyyy-mm-dd" 형식)은 현재 시간과 비교
      return now.diff(dayjs(alert.createdAt), "hour") < 24;
    }
  });

  const olderAlerts = alerts.filter((alert) => {
    if (!isRelativeTime(alert.createdAt)) {
      // 절대 시간 ("yyyy-mm-dd" 형식)만 24시간 이전으로 간주
      return now.diff(dayjs(alert.createdAt), "hour") >= 24;
    }
    return false; // 상대 시간은 이전 알림으로 간주하지 않음
  });

const checkAlert = async (alert) => {
  setSelectedAlert(alert); // 선택된 알림 저장
  if (alert.isRead === false) {
    await markAlertAsRead(alert.alertId);
  }
  switch (alert.type) {
    case 'FRIEND_REQUEST':
      openCheckModal();
      break;
    case 'POST_COMMENT':
      navigate(`/post/${alert.pk}`);
      break;
  }
};

  const handleAfterCheck = async (alert, index) => {
    if (index === 7 && alert.type === 'FRIEND_REQUEST') {
      const res = await acceptFriendRequest(alert.senderUuid);
      if (res === "$SUCCESS") {
        openAcceptModal();
      }
    } else if (index === 6 && alert.type === 'FRIEND_REQUEST') {
      const res = await deleteAlert(alert.alertId);
      if (res === "$SUCCESS") {
        openDeclineModal();
      }
    }
  };

  return (
    <AlertContainer>
      {alerts && alerts.length > 0 ? (
        <AlertBox>
          <TitleText>최근 받은 알림</TitleText>
          {recentAlerts.length > 0 && (
            <>
              {recentAlerts.map((alert) => (
                <AlertItem key={alert.alertId} alert={alert} checkAlert={checkAlert} />
              ))}
            </>
          )}
          {olderAlerts.length > 0 && (
            <>
              <TitleText>이전 알림</TitleText>
              {olderAlerts.map((alert) => (
                <AlertItem key={alert.alertId} alert={alert} checkAlert={checkAlert} />
              ))}
            </>
          )}
        </AlertBox>
      ) : (
        <EmptyState
          icon={EmptyIcon}
          state="noAlerts"
        />
      )}
      <BasicModal
        state={"CheckFriendRequest"}
        isOpen={isCheckModalOpen}
        onClose={closeCheckModal}
        onButtonClick={(index) => handleAfterCheck(selectedAlert, index)}
        selectedAlert={selectedAlert}
      />
      <BasicModal
        state={"AcceptFriendRequest"}
        isOpen={isAcceptModalOpen}
        onClose={closeAcceptModal}
      />
      <BasicModal
        state={"DeclineFriendRequest"}
        isOpen={isDeclineModalOpen}
        onClose={closeDeclineModal}
      />
    </AlertContainer>
  );
};

export default AlertView;
