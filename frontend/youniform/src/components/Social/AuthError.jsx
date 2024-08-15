import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasicModal from "../Modal/BasicModal";

const API_URL = import.meta.env.VITE_API_URL;

const AuthError = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(true);
    
    const navigate = useNavigate(); // useNavigate 훅 사용
    
    const state = null;
    const closeModal = () => {
      setIsModalOpen(false);
    }
    
    const handleAfterClick = (index) => {
      if (index === 0) {
        closeModal();
        navigate('/login');
      }
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const key = new URL(window.location.href).searchParams.get('providerType');
          switch (key) {
              case "kakao":
                state = "AuthKakaoError"
              break;
              case "naver":
                state = "AuthNaverError"
              break;
              case "google":
                state = "AuthGoogleError"
              break;
              case "local":
                state = "AuthLocalError"
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
        return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
    } else {
        return 
        <BasicModal
          state={state}
          onButtonClick ={handleAfterClick}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
    }
};

export default AuthError;
