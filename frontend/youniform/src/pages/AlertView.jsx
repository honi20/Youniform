import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import styled from "styled-components";
import ReadIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

import useAlertStore from "@stores/alertStore";
import useFriendStore from "@/stores/friendStore";

import EmptyState from "@components/Share/EmptyState";
import AlertItem from "@components/Alert/AlertItem";
import BasicModal from "@components/Modal/BasicModal";
import OptionIcon from '@assets/Icons/Options.svg?react';
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
`;

const MoreOptions = styled.div`
  display: flex;
  width: 18%;
  height: 85%;
  margin-left: 8px;
  justify-content: right;
  cursor: pointer;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  width: 120px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-size: 14px;
  color: #4e4e4e;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const AlertView = () => {
  const navigate = useNavigate();
  const { alerts, fetchAlerts, deleteAlert, markAlertAsRead } = useAlertStore();
  const { acceptFriendRequest, rejectFriend } = useFriendStore();

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  
  const [openDropdownAlertId, setOpenDropdownAlertId] = useState(null);
  
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const openCheckModal = () => setIsCheckModalOpen(true);
  const closeCheckModal = async (targetAlert) => {
    setIsCheckModalOpen(false);
    if (!targetAlert) return;
    if (targetAlert.isRead === false) {
      await markAlertAsRead(targetAlert.alertId);
      await fetchAlerts();
    }
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

  const recentAlerts = alerts.filter((alert) => {
    if (isRelativeTime(alert.createdAt)) {
      return true;
    } else {
      return now.diff(dayjs(alert.createdAt), "hour") < 24;
    }
  });

  const olderAlerts = alerts.filter((alert) => {
    if (!isRelativeTime(alert.createdAt)) {
      return now.diff(dayjs(alert.createdAt), "hour") >= 24;
    }
    return false;
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
    if (alert.type === 'FRIEND_REQUEST') {
      if (index === 7) {
        const res = await acceptFriendRequest(alert.senderUuid);
        if (res === "$SUCCESS") {
          await deleteAlert(alert.alertId);
          openAcceptModal();
        }
      } else if (index === 6) {
        const res = await rejectFriend(alert.senderUuid);
        if (res === "$SUCCESS") {
          openDeclineModal();
        }
      }
    }
  };

  const toggleDropdown = (alertId) => {
    setOpenDropdownAlertId(prevId => prevId === alertId ? null : alertId);
  };

  const updateAlertStatus = async (type) => {
    switch (type) {
      case "realAll":
        await markAlertAsRead(alert.alertId);
        break;
      case "deleteAll":
        await deleteAlert(alert.alertId);
        break;
    }
    await fetchAlerts();
  };

  return (
    <AlertContainer>
      {alerts && alerts.length > 0 ? (
        <AlertBox>
          <TitleText>
            <span>최근 받은 알림</span>
            <MoreOptions onClick={toggleDropdown}>
              <OptionIcon />
              <DropdownMenu>
                <DropdownItem
                  onClick={() => updateAlertStatus("realAll")}>
                  모두 읽기
                  <ReadIcon />
                </DropdownItem>
                <DropdownItem
                  onClick={() => updateAlertStatus("deleteAll")}>
                  전체 삭제
                  <DeleteIcon />
                </DropdownItem>
              </DropdownMenu>
            </MoreOptions>
          </TitleText>
          {recentAlerts.length > 0 && (
            <>
              {recentAlerts.map((alert) => (
                <AlertItem
                  key={alert.alertId}
                  alert={alert}
                  checkAlert={checkAlert}
                  openDropdownAlertId={openDropdownAlertId}
                  onToggleDropdown={toggleDropdown}
                />
              ))}
            </>
          )}
          {olderAlerts.length > 0 && (
            <>
              <TitleText>이전 알림</TitleText>
              {olderAlerts.map((alert) => (
                <AlertItem
                  key={alert.alertId}
                  alert={alert}
                  checkAlert={checkAlert}
                  openDropdownAlertId={openDropdownAlertId}
                  onToggleDropdown={toggleDropdown}
                />
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
