import React from "react"
import { MapPin } from "react-feather"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import Content from "../components/Content"

export const AboutPageTemplate = ({
  title,
  intro,
  featuredImage,
  body,
  locations,
}) => (
  <main className="Contact">
    <p>{title}</p>

    <p>{intro}</p>

    <div>
      <Img fluid={featuredImage.childImageSharp.fluid} />
    </div>

    {locations.nodes.map(loc => {
      let l = loc.frontmatter
      return (
        <section>
          <div>
            <div>
              <div>
                {l.address1 && l.address2 && (
                  <a
                    href={l.mapslink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Img fixed={l.photo.childImageSharp.fixed} />
                    <MapPin /> {l.address1}, {l.address2}
                  </a>
                )}
              </div>

              <Content source={body} />
            </div>
          </div>
        </section>
      )
    })}
  </main>
)

const AboutPage = ({ data: { page, locations } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <AboutPageTemplate
      {...page.frontmatter}
      locations={locations}
      body={page.html}
    />
  </Layout>
)

export default AboutPage

export const pageQuery = graphql`
  query AboutPage($id: String!) {
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

    locations: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "locations" } } }
    ) {
      nodes {
        frontmatter {
          address1
          address2
          title
          latitude
          longitude
          mapslink
          photo {
            childImageSharp {
              fixed(width: 500) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }
  }
`
