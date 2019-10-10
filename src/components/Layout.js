import React, { Fragment } from "react"
import Helmet from "react-helmet"
import Header from "./Header"
import Footer from "./Footer"
import { StaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"

import "normalize.css"
import { Theme, GlobalStyle } from "./Theme"
import Meta from "./Meta"

const StyledHeader = styled.div`
  border-bottom: 1px solid black;
`

const StyledContent = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

const StyledFooter = styled.div`
  background: grey;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

export default ({ children, meta, title }) => {
  return (
    <StaticQuery
      query={graphql`
        query IndexLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            googleTrackingId
            socialMediaCard {
              image
            }
          }
        }
      `}
      render={data => {
        const { siteTitle, socialMediaCard, googleTrackingId } =
          data.settingsYaml || {}

        return (
          <ThemeProvider theme={Theme}>
            <Fragment>
              <Helmet
                defaultTitle={siteTitle}
                titleTemplate={`%s | ${siteTitle}`}
              >
                {title}
                {/* Add font link tags here */}
              </Helmet>
              <Meta
                googleTrackingId={googleTrackingId}
                absoluteImageUrl={
                  socialMediaCard &&
                  socialMediaCard.image &&
                  socialMediaCard.image
                }
                {...meta}
                {...data.settingsYaml}
              />
              <GlobalStyle />
              <StyledHeader>
                <Header />
              </StyledHeader>
              <StyledContent>{children}</StyledContent>
              <StyledFooter>
                <Footer />
              </StyledFooter>
            </Fragment>
          </ThemeProvider>
        )
      }}
    />
  )
}
