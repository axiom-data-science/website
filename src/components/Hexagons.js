import React from 'react';
import styled from 'styled-components';
import Hexagon from './Hexagon';

const StyledHexagons = styled.div`
  width: 100%;
  height: 315px;
  overflow: hidden;
  position: absolute;
`;

const Hexagons = () => (
  <StyledHexagons>
    <Hexagon img="/assets/hexagon-1.png" />
    <Hexagon img="/assets/hexagon-2.png" />
    <Hexagon img="/assets/hexagon-3.png" />
    <Hexagon img="/assets/hexagon-4.png" />
  </StyledHexagons>
);

export default Hexagons;
