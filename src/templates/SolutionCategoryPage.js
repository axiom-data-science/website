import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import Content from "../components/Content"

export const SolutionCategoryPageTemplate = ({
  title,
  subtitle,
  date,
  featured,
  testimonials,
  solutions,
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

    <h1>Solutions</h1>
    <div>
      {solutions &&
        solutions.map(sc => {
          return (
            <div>
              <a href={sc.fields.slug}>{sc.frontmatter.title}</a>
              <span>{sc.frontmatter.subtitle}</span>
              <Img
                fixed={sc.frontmatter.featured.image.childImageSharp.fixed}
              />
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

const SolutionCategoryPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <SolutionCategoryPageTemplate
      {...page.frontmatter}
      {...page.fields}
      body={page.html}
    />
  </Layout>
)

export default SolutionCategoryPage

export const pageQuery = graphql`
  query SolutionCategoryPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      fields {
        solutions {
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            featured {
              caption
              image {
                childImageSharp {
                  fixed(width: 500) {
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
          }
        }
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
      }
    }
  }
`
