import styled from "styled-components";

const ImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
`;

const LandingView = () => {

    return (
        <ImgContainer>
            <ImgBox>
                <LandingImg src="https://dsfjel9nvktdp.cloudfront.net/asset/landing1.png"></LandingImg>
                <Button>시작하기</Button>
            </ImgBox>
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