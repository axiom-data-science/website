import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { extend } from "lodash"

import Layout from "../components/Layout"
import Content from "../components/Content"
import PageMeta from "../components/PageMeta"

export const HomePageTemplate = ({
  title,
  subtitle,
  images,
  body,
  solutionCategories,
  testimonials,
}) => (
  <main>
    <PageMeta title={title} subtitle={subtitle} />
    <h1>Images</h1>
    {images.map(img => {
      return (
        <section>
          <div>
            <Img fluid={img.image.childImageSharp.fluid} />
          </div>
        </section>
      )
    })}
    <h1>Content</h1>
    <Content source={body} />
    <h1>Solution Categories</h1>
    {solutionCategories.map(sc => {
      return (
        <section>
          <div>
            <a href={sc.slug}>{sc.title}</a>
            <span>{sc.subtitle}</span>
            <Img fluid={sc.featured.image.childImageSharp.fluid} />
            <div>{sc.featured.caption}</div>
          </div>
        </section>
      )
    })}
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

const HomePage = ({ data: { page, solutionCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <HomePageTemplate
      {...page.fields}
      {...page.frontmatter}
      solutionCategories={solutionCategories.nodes.map(s =>
        extend(s.fields, s.frontmatter)
      )}
      body={page.html}
    />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  query HomePage($id: String!) {
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

    solutionCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "solutionCategories" } } }
    ) {
      nodes {
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
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
