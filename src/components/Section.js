import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  color: var(--black);
  background: var(--white);
  border-bottom: 1px solid var(--black);
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);

  h1,
  h3 {
    margin: 0 0 0.5em 0;
  }

  &:nth-of-type(2n + 1) {
    background: var(--white);
    color: var(--black);
  }

  &:nth-of-type(4n) {
    background: url(/assets/topography.png);
    color: var(--black);
  }

  &:nth-of-type(4n + 2) {
    background: url(/assets/cartographer.png);
    color: var(--white);
  }

  &:nth-of-type(1) {
    min-height: 315px;
    p {
      max-width: 60%;
      margin-bottom: 0.5rem;
    }
  }
`;

const StyledContainer = styled.div`
  width: var(--maxWidth);
  z-index: 1;
`;

const Section = ({ children }) => (
  <StyledSection>
    <StyledContainer>
      {children}
    </StyledContainer>
  </StyledSection>
);

export default Section;
