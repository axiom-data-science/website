import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import Content from "../components/Content"

export const DefaultPageTemplate = ({
  title,
  subtitle,
  featured,
  images,
  testimonials,
  body,
}) => (
  <main>
    <h1>Title</h1>
    <p>{title}</p>

    <h1>Subtitle</h1>
    <p>{subtitle}</p>

    <h1>Feature</h1>
    <div>
      <Img fluid={featured.image.childImageSharp.fluid} />
      <span>{featured.caption}</span>
    </div>

    <h1>Images</h1>
    <div>
      {images &&
        images.map(i => {
          return (
            <div>
              <Img fixed={i.image.childImageSharp.fixed} />
              <span>{i.caption}</span>
            </div>
          )
        })}
    </div>

    <h1>Content</h1>
    <Content source={body} />

    <h1>Testimonials</h1>
    <div>
      {testimonials &&
        testimonials.map(t => {
          return (
            <div>
              <span>{t.frontmatter.name}</span>
              <span>{t.frontmatter.affiliation}</span>
              <Img fixed={t.frontmatter.headshot.childImageSharp.fixed} />
              <span>{t.frontmatter.content}</span>
            </div>
          )
        })}
    </div>
  </main>
)

const DefaultPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <DefaultPageTemplate
      {...page.frontmatter}
      {...page.fields}
      body={page.html}
    />
  </Layout>
)

export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      fields {
        testimonials {
          frontmatter {
            name
            content
            affiliation
            headshot {
              childImageSharp {
                fixed(width: 150) {
                  ...GatsbyImageSharpFixed_noBase64
                }
              }
            }
          }
        }
      }
      frontmatter {
        template
        title
        subtitle
        featured {
          caption
          image {
            childImageSharp {
              fluid(maxWidth: 1500) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
        images {
          caption
          image {
            childImageSharp {
              fixed(width: 400) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }
  }
`
