import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/Layout"
import PageMeta from "../components/PageMeta"

const StyledClients = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;
  padding: 20px 0;
  max-width: ${props => props.theme.maxWidth};
`
const StyledClientLogo = styled.div`
  padding: 4px;
`

const StyledClientName = styled.h5`
  background: black;
  color: white;
  padding: 1rem 0.5rem;
  margin-bottom: auto;
`

const StyledClient = styled.div`
  display: flex;
  flex-direction: column;
  place-content: end space-between;
  text-align: center;
  border-radius: 4px;
  border: 1px solid black;
  a {
    text-decoration: none;
    color: white;
  }
  :hover {
    border-color: blue;
  }
  &:hover ${StyledClientName} {
    background: grey;
  }
`

export const ClientPageTemplate = ({
  title,
  subtitle,
  featured,
  body,
  clients,
}) => (
  <main>
    <PageMeta title={title} subtitle={subtitle} featured={featured} />
    <StyledClients>
      {clients.nodes.map(client => {
        let c = client.frontmatter
        return (
          <StyledClient>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              <StyledClientLogo>
                <Img fluid={c.logo.childImageSharp.fluid} />
              </StyledClientLogo>
            </a>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              <StyledClientName>{c.name}</StyledClientName>
            </a>
          </StyledClient>
        )
      })}
    </StyledClients>
  </main>
)

const ClientPage = ({ data: { page, clients } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ClientPageTemplate
      {...page.frontmatter}
      clients={clients}
      body={page.html}
    />
  </Layout>
)

export default ClientPage

export const pageQuery = graphql`
  query ClientPage($id: String!) {
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
`
