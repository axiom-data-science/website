import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const StyledHeader = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  align-items: stretch;
`

const StyledLogo = styled.img`
  padding: 0.5rem 0;
  filter: invert(1);
`
const StyledNav = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  a {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
    &:after {
      height: 2px;
      background: grey;
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover {
      outline: none;
      &:after {
        width: 80%;
      }
    }
  }
`

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query HeaderQuery {
          pages: allMarkdownRemark(
            filter: {
              fields: { contentType: { eq: "pages" } }
              frontmatter: {
                display: { in: ["Menu"] }
                title: {
                  in: ["Home", "About", "Jobs", "Clients", "Blog", "Contact"]
                }
              }
            }
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }

          solutionCategories: allMarkdownRemark(
            filter: {
              fields: { contentType: { eq: "solutionCategories" } }
              frontmatter: { display: { in: ["Menu"] } }
            }
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
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
      `}
      render={data => {
        const pages = data.pages.edges.map(p => {
          return { ...p.node.fields, ...p.node.frontmatter }
        })

        const home = pages.find(p => {
          return p.title === "Home"
        })
        const about = pages.find(p => {
          return p.title === "About"
        })
        const jobs = pages.find(p => {
          return p.title === "Jobs"
        })
        const clients = pages.find(p => {
          return p.title === "Clients"
        })
        const blog = pages.find(p => {
          return p.title === "Blog"
        })
        const solutions = data.solutionCategories.edges.map(sol => {
          return { ...sol.node.fields, ...sol.node.frontmatter }
        })
        const contact = pages.find(p => {
          return p.title === "Contact"
        })
        return (
          <StyledHeader>
            <StyledLogo
              src="https://axiomdatascience.com/assets/images/header-sm5.png"
              alt="Axiom Data Science"
            />
            <StyledNav>
              <a key={home.title} href={home.slug}>
                {home.title}
              </a>
              <a key={about.title} href={about.slug}>
                {about.title}
              </a>
              <a key={jobs.title} href={jobs.slug}>
                {jobs.title}
              </a>
              <a key={clients.title} href={clients.slug}>
                {clients.title}
              </a>
              <a key={blog.title} href={blog.slug}>
                {blog.title}
              </a>
              <a key={contact.title} href={contact.slug}>
                {contact.title}
              </a>
            </StyledNav>
          </StyledHeader>
        )
      }}
    />
  )
}
