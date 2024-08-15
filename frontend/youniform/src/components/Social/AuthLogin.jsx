import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AuthLogin = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        const fetchData = async () => {
            try {
                const key = new URL(window.location.href).searchParams.get('key');
                const response = await axios.get(`${API_URL}/users/signup/info/${key}`);
                setData(response.data); // 데이터를 상태로 저장
                navigate('/social/sign-up', { state: { data: response.data } }); // 데이터를 전달하며 페이지 이동
            } catch (err) {
                
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchData(); // 함수 호출
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
    }
};

export default AuthLogin;
