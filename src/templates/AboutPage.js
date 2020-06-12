import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Section from '../components/Section';

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const StyledLocationList = styled(StyledList)`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const StyledStaffList = styled(StyledList)`
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const AboutPage = ({ data: { page, locations, staff } }) => (
  <Layout
    meta={page.frontmatter.meta}
    title={page.frontmatter.title}
    subtitle={page.frontmatter.subtitle}
    featured={page.frontmatter.featured}
  >
    <Section>
      <h3>Locations</h3>
      <StyledLocationList>
        {locations.nodes.map((location) => (
          <a
            href={location.frontmatter.mapslink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Img fluid={location.frontmatter.photo.childImageSharp.fluid} />
            <p>{location.frontmatter.title}</p>
            <p>
              <em>{location.frontmatter.address1}</em>
            </p>
            <p>
              <em>{location.frontmatter.address2}</em>
            </p>
          </a>
        ))}
      </StyledLocationList>
    </Section>
    <Section>
      <h3>Staff</h3>
      <StyledStaffList>
        {staff.nodes.map((s) => (
          <div className="item">
            <a href={`mailto:${s.frontmatter.email}`}>
              <Img fluid={s.frontmatter.headshot.childImageSharp.fluid} />
              <div className="description">
                <h4>{s.frontmatter.name}</h4>
                <p>{s.frontmatter.position}</p>
              </div>
            </a>
          </div>
        ))}
      </StyledStaffList>
    </Section>
  </Layout>
);

export default AboutPage;

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      frontmatter {
        template
        title
        subtitle
        featured {
          image {
            childImageSharp {
              fluid(maxWidth: 1500) {
                ...GatsbyImageSharpFluid_noBase64
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
        frontmatter {
          address1
          address2
          title
          latitude
          longitude
          mapslink
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

    staff: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "staff" } } }
    ) {
      nodes {
        html
        frontmatter {
          name
          email
          position
          headshot {
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
