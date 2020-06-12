import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const StyledTestimonial = styled.div`
  padding: 2rem 1rem;
  background: var(--white);
  border: 1px solid var(--lightgrey);
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);

  /* display: flex;
  justify-content: space-between;
  align-items: center; */

  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  justify-items: center;
  align-items: center;

  .headshot {
    grid-column: 1 / 2;
  }

  .quote {
    grid-column: 2 / 3;

    blockquote {
      position: relative;
      display: inline-block;
      font-size: 1.4em;
      margin: 0 0 0.5rem 0;
      padding: 0 0 0 0.5rem;
      border-left: 3px solid var(--grey);
    }
  }

  .bio {
    grid-column: 1 / 3;
    justify-self: start;
    h3 {
      margin: 0;
    }
  }
`;

const testimonialImageStyle = {
  borderRadius: '50%',
};

const Testimonial = ({ testimonial }) => (
  <StyledTestimonial>
    <div className="headshot">
      <Img
        fixed={testimonial.frontmatter.headshot.childImageSharp.fixed}
        style={testimonialImageStyle}
      />
    </div>
    <div className="quote">
      <blockquote>{testimonial.frontmatter.content}</blockquote>
    </div>
    <div className="bio">
      <h3>{testimonial.frontmatter.name}</h3>
      <span>
        <em>{testimonial.frontmatter.affiliation}</em>
      </span>
    </div>
  </StyledTestimonial>
);

export default Testimonial;
