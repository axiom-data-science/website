import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Tags from '../components/Tags';

const StyledPosts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const StyledPost = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-gap: 2rem;
  padding: 2rem 0 2rem 0;
  border-bottom: 1px solid var(--black);

  h3 {
    margin-top: 0;
    margin-bottom: 0;
    a {
      color: inherit;
      text-decoration: none;
      letter-spacing: 0.1rem;
    }
  }

  time {
    font-size: 0.833em;
    font-style: italic;
  }
`;

const PostCategoryPage = ({
  data: { page, solutions, solutionCategories },
}) => {
  const sc = solutionCategories.nodes.map((cat) => ({ id: cat.id, title: cat.frontmatter.title }));

  return (
    <Layout
      meta={page.frontmatter.meta}
      title={page.frontmatter.title}
      subtitle={page.frontmatter.subtitle}
      featured={page.frontmatter.featured}
    >
      <Section>
        <h3>Solutions</h3>
        <Tags tags={sc} />
        <StyledPosts>
          {solutions.nodes.map((post) => {
            const cats = post.frontmatter.solution_categories.map((cat) => ({
              id: 0,
              title: cat.category,
            }));
            return (
              <StyledPost key={post.id}>
                <div>
                  {post.frontmatter.featured
                    && post.frontmatter.featured.image && (
                      <Link to={`/posts/${post.frontmatter.relslug}`}>
                        <Img
                          fluid={
                            post.frontmatter.featured.image.childImageSharp
                              .fluid
                          }
                        />
                      </Link>
                  )}
                </div>
                <div>
                  <h3>
                    <Link to={`/posts/${post.frontmatter.relslug}`}>
                      {post.frontmatter.title}
                    </Link>
                  </h3>
                  <p>{post.excerpt}</p>
                </div>
                <Tags tags={cats} />
              </StyledPost>
            );
          })}
        </StyledPosts>
      </Section>
    </Layout>
  );
};

export default PostCategoryPage;

export const pageQuery = graphql`
  query SolutionsPageQuery($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      frontmatter {
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
    solutions: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "solutions" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          relslug
          featured {
            image {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          solution_categories {
            category
          }
        }
      }
    }
    solutionCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "solutionCategories" } } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
        }
      }
    }
  }
`;
