import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FirstImgBox = styled.div`
    width: 100%;
    position: relative;
`;

const ImgBox = styled.div`
    width: 100%;
`;

const LandingImg = styled.img`
    width: 100%;
    height: auto;
    display: block;
`;

const Button = styled.button`
    position: absolute;
    height: 3rem;
    width: 50%;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
    background: #262f66;
    border-radius: 30px;
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
`;

const LandingView = () => {
    const navigate = useNavigate();
    const loadToLogin = () => {
        navigate(`/login`);
    }
    return (
        <ImgContainer>
            <FirstImgBox>
                <LandingImg src="https://dsfjel9nvktdp.cloudfront.net/asset/landing1.png"></LandingImg>
                <Button onClick={loadToLogin}>시작하기</Button>
            </FirstImgBox>
            <ImgBox>
                <LandingImg src="https://dsfjel9nvktdp.cloudfront.net/asset/landing2.png"></LandingImg>
            </ImgBox>
            <ImgBox>
                <LandingImg src="https://dsfjel9nvktdp.cloudfront.net/asset/landing3.png"></LandingImg>
            </ImgBox>
            <ImgBox>
                <LandingImg src="https://dsfjel9nvktdp.cloudfront.net/asset/landing4.png"></LandingImg>
            </ImgBox>
        </ImgContainer>
    )
}

export default LandingView;