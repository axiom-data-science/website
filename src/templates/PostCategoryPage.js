import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import { format } from 'date-fns';
import Layout from '../components/Layout';
import Section from '../components/Section';

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

  .categories {
    grid-column: 1 / span 2;
    justify-self: start;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .category {
      background: var(--black);
      color: var(--white);
      padding: 0.5rem 0.25rem;
      transform: skew(-15deg);
      margin-right: .5rem;
      span {
        transform: skew(15deg);
      }
    }
  }
`;

const PostCategoryPage = ({ data: { page, posts } }) => (
  <Layout
    meta={page.frontmatter.meta}
    title={page.frontmatter.title}
    subtitle={page.frontmatter.subtitle}
    featured={page.frontmatter.featured}
  >
    <Section>
      <h3>Posts</h3>
      <StyledPosts>
        {posts.nodes.map((post) => (
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
              <time dateTime={post.frontmatter.date}>
                {format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}
              </time>
              <p>{post.excerpt}</p>
            </div>
            {post.frontmatter.blog_categories && (
              <div className="categories">
                {post.frontmatter.blog_categories.map((category) => (
                  <div className="category">
                    <span>{category.category}</span>
                  </div>
                ))}
              </div>
            )}
          </StyledPost>
        ))}
      </StyledPosts>
    </Section>
  </Layout>
);

export default PostCategoryPage;

export const pageQuery = graphql`
  query PostsCategoryPageQuery($id: String!) {
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
    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          date
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
          blog_categories {
            category
          }
        }
      }
    }
  }
`;
