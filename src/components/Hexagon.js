import React from 'react';
import styled from 'styled-components';

const StyledHexagon = styled.div`
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  width: 250px;
  height: 250px;
  margin: 12.5px 0;
  position: absolute;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
  }

  &:nth-child(1) {
    top: -150px;
    right: -200px;
  }

  &:nth-child(2) {
    top: -150px;
    right: 40px;
  }

  &:nth-child(3) {
    top: 52.5px;
    right: -80px;
  }

  &:nth-child(4) {
    top: 52.5px;
    right: 160px;
  }
`;

const Hexagon = ({ img }) => (
  <StyledHexagon>
    <img src={img} alt="hexagon background" />
  </StyledHexagon>
);

export default Hexagon;
