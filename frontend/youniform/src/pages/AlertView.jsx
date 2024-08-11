import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

import useAlertStore from "@stores/alertStore";
import useFriendStore from "@/stores/friendStore";
import EmptyState from "@components/Alert/EmptyState";
import AlertItem from "@components/Alert/AlertItem.jsx";
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
  const { alerts, fetchAlerts } = useAlertStore();
  const { acceptFriendRequest } = useFriendStore();

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const openCheckModal = () => setIsCheckModalOpen(true);
  const closeCheckModal = () => setIsCheckModalOpen(false);
  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  
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

const checkAlert = (alert) => {
  setSelectedAlert(alert); // 선택된 알림 저장
  switch (alert.type) {
    case 'FRIEND_REQUEST':
      openCheckModal();
      break;
    case 'POST_COMMENT':
      // 필요한 경우 수정
      break;
  }
};

  const handleAfterCheck = async (alert, index) => {
    if (index === 0 && alert.type === 'FRIEND_REQUEST') {
      const res = await acceptFriendRequest(alert.senderUuid);
      if (res === "$SUCCESS") {
        openConfirmModal();
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
        <EmptyState icon={EmptyIcon} />
      )}
      <BasicModal
        state={"CheckFriendRequest"}
        isOpen={isCheckModalOpen}
        onClose={closeCheckModal}
        onButtonClick={(index) => handleAfterCheck(selectedAlert, index)}
      />
      <BasicModal
        state={"ConfirmFriendRequest"}
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
      />
    </AlertContainer>
  );
};

export default AlertView;
