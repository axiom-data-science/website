import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContainer = styled.div`
  width: var(--maxWidth);
  z-index: 1;
`;

export default () => (
  <StyledContent>
    <StyledContainer>© Axiom Data Science</StyledContainer>
  </StyledContent>
);
