import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"

export const HomePageTemplate = ({ title, intro, images, body }) => (
  <main className="Contact">
    <p>{title}</p>

    <p>{intro}</p>

    {images.map(img => {
      return (
        <section>
          <div>
            <Img fluid={img.image.childImageSharp.fluid} />
          </div>
        </section>
      )
    })}
  </main>
)

const HomePage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <HomePageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        template
        title
        intro
        images {
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
  }
`
