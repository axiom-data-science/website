import React from "react"
import { MapPin } from "react-feather"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Content from "../components/Content"

export const AboutPageTemplate = ({
  title,
  intro,
  featured,
  body,
  address1,
  address2,
  latitude,
  longitude,
  mapslink,
}) => (
  <main className="Contact">
    <p>{title}</p>

    <p>{intro}</p>

    <p>{featured}</p>

    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">
        <div>
          <div className="Contact--Details">
            {address1 && address2 && (
              <a
                className="Contact--Details--Item"
                href={`https://www.google.com.au/maps/search/${encodeURI(
                  `{address1},{address2}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin /> {address1}, {address2}
              </a>
            )}
          </div>

          <Content source={body} />
        </div>
      </div>
    </section>
  </main>
)

const AboutPage = ({ data: { page, locations } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <AboutPageTemplate {...page.frontmatter} {...locations} body={page.html} />
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
        featured {
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
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            address1
            address2
            latitude
            longitude
            mapslink
          }
        }
      }
    }
  }
`
