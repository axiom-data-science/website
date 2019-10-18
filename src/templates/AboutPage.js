import React from "react"
import { MapPin } from "react-feather"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/Layout"
import Content from "../components/Content"
import PageMeta from "../components/PageMeta"

const StyledSectionTitle = styled.h4`
  grid-column: 1 / -1;
  text-transform: uppercase;
  color: black;
`

const StyledLocationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;
  max-width: ${props => props.theme.maxWidth};
  a {
    text-decoration: none;
    color: black;
  }
`

const StyledGeo = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-gap: 10px;
  align-items: center;
  padding: 1rem 0;
  p {
    margin: 0 0 0 5px;
  }
`

const StyledAddress = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledStaffList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  max-width: ${props => props.theme.maxWidth};
  a {
    text-decoration: none;
    color: black;
  }
`

const StyledStaff = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 20px;
  max-width: ${props => props.theme.maxWidth};
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid black;
`

const StyledStaffInformation = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  h3 {
    margin-top: 0;
  }
`

export const AboutPageTemplate = ({
  title,
  subtitle,
  featured,
  body,
  locations,
  staff,
}) => (
  <main>
    <PageMeta title={title} subtitle={subtitle} featured={featured} />
    <StyledSectionTitle>Locations</StyledSectionTitle>
    <StyledLocationList>
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
                      <Img fluid={l.photo.childImageSharp.fluid} />
                      <StyledGeo>
                        <MapPin />
                        <StyledAddress>
                          <p>{l.address1}</p>
                          <p>{l.address2}</p>
                        </StyledAddress>
                      </StyledGeo>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </StyledLocationList>
    <StyledSectionTitle>Staff</StyledSectionTitle>
    <StyledStaffList>
      {staff.map(s => {
        let l = s.frontmatter
        return (
          <StyledStaff>
            <Img fluid={l.headshot.childImageSharp.fluid} />
            <StyledStaffInformation>
              <a href={`mailto:${l.email}`}>
                <h3>{l.name}</h3>
              </a>
              <p>{l.position}</p>
              {l.email}
              <Content source={s.html} />
            </StyledStaffInformation>
          </StyledStaff>
        )
      })}
    </StyledStaffList>
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
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_noBase64
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
