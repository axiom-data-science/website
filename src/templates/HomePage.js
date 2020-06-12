import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Testimonial from '../components/Testimonial';

const StyledList = styled.div`
  display: grid;
  grid-gap: 20px;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const StyledSolutionsList = styled(StyledList)`
  grid-template-columns: repeat(4, 1fr);
`;

const StyledTestimonialList = styled(StyledList)`
  grid-template-columns: repeat(2, 1fr);
`;

const StyledLocationList = styled(StyledList)`
  grid-template-columns: repeat(4, 1fr);
`;

const HomePage = ({ data: { page, locations, solutions } }) => (
  <Layout
    meta={page.frontmatter.meta}
    title={page.frontmatter.title}
    subtitle={page.frontmatter.subtitle}
  >
    <Section>
      <h3>Solutions</h3>
      <StyledSolutionsList>
        {solutions.nodes.map((solution) => (
          <a key={`home-${solution.id}`} href="/">
            <Img
              fluid={solution.frontmatter.featured.image.childImageSharp.fluid}
            />
            <p>{solution.frontmatter.title}</p>
          </a>
        ))}
      </StyledSolutionsList>
    </Section>
    <Section>
      <h3>Testimonials</h3>
      <StyledTestimonialList>
        {page.fields.testimonials.map((testimonial) => (
          <Testimonial key={`home-${testimonial.id}`} testimonial={testimonial} />
        ))}
      </StyledTestimonialList>
    </Section>
    <Section>
      <h3>About</h3>
      <p>
        Axiom Data Science works with organizations to improve the long term
        management, reuse and impact of their scientific data resources.
      </p>
      <StyledLocationList>
        {locations.nodes.map((location) => (
          <a key={`home-${location.id}`} href="/">
            <Img fluid={location.frontmatter.photo.childImageSharp.fluid} />
            <p>{location.frontmatter.title}</p>
          </a>
        ))}
      </StyledLocationList>
    </Section>
  </Layout>
);

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      frontmatter {
        title
        subtitle
      }
      html
      fields {
        testimonials {
          id
          frontmatter {
            name
            affiliation
            content
            headshot {
              childImageSharp {
                fixed(width: 100, height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    solutions: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "solutionCategories" } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          featured {
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
    locations: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "locations" } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          photo {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
