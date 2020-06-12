import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PageMeta from '../components/PageMeta';

export const JobPageTemplate = ({
  title,
  subtitle,
  featured,
}) => (
  <main>
    <PageMeta title={title} subtitle={subtitle} featured={featured} />
  </main>
);

const JobPage = ({ data: { page, clients } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <JobPageTemplate {...page.frontmatter} clients={clients} body={page.html} />
  </Layout>
);

export default JobPage;

export const pageQuery = graphql`
  query JobPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        template
        title
        subtitle
        featured {
          image {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          caption
        }
      }
    }
  }
`;
