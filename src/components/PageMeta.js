import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const StyledHero = styled.div`
  display: grid
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  grid-template-rows: auto 1fr auto;
  grid-gap: 20px;
  .gatsby-image-wrapper {
    grid-column: 1 / 3;
  }
`;
const StyledTitle = styled.h3`
  grid-column: 1 / -1;
  text-transform: uppercase;
  color: ${(props) => props.theme.black};
`;

const StyledSubtitle = styled.h5`
  grid-column: 3/-1;
  text-align: left;
  color: ${(props) => props.theme.black};
`;

const StyledSubtitleWithFeature = styled(StyledSubtitle)`
  grid-column: 3/-1;
`;

const StyledSubtitleNoFeature = styled(StyledSubtitle)`
  grid-column: 1/-1;
`;

const StyledCaption = styled.p`
  grid-column: 1 / 3;
  text-align: left;
  color: ${(props) => props.theme.black};
`;

const PageMeta = ({ title, subtitle, featured }) => (
  <StyledHero>
    <StyledTitle>{title}</StyledTitle>
    {featured && (
      <>
        <Img fluid={featured.image.childImageSharp.fluid} />
        <StyledSubtitleWithFeature>{subtitle}</StyledSubtitleWithFeature>
        {featured.caption && <StyledCaption>{featured.caption}</StyledCaption>}
      </>
    )}
    {!featured && <StyledSubtitleNoFeature>{subtitle}</StyledSubtitleNoFeature>}
  </StyledHero>
);

export default PageMeta;
