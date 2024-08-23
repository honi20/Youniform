import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicModal from "@components/Modal/BasicModal"
import useUserStore from "@stores/userStore";

const DeleteAccountView = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { clearUser, deleteAccount } = useUserStore();
  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  
  const handleAfterClick = async (index) => {
    if (index === 0) {
      // 회원 탈퇴
      await deleteAccount();
      await clearUser();
      navigate("/");
      // 다음 모달 오픈
      openConfirmModal();
    } else {
      navigate(`/setting`);
    }
  };

  return (
    <>
      <BasicModal
      state={"DeleteAccountWarning"}
      onButtonClick={handleAfterClick}
      isOpen={isModalOpen}
      onClose={closeModal}
      />
      <BasicModal
      state={"DeleteAccount"}
      isOpen={isConfirmModalOpen}
      onClose={closeConfirmModal}
      />
    </>
  )
}

export default DeleteAccountView