import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AuthLoginExsist = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = new URL(window.location.href).searchParams.get('key');
                localStorage.setItem("accessToken", token);
                navigate('/main'); // 데이터를 전달하며 페이지 이동
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

export default AuthLoginExsist;
