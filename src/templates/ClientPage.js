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

const ClientPage = ({ data: { page, clients } }) => (
  <Layout
    meta={page.frontmatter.meta}
    title={page.frontmatter.title}
    subtitle={page.frontmatter.subtitle}
  >
    <Section>
      <StyledList>
        {clients.nodes.map((client) => (
          <a
            href={client.frontmatter.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Img fluid={client.frontmatter.logo.childImageSharp.fluid} />
            <p>{client.frontmatter.name}</p>
          </a>
        ))}
      </StyledList>
    </Section>
  </Layout>
);

export default ClientPage;

export const pageQuery = graphql`
  query ClientPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      frontmatter {
        template
        title
        subtitle
      }
    }

    clients: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "clients" } } }
    ) {
      nodes {
        frontmatter {
          name
          slug
          url
          logo {
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
