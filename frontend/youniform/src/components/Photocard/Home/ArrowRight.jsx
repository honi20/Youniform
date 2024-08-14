import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const sdbAnimation = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  40% {
    box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.4);
    opacity: 1;
  }
  80% {
    opacity: 1; /* 버튼이 최대 크기로 보이는 상태 */
  }
  100% {
    opacity: 0;
  }
`;

const A = styled.a`
  padding-left: 60px;
  position: absolute;
  display: inline-block;
  right: 1%;
`;

const Span = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  width: 46px;
  height: 46px;
  margin-top: -23px;
  border: 1px solid #fff;
  background-color: #d1c8c8;
  border-radius: 100%;
  box-sizing: border-box;
  animation: ${sdbAnimation} 3.5s infinite ease-in-out;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -12px;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
    transform: rotate(45deg);
    box-sizing: border-box;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    content: '';
    width: 44px;
    height: 44px;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
    border-radius: 100%;
    opacity: 0;
    box-sizing: border-box;
  }
`;

const ArrowRight = () => {
  const navigate = useNavigate();
  
  const showBinder = () => {
    navigate(`/photo-card/binder`, { state: { from: 'photo-card' } });
  };

  return (
    <A onClick={showBinder}>
      <Span />
    </A>
  );
};

export default ArrowRight;
