import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  position: relative;
`;

const CheckboxSvg = styled.svg`
  position: absolute;
  top: -130%;
  left: -170%;
  width: 110px;
  pointer-events: none;
`;

const CheckboxContainer = styled.div`
  width: 24px;
  height: 24px;
  top: calc(100px - 12px);
  left: calc(100px - 12px);
  position: relative;
`;

const CheckboxInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border: 2px solid #bfbfc0;
  border-radius: 50%;

  &:focus {
    outline: 0;
  }

  &:checked + label {
    animation: splash-12 0.6s ease forwards;
  }

  &:checked + label + svg path {
    stroke-dashoffset: 0;
  }
`;

const CheckboxLabel = styled.label`
  width: 24px;
  height: 24px;
  background: none;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
  pointer-events: none;
`;

const CheckmarkSvg = styled.svg`
  position: absolute;
  top: 5px;
  left: 4px;
  z-index: 1;
  pointer-events: none;
`;

const CheckmarkPath = styled.path`
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 19;
  stroke-dashoffset: 19;
  transition: stroke-dashoffset 0.3s ease;
  transition-delay: 0.2s;
`;

const FilterSvg = styled.svg`
  display: none;
`;

const CheckboxWithAnimation = () => {
  return (
    <CheckboxWrapper>
      <CheckboxSvg viewBox="0 0 15 14" fill="none">
        <path d="M2 8.36364L6.23077 12L13 2"></path>
      </CheckboxSvg>
      <CheckboxContainer>
        <CheckboxInput type="checkbox" id="cbx-12" defaultChecked />
        <CheckboxLabel htmlFor="cbx-12"></CheckboxLabel>
        <CheckmarkSvg viewBox="0 0 15 14">
          <CheckmarkPath d="M2 8.36364L6.23077 12L13 2"></CheckmarkPath>
        </CheckmarkSvg>
      </CheckboxContainer>
      <FilterSvg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo-12">
            <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic"></feGaussianBlur>
            <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur"></feColorMatrix>
            <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
          </filter>
        </defs>
      </FilterSvg>
    </CheckboxWrapper>
  );
};

export default CheckboxWithAnimation;
