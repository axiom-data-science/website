import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  background: white;
  border-bottom: thin solid black;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: var(--maxWidth);

    img {
      margin: 0;
      padding: 0;
    }

    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;

      a {
        padding: 10px 20px;
        font-weight: 600;
        letter-spacing: 0.2px;
        color: #000;
        text-decoration: none;
        text-transform: uppercase;
      }
    }
  }
`;

const pageQuery = graphql`
  query HeaderQuery {
    pages: allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "pages" } }
        frontmatter: { display: { in: ["Menu"] } }
      }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;


export default ({ logo }) => (
  <StaticQuery
    query={pageQuery}
    render={(data) => {
      const pages = data.pages.edges.map((p) => ({ id: p.node.id, ...p.node.fields, ...p.node.frontmatter }));
      return (
        <StyledHeader>
          <div>
            <a href="/">
              <Img fixed={logo} />
            </a>
            <nav>
              <ul>
                {pages.map((page) => (
                  <li key={`nav-${page.id}`}>
                    <a href={page.slug}>{page.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </StyledHeader>
      );
    }}
  />
);
