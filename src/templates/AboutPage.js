import React from "react"
import { MapPin } from "react-feather"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import Content from "../components/Content"

export const AboutPageTemplate = ({
  title,
  subtitle,
  featured,
  body,
  locations,
  staff,
}) => (
  <main>
    <h1>Title</h1>
    <p>{title}</p>

    <h1>Subtitle</h1>
    <p>{subtitle}</p>

    <h1>Feature</h1>
    <div>
      <Img fluid={featured.image.childImageSharp.fluid} />
    </div>

    <h1>Locations</h1>
    {locations.map(loc => {
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
            </div>
          </div>
        </section>
      )
    })}

    <h1>Staff</h1>
    {staff.map(s => {
      let l = s.frontmatter
      return (
        <section>
          <div>
            <Img fixed={l.headshot.childImageSharp.fixed} />
            {l.name}
            {l.position}
            {l.email}
            <Content source={s.html} />
          </div>
        </section>
      )
    })}

    <h1>Content</h1>
    <Content source={body} />
  </main>
)

const AboutPage = ({ data: { page, locations, staff } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <AboutPageTemplate
      {...page.frontmatter}
      locations={locations.nodes}
      staff={staff.nodes}
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

    staff: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "staff" } } }
    ) {
      nodes {
        html
        frontmatter {
          name
          email
          position
          headshot {
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
