import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicModal from "../Modal/BasicModal";
import Loading from "@components/Share/Loading";
import styled from "styled-components";
const Container = styled.div`
  /* border: 1px solid black; */
  height: calc(100vh - 120px);
  width: 100%;
  max-width: 400px;
`;
const AuthError = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [state, setState] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAfterClick = (index) => {
    if (index === 0) {
      closeModal();
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const key = new URL(window.location.href).searchParams.get(
          "providerType"
        );
        console.log(key);
        switch (key) {
          case "kakao":
            setState("AuthKakaoError");
            break;
          case "naver":
            setState("AuthNaverError");
            break;
          case "google":
            setState("AuthGoogleError");
            break;
          case "local":
            setState("AuthLocalError");
            break;
        }
      } catch (err) {
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchData(); // 함수 호출
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }
  console.log(state);
  return (
    <Container>
      {state && (
        <BasicModal
          state={state}
          onButtonClick={handleAfterClick}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </Container>
  );
};

export default AuthError;
