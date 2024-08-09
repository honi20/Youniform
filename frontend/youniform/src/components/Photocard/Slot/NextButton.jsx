import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const A = styled.a`
  padding-left: 60px;
  position: absolute;
  height: 100%;
  display: inline-block;
  right: -5%;
`;

const Span = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(50%, -100%);
  width: 40px;
  height: 40px;
  border: 1px solid #fff;
  background-color: #d1c8c8;
  border-radius: 100%;
  box-sizing: border-box;

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

const NextButton = () => {

  const navigate = useNavigate();

  const showBinder = () => {
    navigate(`/photo-card/binder`);
  };

  return (
    <A onClick={showBinder}>
      <Span />
    </A>
  );
};

export default NextButton;