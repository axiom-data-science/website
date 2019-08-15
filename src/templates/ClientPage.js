import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"

export const ClientPageTemplate = ({
  title,
  intro,
  featuredImage,
  body,
  clients,
}) => (
  <main className="Contact">
    <p>{title}</p>

    <p>{intro}</p>

    <div>
      <Img fluid={featuredImage.childImageSharp.fluid} />
    </div>

    {clients.nodes.map(client => {
      let c = client.frontmatter
      return (
        <section>
          <div>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              <Img fixed={c.logo.childImageSharp.fixed} />
            </a>
          </div>
        </section>
      )
    })}
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
        intro
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
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
              fixed(width: 200) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }
  }
`